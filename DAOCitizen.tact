import "./messages.tact";
import "./structs.tact";

contract ContractCitizenDAOv1(
    owner: Address,
    admin: Address?,
    status: Int as uint4,
) {
    receive("init") {
        let ctx: Context = context();
        require(self.admin == null, "access denied");

        send(SendParameters{
            to: sender(),
            value: ctx.value - ton("0.015"),
            body: PassportControl{
                queryId: 0,
                citizen: self.owner,
                status: self.status,
            }.toCell()
        });

        self.admin = sender();
    }

    receive(msg: PassPassport) {
        require(sender() == self.admin!!, "access denied");
        self.status = 1;
    }

    receive(msg: ProvideAction) {
        let ctx: Context = context();

        require(ctx.value > ton("0.055"), "gas error");
        require(self.status == 1, "wrong operation");
        require(sender() == self.admin!! || sender() == self.owner, "access denied");

        send(SendParameters{
            to: msg.address,
            value: ctx.value - ton("0.005"),
            body: ProvideActionDAO{
                queryId: 0,
                admin: self.owner,
                payload: msg.payload
            }.toCell()
        });
    }

    receive(msg: ChangeAdminCitizen) {
        require(sender() == self.admin!!, "access denied");
        self.admin = msg.address;
    }

    get fun get_owner(): Address {
        return self.owner;
    }

    get fun get_admin(): Address? {
        return self.admin;
    }

    get fun get_status(): Int {
        return self.status;
    }
}