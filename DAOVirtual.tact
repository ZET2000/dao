import "./messages.tact";
import "./structs.tact";

contract ContractVirtualDAOv2(
    owner: Address,
    admin: Address,
    option: Address?,
    status: Int as uint4,
) {
    receive(msg: VirtualInitialization) {
        let ctx: Context = context();
        require(sender() == self.owner, "access denied");
        require(self.status == 0, "wrong operation");

        self.option = msg.optionAddress;
        self.status = 1;

        send(SendParameters{
            to: self.owner,
            value: ctx.value - ton("0.015"),
            body: SubmitVoting{
                queryId: 0,
                adminAddress: self.admin,
                optionAddress: msg.optionAddress,
            }.toCell()
        });
    }

    receive("-") {
        let ctx: Context = context();
        require(sender() == self.owner, "access denied");
        require(self.status == 1, "wrong operation");

        send(SendParameters{
            to: self.owner,
            value: ctx.value - ton("0.01"),
            body: CancelVoting{
                queryId: 0,
                adminAddress: self.admin,
                optionAddress: self.option!!,
            }.toCell()
        });

        self.option = null;
        self.status = 0;
    }

    get fun get_option(): Address? {
        return self.option;
    }
}