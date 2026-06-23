import "./messages.tact";
import "./structs.tact";

contract ContractVaultDAOv1(
    owner: Address,
    status: Int as uint4,
    data: OptionInfo,
) {
    receive(msg: VaultInitialization) {
        let ctx: Context = context();
        require(sender() == self.owner, "access denied");
        require(self.status == 0, "wrong operation");

        self.status = 1;
    }

    get fun info(): OptionInfo {
        return self.data;
    }
}