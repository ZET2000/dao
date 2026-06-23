struct TokenInfo {
    jetton_master: Address;
    jetton_fee: Int as coins;
    amount: Int as coins;
    admin: Address;
}

struct DaoToken {
    jetton_wallet: Address;
    dao_fee: Int as coins;
}

struct OptionInfo {
    title: String;
    description: String;
}

struct OptionInfoRoot {
    address: Address;
    title: String;
    description: String;
}

struct VoteSettings {
    endTime: Int as uint64;
    min_amount: Int as coins;
    fee: Int as coins;
}

struct StartNewVotingStruct {
    metadata: Cell;
    settings: VoteSettings;
}

struct StartNewVotingTestStruct {
    endTime: Int as uint64;
    min_amount: Int as coins;
    fee: Int as coins;
}

struct TakeDAOVoteStruct {
    adminAddress: Address;
    optionAddress: Address;
}