import "./messages.tact";
import "./structs.tact";
import "./utils.tact";
import "./jetton/jetton.tact";
import "./jetton/jetton-wallet.tact";
import "./jetton/messages.tact";
import "./DAOvault.tact";
import "./DAOJetton.tact";

contract ContractDAOv1(
    owner: Address,
    admin: Address,
    wallet: Address,
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

    receive(msg: JettonNotification) {
        let ctx: Context = context();
        let data = msg.forwardPayload.loadRef().beginParse();
        let op: Int = data.loadUint(32);

        require(ctx.value > ton("0.09"), "gas error");

        if (op == InitVoting.opcode()) {
            require(msg.sender == self.owner, "access denied");
            require(self.status == 0, "wrong operation");

            self.wallet = sender();
        } else if (op == ProvideVoting.opcode()) {
            require(self.status == 1, "wrong operation");
            require(sender() == self.wallet, "access denied");
            require(msg.amount >= self.settings.min_amount, "insufficient amount");
            require(self.settings.endTime > now(), "vote time is over");

            let optionAddress: Address = data.loadAddress();
            let option: OptionInfoRoot = self.options.get(optionAddress)!!;

            self.winner.total += 1;
            self.options.set(optionAddress, OptionInfoRoot{
                address: optionAddress,
                title: option.title,
                description: option.description,
                amount: option.amount + 1
            });

            let init: StateInit = initOf ContractJettonDAOv1(myAddress(), msg.sender, optionAddress, self.wallet, 0);

            deploy(DeployParameters{
                init: init,
                value: ton("0.05"),
                body: "vote".asComment(),
            });

            send(SendParameters{
                to: sender(),
                value: ton("0.05"),
                body: JettonTransfer{
                    queryId: 42,
                    amount: msg.amount,
                    destination: contractAddress(init),
                    responseDestination: contractAddress(init),
                    customPayload: null,
                    forwardTonAmount: ton("0.01"),
                    forwardPayload: rawSlice("F"),
                }.toCell()
            });

            send(SendParameters{
                to: self.master,
                value: ton("0.05"),
                body: Mint{
                    queryId: 0,
                    toAddress: optionAddress,
                    masterMsg: JettonTransferInternal{
                        queryId: 0,
                        amount: msg.amount,
                        sender: optionAddress,
                        forwardTonAmount: 0,
                        forwardPayload: beginCell().storeUint(0, 1).asSlice(),
                    }
                }.toCell()
            });
        } else if (op == TakeDAOVote.opcode()) {
            require(sender() == self.wallet, "access denied");

            let adminAddress: Address = data.loadAddress();
            let optionAddress: Address = data.loadAddress();
            let expectedAddress: Address = contractAddress(initOf ContractJettonDAOv1(myAddress(), adminAddress, optionAddress, self.wallet, 0));

            require(msg.sender == expectedAddress, "unknown contract");

            let option: OptionInfoRoot = self.options.get(optionAddress)!!;

            self.winner.total += 1;
            self.options.set(optionAddress, OptionInfoRoot{
                address: optionAddress,
                title: option.title,
                description: option.description,
                amount: option.amount - 1
            });

            send(SendParameters{
                to: self.wallet,
                value: ton("0.05"),
                body: JettonTransfer{
                    queryId: 42,
                    amount: msg.amount,
                    destination: adminAddress,
                    responseDestination: adminAddress,
                    customPayload: null,
                    forwardTonAmount: 1,
                    forwardPayload: beginCell().storeUint(0, 1).asSlice(),
                }.toCell()
            });

            require(self.settings.endTime > now(), "vote time is over");

            send(SendParameters{
                to: self.master,
                value: ton("0.025"),
                body: CallTo{
                    queryId: 0,
                    toAddress: optionAddress,
                    tonAmount: ton("0.02"),
                    masterMsg: JettonBurn{
                        queryId: 0,
                        amount: msg.amount,
                    }.toCell()
                }.toCell()
            });
        }
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

        send(SendParameters{
            to: contractAddress(init),
            value: ctx.value - ton("0.01"),
            code: init.code,
            data: init.data,
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