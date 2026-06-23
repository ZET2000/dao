import "@stdlib/deploy";
import "./messages.tact";
import "./jetton/messages.tact";
import "./structs.tact";
import "./utils.tact";
import "./constants.tact";
import "./DAOv1.tact";
import "./DAOv2.tact";
import "./nft/nft-minter.tact";
import "./nft/messages.tact";
import "./DAOCitizen.tact";

contract MasterDAO with Deployable {
    owner: Address;
    treasury: Address;
    fees: Int as coins;
    admins: map<Address, Bool>;
    collection: Address;
    token: DaoToken?;

    init(owner: Address) {
        self.owner = owner;
        self.treasury = owner;
        self.fees = 0;
        self.admins = emptyMap();
        self.collection = owner;
        self.token = null;
    }

    receive("TopUp") { return }

    receive(msg: DropCollection) {
        require(sender() == self.owner, "access denied");
        self.collection = msg.address;
    }

    receive(msg: GetFunds) {
        require(sender() == self.owner, "access denied");
        
        send(SendParameters{
            to: msg.jettonWallet,
            value: ton("0.05"),
            body: JettonTransfer{
                queryId: 42,
                amount: msg.jettonAmount,
                destination: self.treasury,
                responseDestination: self.treasury,
                customPayload: null,
                forwardTonAmount: 1,
                forwardPayload: rawSlice("F")
            }.toCell()
        });
    }

    receive(msg: PassPassport) {
        require(sender() == self.owner, "access denied");

        send(SendParameters{
            to: msg.address,
            value: ton("0.01"),
            body: PassPassport{
                queryId: 0,
                address: myAddress(),
            }.toCell()
        });
    }

    receive(msg: ChangeAdminCitizen) {
        require(sender() == self.owner, "access denied");

        send(SendParameters{
            to: msg.citizen,
            value: ton("0.01"),
            body: ChangeAdminCitizen{
                queryId: 0,
                citizen: msg.citizen,
                address: msg.address,
            }.toCell()
        });
    }

    receive(msg: ChangeTreasury) {
        require(sender() == self.owner, "access denied");
        self.treasury = msg.address;
    }

    receive(msg: RemoveAdmin) {
        require(sender() == self.owner, "access denied");
        self.admins.del(msg.address);
    }

    receive(msg: AddAdmin) {
        require(sender() == self.owner, "access denied");
        self.admins.set(msg.address, true);
    }

    receive(msg: ChangeOwnerDAO) {
        require(sender() == self.owner, "access denied");
        self.owner = msg.address;
    }

    receive(msg: StartDAOVoting) {
        let ctx: Context = context();

        self.admins.get(sender())!!;
        require(ctx.value >= minVotingCreationFee + self.fees, "gas error");
        require(msg.settings.endTime > now(), "time expired");

        let init: StateInit = initOf ContractDAOv2(
            myAddress(), // owner - always master address
            sender(), // admin - always creator wallet
            myAddress(), // jetton - first time owner address
            0,
            msg.metadata,
            msg.settings,
            emptyMap(),
        );

        deploy(DeployParameters{
            init: init,
            mode: SendIgnoreErrors, 
            value: minVotingCreationFee,
            body: "init".asComment()
        });
    }

    receive(msg: JettonTransferNotification) {
        let ctx: Context = context();
        let data = msg.forwardPayload.loadRef().beginParse();
        let op: Int = data.loadUint(32);

        if (op == StartDAOVoting.opcode()) {
            data.loadUint(64);

            self.admins.get(msg.sender)!!;
            require(ctx.value >= minVotingCreationFee + self.fees, "gas error");

            let metadata = data.loadRef();
            let settings = VoteSettings.fromSlice(data.loadRef().beginParse());

            let init: StateInit = initOf ContractDAOv1(
                myAddress(), // owner - always master address
                msg.sender, // admin - always creator wallet
                myAddress(), // jetton - first time owner address
                myAddress(), // wallet - first time owner address
                0,
                metadata,
                settings,
                emptyMap(),
            );

            deploy(DeployParameters{
                init: init,
                mode: SendIgnoreErrors, 
                value: minVotingCreationFee,
                body: "init".asComment()
            });

            send(SendParameters{
                to: sender(),
                value: ton("0.12"),
                body: JettonTransfer{
                    queryId: 42,
                    amount: msg.amount,
                    destination: contractAddress(init),
                    responseDestination: contractAddress(init),
                    customPayload: null,
                    forwardTonAmount: ton("0.1"),
                    forwardPayload: beginCell()
                        .storeUint(1, 1)
                        .storeRef(beginCell().storeUint(0x55d9ab43, 32).endCell())
                        .asSlice()
                }.toCell()
            });
        } else if (op == SetToken.opcode()) {
            require(self.owner == msg.sender, "access denied");
            self.token = DaoToken{
                jetton_wallet: sender(),
                dao_fee: data.loadCoins()
            };
        } else {
            require(sender() == self.token!!.jetton_wallet, "bad request");
            require(msg.amount >= self.token!!.dao_fee, "not enough");
            require(ctx.value >= ton("0.09"), "gas error");

            let init: StateInit = initOf ContractCitizenDAOv1(msg.sender, null, 0);

            deploy(DeployParameters{
                init: init,
                value: ctx.value,
                body: "init".asComment()
            });
        }
    }

    receive(msg: PassportControl) {
        let ctx: Context = context();
        let init: StateInit = initOf ContractCitizenDAOv1(msg.citizen, null, 0);

        require(ctx.value > ton("0.05"), "gas error");
        require(sender() == contractAddress(init), "access denied");
        require(msg.status == 0, "already exists");

        send(SendParameters{
            to: self.collection,
            value: ctx.value,
            body: DeployNFT{
                queryId: 0,
                itemIndex: 0,
                amount: ctx.value,
                initNFTBody: beginCell().storeAddress(msg.citizen).endCell()
            }.toCell()
        });
    }

    get fun get_dao_token(): DaoToken? {
        return self.token;
    }

    get fun get_dao_admins(): map<Address, Bool> {
        return self.admins;
    }

    get fun get_citizen_data(citizen: Address): Address {
        return contractAddress(initOf ContractCitizenDAOv1(citizen, null, 0));
    }
}