import "./messages.tact";
import "./structs.tact";
import "./jetton/messages.tact";

contract ContractJettonDAOv1(
    owner: Address,
    admin: Address,
    option: Address,
    wallet: Address,
    amount: Int as coins,
) {
    receive("vote") { return }

    receive(msg: JettonTransferNotification) {
        require(msg.sender == self.owner, "access denied");
        self.wallet = sender();
        self.amount += msg.amount;
    }

    receive(msg: TakeVote) {
        let ctx: Context = context();
        require(ctx.value > ton("0.12"), "gas error");
        require(sender() == self.admin, "access denied");

        let ref: Cell = TakeDAOVote{ adminAddress: self.admin, optionAddress: self.option }.toCell();

        send(SendParameters{
            to: self.wallet,
            value: ton("0.12"),
            body: JettonTransfer {
                queryId: 42,
                amount: self.amount,
                destination: self.owner,
                responseDestination: self.owner,
                customPayload: null,
                forwardTonAmount: ton("0.1"),
                forwardPayload: beginCell()
                    .storeUint(1, 1)
                    .storeRef(ref)
                    .asSlice(),
            }.toCell()
        });

        self.amount = 0;
    }

    get fun get_option(): Address {
        return self.option;
    }
}
