import "./structs.tact";

message(0x57f5d9f1) DAOvote {
    endTime: Int as uint64;
    isJetton: Bool;
    isNFTSBT: Bool;
    metadata: Cell;
}

message(0xdd633320) WhiteList {
    queryId: Int as uint64;
    jettonWallet: Address;
    jettonMaster: Address;
    jettonFee: Int as coins;
    amount: Int as coins;
    admin: Address;
}

message(0xa5e61af0) DropCollection {
    queryId: Int as uint64;
    address: Address;
}

message(11) ChangeAdminCitizen {
    queryId: Int as uint64;
    citizen: Address;
    address: Address;
}

message(7) ChangeOwnerDAO {
    queryId: Int as uint64;
    address: Address;
}

message(8) GetFunds {
    queryId: Int as uint64;
    jettonWallet: Address;
    jettonAmount: Int as coins;
}

message(9) AddAdmin {
    queryId: Int as uint64;
    address: Address;
}

message(10) RemoveAdmin {
    queryId: Int as uint64;
    address: Address;
}

message(0x7362d09c) JettonTransferNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

message(0xb8ce5880) StartNewVoting {
    metadata: Cell;
    settings: VoteSettings;
}

message(0x2ad414aa) StartDAOVoting {
    queryId: Int as uint64;
    metadata: Cell;
    settings: VoteSettings;
}

message(0x55d9ab43) InitVoting {
    queryId: Int as uint64;
    totalSupply: Int as coins;
}

message(0x29260a40) ActivateVote {
    contractAddress: Address;
    admin: Address;
}

message(0x19ef3d5b) CallVote {
    queryId: Int as uint64;
}

message(0xb5487dc9) GiveVote {
    queryId: Int as uint64;
}

message(0xebf2f4ce) TakeVote {
    queryId: Int as uint64;
}

message(0xe94e61b2) TakeDAOVote {
    adminAddress: Address;
    optionAddress: Address;
}

message(0xdeed) PassPassport {
    queryId: Int as uint64;
    address: Address;
}

message(0xc0c0dd4d) SetToken {
    dao_fee: Int as coins;
}

message(0xc8b1f5ab) AddOption {
    queryId: Int as uint64;
    title: String;
    description: String;
}

message(0xdb89bc8a) VaultInitialization {
    queryId: Int as uint64;
    admin: Address;
}

message(0xd7bbd5c) VirtualInitialization {
    queryId: Int as uint64;
    optionAddress: Address;
}

message(0xefc982b2) SubmitVoting {
    queryId: Int as uint64;
    adminAddress: Address;
    optionAddress: Address;
}

message(0x1df76c5f) CancelVoting {
    queryId: Int as uint64;
    adminAddress: Address;
    optionAddress: Address;
}

message(0x16f5c9cb) ProvideAction {
    queryId: Int as uint64;
    address: Address;
    payload: Cell;
}

message(0x6e224c67) ProvideActionDAO {
    queryId: Int as uint64;
    admin: Address;
    payload: Cell;
}

message(0x383977b6) ProvideVoting {
    optionAddress: Address;
}

message(0xdeadbeef) PassportControl {
    queryId: Int as uint64;
    citizen: Address;
    status: Int as uint4;
}