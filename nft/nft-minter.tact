import "./constants";
import "./messages";
import "./item";

contract NFTCollection {
    owner: Address;
    admin: Address;
    nextItemIndex: Int as uint64; // IndexSizeBits = 64
    content: Cell;
    defaultContent: Cell;
    royaltyParams: RoyaltyParams;

    commonCode: Cell;
    commonData: Builder;

    init(owner: Address, admin: Address, nextItemIndex: Int as uint64, collectionContent: Cell, defaultContent: Cell) {
        self.owner = owner;
        self.admin = admin;
        self.nextItemIndex = nextItemIndex;
        self.content = collectionContent;
        self.defaultContent = defaultContent;
        self.royaltyParams = RoyaltyParams{nominator: 0, dominator: 100, owner: owner};

        self.commonCode = codeOf NFTItem;
        self.commonData = beginCell()
            .storeUint(0, 3)
            .storeAddress(self.owner)
            .storeAddress(myAddress());
    }

    receive() {} // ignore empty messages

    receive(msg: DeployNFT) {
        throwUnless(IncorrectSender, sender() == self.owner || sender() == self.admin);
        //throwUnless(IncorrectIndex, msg.itemIndex <= self.nextItemIndex);

        let data = msg.initNFTBody.beginParse();

        deployNFTItem(
            self.commonCode,
            self.nextItemIndex,
            msg.amount,
            beginCell().storeAddress(data.loadAddress()).storeRef(self.defaultContent).endCell(),
            self.commonData
        );

        self.nextItemIndex += 1;
    }

    receive(msg: GetRoyaltyParams) {
        message(MessageParameters {
            bounce: false,
            to: sender(),
            value: 0,
            body: ReportRoyaltyParams {
                queryId: msg.queryId,
                params: self.royaltyParams,
            }.toCell(),
            mode: SendRemainingValue,
        });
    }

    receive(msg: BatchDeploy) {
        throwUnless(IncorrectSender, sender() == self.owner || sender() == self.admin);

        let currNFTItem: DictGet = dictGetMin(msg.deployList, IndexSizeBits);
        let counter: Int = 0;

        while (currNFTItem.flag != 0) {
            counter += 1;
            // we can check outside the loop, but for benchmark place it here
            throwIf(IncorrectAmount, counter >= 250); // implementation detail

            throwUnless(IncorrectIndexes + counter, currNFTItem.itemIndex!! <= self.nextItemIndex);

            let dictItem: DictItem = DictItem.fromSlice(currNFTItem.item!!);

            deployNFTItem(self.commonCode, currNFTItem.itemIndex!!, dictItem.amount, dictItem.initNFTBody, self.commonData);

            if (currNFTItem.itemIndex!! == self.nextItemIndex) {
                self.nextItemIndex += 1;
            }

            currNFTItem = dictGetNext(currNFTItem.itemIndex!!, msg.deployList, IndexSizeBits);
        }
    }

    receive(msg: ChangeOwner) {
        throwUnless(IncorrectSender, sender() == self.owner || sender() == self.admin);
        self.admin = msg.newOwner;
    }

    get fun get_collection_data(): CollectionData {
        let sb: StringBuilder = beginString();
        sb.append(self.content.asSlice().asString());
        return CollectionData {
            nextItemIndex: self.nextItemIndex,
            collectionContent: sb.toCell(),
            owner: self.owner,
        };
    }

    get fun get_nft_address_by_index(index: Int): Address {
        let stateInit = initOf NFTItem(null, null, self.owner, myAddress(), index);
        return contractAddress(stateInit);
    }

    get fun royalty_params(): RoyaltyParams {
        return self.royaltyParams;
    }

    get fun get_nft_content(index: Int, individualNFTContent: Cell): Cell {
        let sb: StringBuilder = beginString();
        sb.append(individualNFTContent.asSlice().asString());
        return sb.toCell();
    }
}

inline fun deployNFTItem(commonCode: Cell, itemIndex: Int, amount: Int, initNFTBody: Cell, commonData: Builder) {
    let data: Cell = commonData.storeUint(itemIndex, 64).endCell(); // IndexSizeBits = 64

    deploy(DeployParameters {
        value: amount,
        body: initNFTBody,
        init: StateInit { code: commonCode, data: data },
        mode: SendPayFwdFeesSeparately,
    });
}

struct DictGet {
    itemIndex: Int? as uint64; // IndexSizeBits = 64
    item: Slice?;
    flag: Int;
}

struct DictItem {
    amount: Int as coins;
    initNFTBody: Cell;
}

// (int, slice, int) udict_get_min?(cell dict, int key_len) asm (-> 1 0 2) "DICTUMIN" "NULLSWAPIFNOT2";
asm(-> 1 0 2) fun dictGetMin(dict: Cell, keySize: Int): DictGet { DICTUMIN NULLSWAPIFNOT2 }

// (int, slice, int) udict_get_next?(cell dict, int key_len, int pivot) asm(pivot dict key_len -> 1 0 2) "DICTUGETNEXT" "NULLSWAPIFNOT2";
asm(-> 1 0 2) fun dictGetNext(pivot: Int, dict: Cell, keySize: Int): DictGet { DICTUGETNEXT NULLSWAPIFNOT2 }