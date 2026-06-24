import "./messages.tact";
import "./structs.tact";
import "./utils.tact";
import "./jetton/jetton.tact";
import "./jetton/jetton-wallet.tact";
import "./jetton/messages.tact";
import "./DAOvault.tact";
import "./DAOVirtual.tact";
import "./DAOCitizen.tact";

contract ContractDAOv2(
    owner: Address,
    admin: Address,
    master: Address,
    status: Int as uint4,
    metadata: Cell,
    settings: VoteSettings,
    options: map<Address, OptionInfoRoot>,
    winner: WinnerInfo,
) {
    receive("init") {
        require(sender() == self.owner, "access denied");
        require(self.status == 0, "wrong operation");

        let init: StateInit = initOf GovernanceJettonMinter(0, myAddress(), self.owner, self.metadata);
        self.master = contractAddress(init);

        deploy(DeployParameters{
            init: init,
            value: ton("0.1"),
        });
    }

    receive(msg: ProvideActionDAO) {
        let ctx: Context = context();
        let expectedAddress: Address = contractAddress(initOf ContractCitizenDAOv1(msg.admin, null, 0));

        require(ctx.value > ton("0.055"), "gas error");
        require(sender() == expectedAddress, "unknown wallet");

        let data = msg.payload.beginParse();
        let op: Int = data.loadUint(32);

        if (op == ProvideVoting.opcode()) {
            require(self.status == 1, "wrong operation");
            require(self.settings.endTime > now(), "vote time is over");

            let optionAddress: Address = data.loadAddress();
            self.options.get(optionAddress)!!;

            let init: StateInit = initOf ContractVirtualDAOv2(myAddress(), sender(), null, 0);

            deploy(DeployParameters{
                init: init,
                value: ton("0.05"),
                body: VirtualInitialization{
                    queryId: 0,
                    optionAddress: optionAddress
                }.toCell()
            });
        } else if (op == TakeDAOVote.opcode()) {
            require(self.settings.endTime > now(), "vote time is over");

            let init: StateInit = initOf ContractVirtualDAOv2(myAddress(), sender(), null, 0);

            deploy(DeployParameters{
                init: init,
                value: ton("0.05"),
                body: "-".asComment()
            });
        }
    }

    receive(msg: SubmitVoting) {
        require(self.status == 1, "wrong operation");
        require(self.settings.endTime > now(), "vote time is over");

        let expectedAddress: Address = contractAddress(initOf ContractVirtualDAOv2(myAddress(), msg.adminAddress, null, 0));
        require(sender() == expectedAddress, "unknown wallet");

        self.winner.total += 1;
        let option: OptionInfoRoot = self.options.get(msg.optionAddress)!!;

        self.options.set(msg.optionAddress, OptionInfoRoot{
            address: msg.optionAddress,
            title: option.title,
            description: option.description,
            amount: option.amount + 1
        });

        send(SendParameters{
            to: self.master,
            value: ton("0.05"),
            body: Mint{
                queryId: 0,
                toAddress: msg.optionAddress,
                masterMsg: JettonTransferInternal{
                    queryId: 0,
                    amount: ton("1"),
                    sender: msg.optionAddress,
                    forwardTonAmount: 0,
                    forwardPayload: beginCell().storeUint(0, 1).asSlice(),
                }
            }.toCell()
        });
    }

    receive(msg: CancelVoting) {
        require(self.settings.endTime > now(), "vote time is over");

        let expectedAddress: Address = contractAddress(initOf ContractVirtualDAOv2(myAddress(), msg.adminAddress, null, 0));
        require(sender() == expectedAddress, "unknown wallet");
        
        self.winner.total -= 1;
        let option: OptionInfoRoot = self.options.get(msg.optionAddress)!!;

        self.options.set(msg.optionAddress, OptionInfoRoot{
            address: msg.optionAddress,
            title: option.title,
            description: option.description,
            amount: option.amount - 1
        });

        send(SendParameters{
            to: self.master,
            value: ton("0.025"),
            body: CallTo{
                queryId: 0,
                toAddress: msg.optionAddress,
                tonAmount: ton("0.02"),
                masterMsg: JettonBurn{
                    queryId: 0,
                    amount: ton("1"),
                }.toCell()
            }.toCell()
        });
    }

    receive(msg: AddOption) {
        let ctx: Context = context();

        require(ctx.value > ton("0.03"), "gas error");
        require(self.status == 0, "wrong operation");
        require(sender() == self.admin || sender() == self.owner, "access denied");

        let data: OptionInfo = OptionInfo{title: msg.title, description: msg.description};
        let init: StateInit = initOf ContractVaultDAOv1(myAddress(), 0, data);

        self.options.set(contractAddress(init), OptionInfoRoot{
            address: contractAddress(init),
            title: msg.title,
            description: msg.description,
            amount: 0
        });

        deploy(DeployParameters{
            init: init,
            value: ctx.value - ton("0.01"),
            body: VaultInitialization{
                queryId: 0,
                admin: sender(),
            }.toCell()
        });
    }

    receive("start") {
        require(sender() == self.admin || sender() == self.owner, "access denied");
        require(self.status == 0, "wrong operation");

        self.status = 1;
    }

    receive("finalize") {
        require(self.status == 1, "wrong operation");
        require(self.settings.endTime < now(), "vote time is not over");

        if (self.settings.quorum > self.winner.total) {
            self.winner = WinnerInfo{address: null, amount: self.winner.amount, total: self.winner.total, finished: true};

            send(SendParameters{
                to: self.admin,
                value: 0,
                mode: SendRemainingBalance,
                body: "finished".asComment()
            });
        } else {
            self.winner = checkWinner(self.options, self.winner.total);

            send(SendParameters{
                to: self.admin,
                value: 0,
                mode: SendRemainingBalance,
                body: "finished".asComment()
            });
        }
    }

    receive() { return }

    get fun get_options(): map<Address, OptionInfoRoot> {
        return self.options;
    }

    get fun get_settings(): VoteSettings {
        return self.settings;
    }

    get fun get_status(): Int {
        return self.status;
    }

    get fun get_results(): WinnerInfo {
        return self.winner;
    }
}