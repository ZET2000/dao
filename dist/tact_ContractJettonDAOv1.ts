import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type DAOvote = {
    $$type: 'DAOvote';
    endTime: bigint;
    isJetton: boolean;
    isNFTSBT: boolean;
    metadata: Cell;
}

export function storeDAOvote(src: DAOvote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1475729905, 32);
        b_0.storeUint(src.endTime, 64);
        b_0.storeBit(src.isJetton);
        b_0.storeBit(src.isNFTSBT);
        b_0.storeRef(src.metadata);
    };
}

export function loadDAOvote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1475729905) { throw Error('Invalid prefix'); }
    const _endTime = sc_0.loadUintBig(64);
    const _isJetton = sc_0.loadBit();
    const _isNFTSBT = sc_0.loadBit();
    const _metadata = sc_0.loadRef();
    return { $$type: 'DAOvote' as const, endTime: _endTime, isJetton: _isJetton, isNFTSBT: _isNFTSBT, metadata: _metadata };
}

export function loadTupleDAOvote(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _isJetton = source.readBoolean();
    const _isNFTSBT = source.readBoolean();
    const _metadata = source.readCell();
    return { $$type: 'DAOvote' as const, endTime: _endTime, isJetton: _isJetton, isNFTSBT: _isNFTSBT, metadata: _metadata };
}

export function loadGetterTupleDAOvote(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _isJetton = source.readBoolean();
    const _isNFTSBT = source.readBoolean();
    const _metadata = source.readCell();
    return { $$type: 'DAOvote' as const, endTime: _endTime, isJetton: _isJetton, isNFTSBT: _isNFTSBT, metadata: _metadata };
}

export function storeTupleDAOvote(source: DAOvote) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.endTime);
    builder.writeBoolean(source.isJetton);
    builder.writeBoolean(source.isNFTSBT);
    builder.writeCell(source.metadata);
    return builder.build();
}

export function dictValueParserDAOvote(): DictionaryValue<DAOvote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDAOvote(src)).endCell());
        },
        parse: (src) => {
            return loadDAOvote(src.loadRef().beginParse());
        }
    }
}

export type WhiteList = {
    $$type: 'WhiteList';
    queryId: bigint;
    jettonWallet: Address;
    jettonMaster: Address;
    jettonFee: bigint;
    amount: bigint;
    admin: Address;
}

export function storeWhiteList(src: WhiteList) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3714265888, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeCoins(src.jettonFee);
        b_0.storeCoins(src.amount);
        const b_1 = new Builder();
        b_1.storeAddress(src.admin);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadWhiteList(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3714265888) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _jettonWallet = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const _jettonFee = sc_0.loadCoins();
    const _amount = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _admin = sc_1.loadAddress();
    return { $$type: 'WhiteList' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonMaster: _jettonMaster, jettonFee: _jettonFee, amount: _amount, admin: _admin };
}

export function loadTupleWhiteList(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _jettonWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonFee = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'WhiteList' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonMaster: _jettonMaster, jettonFee: _jettonFee, amount: _amount, admin: _admin };
}

export function loadGetterTupleWhiteList(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _jettonWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonFee = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'WhiteList' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonMaster: _jettonMaster, jettonFee: _jettonFee, amount: _amount, admin: _admin };
}

export function storeTupleWhiteList(source: WhiteList) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.jettonMaster);
    builder.writeNumber(source.jettonFee);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.admin);
    return builder.build();
}

export function dictValueParserWhiteList(): DictionaryValue<WhiteList> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWhiteList(src)).endCell());
        },
        parse: (src) => {
            return loadWhiteList(src.loadRef().beginParse());
        }
    }
}

export type DropCollection = {
    $$type: 'DropCollection';
    queryId: bigint;
    address: Address;
}

export function storeDropCollection(src: DropCollection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2783320816, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadDropCollection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2783320816) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    return { $$type: 'DropCollection' as const, queryId: _queryId, address: _address };
}

export function loadTupleDropCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'DropCollection' as const, queryId: _queryId, address: _address };
}

export function loadGetterTupleDropCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'DropCollection' as const, queryId: _queryId, address: _address };
}

export function storeTupleDropCollection(source: DropCollection) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserDropCollection(): DictionaryValue<DropCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDropCollection(src)).endCell());
        },
        parse: (src) => {
            return loadDropCollection(src.loadRef().beginParse());
        }
    }
}

export type ChangeAdminCitizen = {
    $$type: 'ChangeAdminCitizen';
    queryId: bigint;
    citizen: Address;
    address: Address;
}

export function storeChangeAdminCitizen(src: ChangeAdminCitizen) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(11, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.citizen);
        b_0.storeAddress(src.address);
    };
}

export function loadChangeAdminCitizen(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 11) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _citizen = sc_0.loadAddress();
    const _address = sc_0.loadAddress();
    return { $$type: 'ChangeAdminCitizen' as const, queryId: _queryId, citizen: _citizen, address: _address };
}

export function loadTupleChangeAdminCitizen(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _citizen = source.readAddress();
    const _address = source.readAddress();
    return { $$type: 'ChangeAdminCitizen' as const, queryId: _queryId, citizen: _citizen, address: _address };
}

export function loadGetterTupleChangeAdminCitizen(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _citizen = source.readAddress();
    const _address = source.readAddress();
    return { $$type: 'ChangeAdminCitizen' as const, queryId: _queryId, citizen: _citizen, address: _address };
}

export function storeTupleChangeAdminCitizen(source: ChangeAdminCitizen) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.citizen);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserChangeAdminCitizen(): DictionaryValue<ChangeAdminCitizen> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeAdminCitizen(src)).endCell());
        },
        parse: (src) => {
            return loadChangeAdminCitizen(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerDAO = {
    $$type: 'ChangeOwnerDAO';
    queryId: bigint;
    address: Address;
}

export function storeChangeOwnerDAO(src: ChangeOwnerDAO) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(7, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadChangeOwnerDAO(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 7) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerDAO' as const, queryId: _queryId, address: _address };
}

export function loadTupleChangeOwnerDAO(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'ChangeOwnerDAO' as const, queryId: _queryId, address: _address };
}

export function loadGetterTupleChangeOwnerDAO(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'ChangeOwnerDAO' as const, queryId: _queryId, address: _address };
}

export function storeTupleChangeOwnerDAO(source: ChangeOwnerDAO) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserChangeOwnerDAO(): DictionaryValue<ChangeOwnerDAO> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerDAO(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerDAO(src.loadRef().beginParse());
        }
    }
}

export type GetFunds = {
    $$type: 'GetFunds';
    queryId: bigint;
    jettonWallet: Address;
    jettonAmount: bigint;
}

export function storeGetFunds(src: GetFunds) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(8, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeCoins(src.jettonAmount);
    };
}

export function loadGetFunds(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 8) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _jettonWallet = sc_0.loadAddress();
    const _jettonAmount = sc_0.loadCoins();
    return { $$type: 'GetFunds' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount };
}

export function loadTupleGetFunds(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _jettonWallet = source.readAddress();
    const _jettonAmount = source.readBigNumber();
    return { $$type: 'GetFunds' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount };
}

export function loadGetterTupleGetFunds(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _jettonWallet = source.readAddress();
    const _jettonAmount = source.readBigNumber();
    return { $$type: 'GetFunds' as const, queryId: _queryId, jettonWallet: _jettonWallet, jettonAmount: _jettonAmount };
}

export function storeTupleGetFunds(source: GetFunds) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeNumber(source.jettonAmount);
    return builder.build();
}

export function dictValueParserGetFunds(): DictionaryValue<GetFunds> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetFunds(src)).endCell());
        },
        parse: (src) => {
            return loadGetFunds(src.loadRef().beginParse());
        }
    }
}

export type AddAdmin = {
    $$type: 'AddAdmin';
    queryId: bigint;
    address: Address;
}

export function storeAddAdmin(src: AddAdmin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(9, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadAddAdmin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 9) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    return { $$type: 'AddAdmin' as const, queryId: _queryId, address: _address };
}

export function loadTupleAddAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'AddAdmin' as const, queryId: _queryId, address: _address };
}

export function loadGetterTupleAddAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'AddAdmin' as const, queryId: _queryId, address: _address };
}

export function storeTupleAddAdmin(source: AddAdmin) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserAddAdmin(): DictionaryValue<AddAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadAddAdmin(src.loadRef().beginParse());
        }
    }
}

export type RemoveAdmin = {
    $$type: 'RemoveAdmin';
    queryId: bigint;
    address: Address;
}

export function storeRemoveAdmin(src: RemoveAdmin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(10, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadRemoveAdmin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 10) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    return { $$type: 'RemoveAdmin' as const, queryId: _queryId, address: _address };
}

export function loadTupleRemoveAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'RemoveAdmin' as const, queryId: _queryId, address: _address };
}

export function loadGetterTupleRemoveAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'RemoveAdmin' as const, queryId: _queryId, address: _address };
}

export function storeTupleRemoveAdmin(source: RemoveAdmin) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserRemoveAdmin(): DictionaryValue<RemoveAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveAdmin(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleJettonTransferNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type StartNewVoting = {
    $$type: 'StartNewVoting';
    metadata: Cell;
    settings: VoteSettings;
}

export function storeStartNewVoting(src: StartNewVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3100530816, 32);
        b_0.storeRef(src.metadata);
        b_0.store(storeVoteSettings(src.settings));
    };
}

export function loadStartNewVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3100530816) { throw Error('Invalid prefix'); }
    const _metadata = sc_0.loadRef();
    const _settings = loadVoteSettings(sc_0);
    return { $$type: 'StartNewVoting' as const, metadata: _metadata, settings: _settings };
}

export function loadTupleStartNewVoting(source: TupleReader) {
    const _metadata = source.readCell();
    const _settings = loadTupleVoteSettings(source);
    return { $$type: 'StartNewVoting' as const, metadata: _metadata, settings: _settings };
}

export function loadGetterTupleStartNewVoting(source: TupleReader) {
    const _metadata = source.readCell();
    const _settings = loadGetterTupleVoteSettings(source);
    return { $$type: 'StartNewVoting' as const, metadata: _metadata, settings: _settings };
}

export function storeTupleStartNewVoting(source: StartNewVoting) {
    const builder = new TupleBuilder();
    builder.writeCell(source.metadata);
    builder.writeTuple(storeTupleVoteSettings(source.settings));
    return builder.build();
}

export function dictValueParserStartNewVoting(): DictionaryValue<StartNewVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartNewVoting(src)).endCell());
        },
        parse: (src) => {
            return loadStartNewVoting(src.loadRef().beginParse());
        }
    }
}

export type StartDAOVoting = {
    $$type: 'StartDAOVoting';
    queryId: bigint;
    metadata: Cell;
    settings: VoteSettings;
}

export function storeStartDAOVoting(src: StartDAOVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(718541994, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.metadata);
        b_0.store(storeVoteSettings(src.settings));
    };
}

export function loadStartDAOVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 718541994) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _metadata = sc_0.loadRef();
    const _settings = loadVoteSettings(sc_0);
    return { $$type: 'StartDAOVoting' as const, queryId: _queryId, metadata: _metadata, settings: _settings };
}

export function loadTupleStartDAOVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadTupleVoteSettings(source);
    return { $$type: 'StartDAOVoting' as const, queryId: _queryId, metadata: _metadata, settings: _settings };
}

export function loadGetterTupleStartDAOVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadGetterTupleVoteSettings(source);
    return { $$type: 'StartDAOVoting' as const, queryId: _queryId, metadata: _metadata, settings: _settings };
}

export function storeTupleStartDAOVoting(source: StartDAOVoting) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.metadata);
    builder.writeTuple(storeTupleVoteSettings(source.settings));
    return builder.build();
}

export function dictValueParserStartDAOVoting(): DictionaryValue<StartDAOVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartDAOVoting(src)).endCell());
        },
        parse: (src) => {
            return loadStartDAOVoting(src.loadRef().beginParse());
        }
    }
}

export type InitVoting = {
    $$type: 'InitVoting';
    queryId: bigint;
    totalSupply: bigint;
}

export function storeInitVoting(src: InitVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1440328515, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.totalSupply);
    };
}

export function loadInitVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1440328515) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _totalSupply = sc_0.loadCoins();
    return { $$type: 'InitVoting' as const, queryId: _queryId, totalSupply: _totalSupply };
}

export function loadTupleInitVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _totalSupply = source.readBigNumber();
    return { $$type: 'InitVoting' as const, queryId: _queryId, totalSupply: _totalSupply };
}

export function loadGetterTupleInitVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _totalSupply = source.readBigNumber();
    return { $$type: 'InitVoting' as const, queryId: _queryId, totalSupply: _totalSupply };
}

export function storeTupleInitVoting(source: InitVoting) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.totalSupply);
    return builder.build();
}

export function dictValueParserInitVoting(): DictionaryValue<InitVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitVoting(src)).endCell());
        },
        parse: (src) => {
            return loadInitVoting(src.loadRef().beginParse());
        }
    }
}

export type ActivateVote = {
    $$type: 'ActivateVote';
    contractAddress: Address;
    admin: Address;
}

export function storeActivateVote(src: ActivateVote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(690358848, 32);
        b_0.storeAddress(src.contractAddress);
        b_0.storeAddress(src.admin);
    };
}

export function loadActivateVote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 690358848) { throw Error('Invalid prefix'); }
    const _contractAddress = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    return { $$type: 'ActivateVote' as const, contractAddress: _contractAddress, admin: _admin };
}

export function loadTupleActivateVote(source: TupleReader) {
    const _contractAddress = source.readAddress();
    const _admin = source.readAddress();
    return { $$type: 'ActivateVote' as const, contractAddress: _contractAddress, admin: _admin };
}

export function loadGetterTupleActivateVote(source: TupleReader) {
    const _contractAddress = source.readAddress();
    const _admin = source.readAddress();
    return { $$type: 'ActivateVote' as const, contractAddress: _contractAddress, admin: _admin };
}

export function storeTupleActivateVote(source: ActivateVote) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.contractAddress);
    builder.writeAddress(source.admin);
    return builder.build();
}

export function dictValueParserActivateVote(): DictionaryValue<ActivateVote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeActivateVote(src)).endCell());
        },
        parse: (src) => {
            return loadActivateVote(src.loadRef().beginParse());
        }
    }
}

export type CallVote = {
    $$type: 'CallVote';
    queryId: bigint;
}

export function storeCallVote(src: CallVote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(435109211, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadCallVote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 435109211) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'CallVote' as const, queryId: _queryId };
}

export function loadTupleCallVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'CallVote' as const, queryId: _queryId };
}

export function loadGetterTupleCallVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'CallVote' as const, queryId: _queryId };
}

export function storeTupleCallVote(source: CallVote) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserCallVote(): DictionaryValue<CallVote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCallVote(src)).endCell());
        },
        parse: (src) => {
            return loadCallVote(src.loadRef().beginParse());
        }
    }
}

export type GiveVote = {
    $$type: 'GiveVote';
    queryId: bigint;
}

export function storeGiveVote(src: GiveVote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3041426889, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGiveVote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3041426889) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GiveVote' as const, queryId: _queryId };
}

export function loadTupleGiveVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GiveVote' as const, queryId: _queryId };
}

export function loadGetterTupleGiveVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GiveVote' as const, queryId: _queryId };
}

export function storeTupleGiveVote(source: GiveVote) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserGiveVote(): DictionaryValue<GiveVote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGiveVote(src)).endCell());
        },
        parse: (src) => {
            return loadGiveVote(src.loadRef().beginParse());
        }
    }
}

export type TakeVote = {
    $$type: 'TakeVote';
    queryId: bigint;
}

export function storeTakeVote(src: TakeVote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3958568142, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTakeVote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3958568142) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TakeVote' as const, queryId: _queryId };
}

export function loadTupleTakeVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'TakeVote' as const, queryId: _queryId };
}

export function loadGetterTupleTakeVote(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'TakeVote' as const, queryId: _queryId };
}

export function storeTupleTakeVote(source: TakeVote) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserTakeVote(): DictionaryValue<TakeVote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeVote(src)).endCell());
        },
        parse: (src) => {
            return loadTakeVote(src.loadRef().beginParse());
        }
    }
}

export type TakeDAOVote = {
    $$type: 'TakeDAOVote';
    adminAddress: Address;
    optionAddress: Address;
}

export function storeTakeDAOVote(src: TakeDAOVote) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3914228146, 32);
        b_0.storeAddress(src.adminAddress);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadTakeDAOVote(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3914228146) { throw Error('Invalid prefix'); }
    const _adminAddress = sc_0.loadAddress();
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'TakeDAOVote' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadTupleTakeDAOVote(source: TupleReader) {
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'TakeDAOVote' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadGetterTupleTakeDAOVote(source: TupleReader) {
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'TakeDAOVote' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function storeTupleTakeDAOVote(source: TakeDAOVote) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.adminAddress);
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserTakeDAOVote(): DictionaryValue<TakeDAOVote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDAOVote(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDAOVote(src.loadRef().beginParse());
        }
    }
}

export type PassPassport = {
    $$type: 'PassPassport';
    queryId: bigint;
    address: Address;
}

export function storePassPassport(src: PassPassport) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(57069, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadPassPassport(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 57069) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    return { $$type: 'PassPassport' as const, queryId: _queryId, address: _address };
}

export function loadTuplePassPassport(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'PassPassport' as const, queryId: _queryId, address: _address };
}

export function loadGetterTuplePassPassport(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'PassPassport' as const, queryId: _queryId, address: _address };
}

export function storeTuplePassPassport(source: PassPassport) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserPassPassport(): DictionaryValue<PassPassport> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePassPassport(src)).endCell());
        },
        parse: (src) => {
            return loadPassPassport(src.loadRef().beginParse());
        }
    }
}

export type SetToken = {
    $$type: 'SetToken';
    dao_fee: bigint;
}

export function storeSetToken(src: SetToken) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3233865037, 32);
        b_0.storeCoins(src.dao_fee);
    };
}

export function loadSetToken(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3233865037) { throw Error('Invalid prefix'); }
    const _dao_fee = sc_0.loadCoins();
    return { $$type: 'SetToken' as const, dao_fee: _dao_fee };
}

export function loadTupleSetToken(source: TupleReader) {
    const _dao_fee = source.readBigNumber();
    return { $$type: 'SetToken' as const, dao_fee: _dao_fee };
}

export function loadGetterTupleSetToken(source: TupleReader) {
    const _dao_fee = source.readBigNumber();
    return { $$type: 'SetToken' as const, dao_fee: _dao_fee };
}

export function storeTupleSetToken(source: SetToken) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.dao_fee);
    return builder.build();
}

export function dictValueParserSetToken(): DictionaryValue<SetToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetToken(src)).endCell());
        },
        parse: (src) => {
            return loadSetToken(src.loadRef().beginParse());
        }
    }
}

export type AddOption = {
    $$type: 'AddOption';
    queryId: bigint;
    title: string;
    description: string;
}

export function storeAddOption(src: AddOption) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3367105963, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadAddOption(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3367105963) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _title = sc_0.loadStringRefTail();
    const _description = sc_0.loadStringRefTail();
    return { $$type: 'AddOption' as const, queryId: _queryId, title: _title, description: _description };
}

export function loadTupleAddOption(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'AddOption' as const, queryId: _queryId, title: _title, description: _description };
}

export function loadGetterTupleAddOption(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'AddOption' as const, queryId: _queryId, title: _title, description: _description };
}

export function storeTupleAddOption(source: AddOption) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.title);
    builder.writeString(source.description);
    return builder.build();
}

export function dictValueParserAddOption(): DictionaryValue<AddOption> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddOption(src)).endCell());
        },
        parse: (src) => {
            return loadAddOption(src.loadRef().beginParse());
        }
    }
}

export type VaultInitialization = {
    $$type: 'VaultInitialization';
    queryId: bigint;
    admin: Address;
}

export function storeVaultInitialization(src: VaultInitialization) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3683237002, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.admin);
    };
}

export function loadVaultInitialization(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3683237002) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _admin = sc_0.loadAddress();
    return { $$type: 'VaultInitialization' as const, queryId: _queryId, admin: _admin };
}

export function loadTupleVaultInitialization(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'VaultInitialization' as const, queryId: _queryId, admin: _admin };
}

export function loadGetterTupleVaultInitialization(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'VaultInitialization' as const, queryId: _queryId, admin: _admin };
}

export function storeTupleVaultInitialization(source: VaultInitialization) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.admin);
    return builder.build();
}

export function dictValueParserVaultInitialization(): DictionaryValue<VaultInitialization> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVaultInitialization(src)).endCell());
        },
        parse: (src) => {
            return loadVaultInitialization(src.loadRef().beginParse());
        }
    }
}

export type VirtualInitialization = {
    $$type: 'VirtualInitialization';
    queryId: bigint;
    optionAddress: Address;
}

export function storeVirtualInitialization(src: VirtualInitialization) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(226213212, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadVirtualInitialization(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 226213212) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'VirtualInitialization' as const, queryId: _queryId, optionAddress: _optionAddress };
}

export function loadTupleVirtualInitialization(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _optionAddress = source.readAddress();
    return { $$type: 'VirtualInitialization' as const, queryId: _queryId, optionAddress: _optionAddress };
}

export function loadGetterTupleVirtualInitialization(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _optionAddress = source.readAddress();
    return { $$type: 'VirtualInitialization' as const, queryId: _queryId, optionAddress: _optionAddress };
}

export function storeTupleVirtualInitialization(source: VirtualInitialization) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserVirtualInitialization(): DictionaryValue<VirtualInitialization> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVirtualInitialization(src)).endCell());
        },
        parse: (src) => {
            return loadVirtualInitialization(src.loadRef().beginParse());
        }
    }
}

export type SubmitVoting = {
    $$type: 'SubmitVoting';
    queryId: bigint;
    adminAddress: Address;
    optionAddress: Address;
}

export function storeSubmitVoting(src: SubmitVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4022960818, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.adminAddress);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadSubmitVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4022960818) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _adminAddress = sc_0.loadAddress();
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'SubmitVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadTupleSubmitVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'SubmitVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadGetterTupleSubmitVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'SubmitVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function storeTupleSubmitVoting(source: SubmitVoting) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.adminAddress);
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserSubmitVoting(): DictionaryValue<SubmitVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubmitVoting(src)).endCell());
        },
        parse: (src) => {
            return loadSubmitVoting(src.loadRef().beginParse());
        }
    }
}

export type CancelVoting = {
    $$type: 'CancelVoting';
    queryId: bigint;
    adminAddress: Address;
    optionAddress: Address;
}

export function storeCancelVoting(src: CancelVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(502754399, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.adminAddress);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadCancelVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 502754399) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _adminAddress = sc_0.loadAddress();
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'CancelVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadTupleCancelVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'CancelVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadGetterTupleCancelVoting(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'CancelVoting' as const, queryId: _queryId, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function storeTupleCancelVoting(source: CancelVoting) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.adminAddress);
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserCancelVoting(): DictionaryValue<CancelVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelVoting(src)).endCell());
        },
        parse: (src) => {
            return loadCancelVoting(src.loadRef().beginParse());
        }
    }
}

export type ProvideAction = {
    $$type: 'ProvideAction';
    queryId: bigint;
    address: Address;
    payload: Cell;
}

export function storeProvideAction(src: ProvideAction) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(385206731, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
        b_0.storeRef(src.payload);
    };
}

export function loadProvideAction(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 385206731) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _address = sc_0.loadAddress();
    const _payload = sc_0.loadRef();
    return { $$type: 'ProvideAction' as const, queryId: _queryId, address: _address, payload: _payload };
}

export function loadTupleProvideAction(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    const _payload = source.readCell();
    return { $$type: 'ProvideAction' as const, queryId: _queryId, address: _address, payload: _payload };
}

export function loadGetterTupleProvideAction(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    const _payload = source.readCell();
    return { $$type: 'ProvideAction' as const, queryId: _queryId, address: _address, payload: _payload };
}

export function storeTupleProvideAction(source: ProvideAction) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserProvideAction(): DictionaryValue<ProvideAction> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideAction(src)).endCell());
        },
        parse: (src) => {
            return loadProvideAction(src.loadRef().beginParse());
        }
    }
}

export type ProvideActionDAO = {
    $$type: 'ProvideActionDAO';
    queryId: bigint;
    admin: Address;
    payload: Cell;
}

export function storeProvideActionDAO(src: ProvideActionDAO) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1847741543, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.admin);
        b_0.storeRef(src.payload);
    };
}

export function loadProvideActionDAO(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1847741543) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _admin = sc_0.loadAddress();
    const _payload = sc_0.loadRef();
    return { $$type: 'ProvideActionDAO' as const, queryId: _queryId, admin: _admin, payload: _payload };
}

export function loadTupleProvideActionDAO(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _admin = source.readAddress();
    const _payload = source.readCell();
    return { $$type: 'ProvideActionDAO' as const, queryId: _queryId, admin: _admin, payload: _payload };
}

export function loadGetterTupleProvideActionDAO(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _admin = source.readAddress();
    const _payload = source.readCell();
    return { $$type: 'ProvideActionDAO' as const, queryId: _queryId, admin: _admin, payload: _payload };
}

export function storeTupleProvideActionDAO(source: ProvideActionDAO) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.admin);
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserProvideActionDAO(): DictionaryValue<ProvideActionDAO> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideActionDAO(src)).endCell());
        },
        parse: (src) => {
            return loadProvideActionDAO(src.loadRef().beginParse());
        }
    }
}

export type ProvideVoting = {
    $$type: 'ProvideVoting';
    optionAddress: Address;
}

export function storeProvideVoting(src: ProvideVoting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(943290294, 32);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadProvideVoting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 943290294) { throw Error('Invalid prefix'); }
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'ProvideVoting' as const, optionAddress: _optionAddress };
}

export function loadTupleProvideVoting(source: TupleReader) {
    const _optionAddress = source.readAddress();
    return { $$type: 'ProvideVoting' as const, optionAddress: _optionAddress };
}

export function loadGetterTupleProvideVoting(source: TupleReader) {
    const _optionAddress = source.readAddress();
    return { $$type: 'ProvideVoting' as const, optionAddress: _optionAddress };
}

export function storeTupleProvideVoting(source: ProvideVoting) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserProvideVoting(): DictionaryValue<ProvideVoting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideVoting(src)).endCell());
        },
        parse: (src) => {
            return loadProvideVoting(src.loadRef().beginParse());
        }
    }
}

export type PassportControl = {
    $$type: 'PassportControl';
    queryId: bigint;
    citizen: Address;
    status: bigint;
}

export function storePassportControl(src: PassportControl) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3735928559, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.citizen);
        b_0.storeUint(src.status, 4);
    };
}

export function loadPassportControl(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3735928559) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _citizen = sc_0.loadAddress();
    const _status = sc_0.loadUintBig(4);
    return { $$type: 'PassportControl' as const, queryId: _queryId, citizen: _citizen, status: _status };
}

export function loadTuplePassportControl(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _citizen = source.readAddress();
    const _status = source.readBigNumber();
    return { $$type: 'PassportControl' as const, queryId: _queryId, citizen: _citizen, status: _status };
}

export function loadGetterTuplePassportControl(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _citizen = source.readAddress();
    const _status = source.readBigNumber();
    return { $$type: 'PassportControl' as const, queryId: _queryId, citizen: _citizen, status: _status };
}

export function storeTuplePassportControl(source: PassportControl) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.citizen);
    builder.writeNumber(source.status);
    return builder.build();
}

export function dictValueParserPassportControl(): DictionaryValue<PassportControl> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePassportControl(src)).endCell());
        },
        parse: (src) => {
            return loadPassportControl(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}

export function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

export function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    minter: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function loadTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function loadGetterTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, minter: _minter, code: _code };
}

export function storeTupleJettonWalletData(source: JettonWalletData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.minter);
    builder.writeCell(source.code);
    return builder.build();
}

export function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type MaybeAddress = {
    $$type: 'MaybeAddress';
    address: Address | null;
}

export function storeMaybeAddress(src: MaybeAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
    };
}

export function loadMaybeAddress(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadMaybeAddress();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function loadTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function loadGetterTupleMaybeAddress(source: TupleReader) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress' as const, address: _address };
}

export function storeTupleMaybeAddress(source: MaybeAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

export function dictValueParserMaybeAddress(): DictionaryValue<MaybeAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaybeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadMaybeAddress(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function storeTupleJettonTransfer(source: JettonTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    queryId: bigint;
    amount: bigint;
    responseDestination: Address | null;
    customPayload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function loadTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function loadGetterTupleJettonBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}

export function storeTupleJettonBurn(source: JettonBurn) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    return builder.build();
}

export function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonNotification = {
    $$type: 'JettonNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonNotification(src: JettonNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

export function storeTupleJettonNotification(source: JettonNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    queryId: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function loadTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function loadGetterTupleJettonExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, queryId: _queryId };
}

export function storeTupleJettonExcesses(source: JettonExcesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferInternal = {
    $$type: 'JettonTransferInternal';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransferInternal(src: JettonTransferInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleJettonTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

export function storeTupleJettonTransferInternal(source: JettonTransferInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserJettonTransferInternal(): DictionaryValue<JettonTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadJettonBurnNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function loadTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function loadGetterTupleJettonBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    return { $$type: 'JettonBurnNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}

export function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

export function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    queryId: bigint;
    ownerAddress: Address;
    includeAddress: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeBit(src.includeAddress);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _ownerAddress = sc_0.loadAddress();
    const _includeAddress = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function loadTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}

export function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.ownerAddress);
    builder.writeBoolean(source.includeAddress);
    return builder.build();
}

export function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Cell | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.walletAddress);
        if (src.ownerAddress !== null && src.ownerAddress !== undefined) { b_0.storeBit(true).storeRef(src.ownerAddress); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _walletAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function loadTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

export function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.walletAddress);
    builder.writeCell(source.ownerAddress);
    return builder.build();
}

export function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TopUp = {
    $$type: 'TopUp';
    queryId: bigint;
}

export function storeTopUp(src: TopUp) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3547469196, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTopUp(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3547469196) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TopUp' as const, queryId: _queryId };
}

export function loadTupleTopUp(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'TopUp' as const, queryId: _queryId };
}

export function loadGetterTupleTopUp(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'TopUp' as const, queryId: _queryId };
}

export function storeTupleTopUp(source: TopUp) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserTopUp(): DictionaryValue<TopUp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTopUp(src)).endCell());
        },
        parse: (src) => {
            return loadTopUp(src.loadRef().beginParse());
        }
    }
}

export type SetStatus = {
    $$type: 'SetStatus';
    queryId: bigint;
    status: bigint;
}

export function storeSetStatus(src: SetStatus) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4006754003, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.status, 4);
    };
}

export function loadSetStatus(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4006754003) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _status = sc_0.loadUintBig(4);
    return { $$type: 'SetStatus' as const, queryId: _queryId, status: _status };
}

export function loadTupleSetStatus(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _status = source.readBigNumber();
    return { $$type: 'SetStatus' as const, queryId: _queryId, status: _status };
}

export function loadGetterTupleSetStatus(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _status = source.readBigNumber();
    return { $$type: 'SetStatus' as const, queryId: _queryId, status: _status };
}

export function storeTupleSetStatus(source: SetStatus) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.status);
    return builder.build();
}

export function dictValueParserSetStatus(): DictionaryValue<SetStatus> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetStatus(src)).endCell());
        },
        parse: (src) => {
            return loadSetStatus(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    queryId: bigint;
    toAddress: Address;
    masterMsg: JettonTransferInternal;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1680571655, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.toAddress);
        const b_1 = new Builder();
        b_1.store(storeJettonTransferInternal(src.masterMsg));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1680571655) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _toAddress = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _masterMsg = loadJettonTransferInternal(sc_1);
    return { $$type: 'Mint' as const, queryId: _queryId, toAddress: _toAddress, masterMsg: _masterMsg };
}

export function loadTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _toAddress = source.readAddress();
    const _masterMsg = loadTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, toAddress: _toAddress, masterMsg: _masterMsg };
}

export function loadGetterTupleMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _toAddress = source.readAddress();
    const _masterMsg = loadGetterTupleJettonTransferInternal(source);
    return { $$type: 'Mint' as const, queryId: _queryId, toAddress: _toAddress, masterMsg: _masterMsg };
}

export function storeTupleMint(source: Mint) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.toAddress);
    builder.writeTuple(storeTupleJettonTransferInternal(source.masterMsg));
    return builder.build();
}

export function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type ChangeAdmin = {
    $$type: 'ChangeAdmin';
    queryId: bigint;
    newAdminAddress: Address;
}

export function storeChangeAdmin(src: ChangeAdmin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1694626644, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newAdminAddress);
    };
}

export function loadChangeAdmin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1694626644) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newAdminAddress = sc_0.loadAddress();
    return { $$type: 'ChangeAdmin' as const, queryId: _queryId, newAdminAddress: _newAdminAddress };
}

export function loadTupleChangeAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newAdminAddress = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, queryId: _queryId, newAdminAddress: _newAdminAddress };
}

export function loadGetterTupleChangeAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newAdminAddress = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, queryId: _queryId, newAdminAddress: _newAdminAddress };
}

export function storeTupleChangeAdmin(source: ChangeAdmin) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newAdminAddress);
    return builder.build();
}

export function dictValueParserChangeAdmin(): DictionaryValue<ChangeAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadChangeAdmin(src.loadRef().beginParse());
        }
    }
}

export type ClaimAdmin = {
    $$type: 'ClaimAdmin';
    queryId: bigint;
}

export function storeClaimAdmin(src: ClaimAdmin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4220051737, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadClaimAdmin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4220051737) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'ClaimAdmin' as const, queryId: _queryId };
}

export function loadTupleClaimAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimAdmin' as const, queryId: _queryId };
}

export function loadGetterTupleClaimAdmin(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimAdmin' as const, queryId: _queryId };
}

export function storeTupleClaimAdmin(source: ClaimAdmin) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserClaimAdmin(): DictionaryValue<ClaimAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadClaimAdmin(src.loadRef().beginParse());
        }
    }
}

export type CallTo = {
    $$type: 'CallTo';
    queryId: bigint;
    toAddress: Address;
    tonAmount: bigint;
    masterMsg: Cell;
}

export function storeCallTo(src: CallTo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(593276754, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.toAddress);
        b_0.storeCoins(src.tonAmount);
        b_0.storeRef(src.masterMsg);
    };
}

export function loadCallTo(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 593276754) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _toAddress = sc_0.loadAddress();
    const _tonAmount = sc_0.loadCoins();
    const _masterMsg = sc_0.loadRef();
    return { $$type: 'CallTo' as const, queryId: _queryId, toAddress: _toAddress, tonAmount: _tonAmount, masterMsg: _masterMsg };
}

export function loadTupleCallTo(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _toAddress = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _masterMsg = source.readCell();
    return { $$type: 'CallTo' as const, queryId: _queryId, toAddress: _toAddress, tonAmount: _tonAmount, masterMsg: _masterMsg };
}

export function loadGetterTupleCallTo(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _toAddress = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _masterMsg = source.readCell();
    return { $$type: 'CallTo' as const, queryId: _queryId, toAddress: _toAddress, tonAmount: _tonAmount, masterMsg: _masterMsg };
}

export function storeTupleCallTo(source: CallTo) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.toAddress);
    builder.writeNumber(source.tonAmount);
    builder.writeCell(source.masterMsg);
    return builder.build();
}

export function dictValueParserCallTo(): DictionaryValue<CallTo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCallTo(src)).endCell());
        },
        parse: (src) => {
            return loadCallTo(src.loadRef().beginParse());
        }
    }
}

export type Upgrade = {
    $$type: 'Upgrade';
    queryId: bigint;
    newData: Cell;
    newCode: Cell;
}

export function storeUpgrade(src: Upgrade) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(621336170, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.newData);
        b_0.storeRef(src.newCode);
    };
}

export function loadUpgrade(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 621336170) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newData = sc_0.loadRef();
    const _newCode = sc_0.loadRef();
    return { $$type: 'Upgrade' as const, queryId: _queryId, newData: _newData, newCode: _newCode };
}

export function loadTupleUpgrade(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newData = source.readCell();
    const _newCode = source.readCell();
    return { $$type: 'Upgrade' as const, queryId: _queryId, newData: _newData, newCode: _newCode };
}

export function loadGetterTupleUpgrade(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newData = source.readCell();
    const _newCode = source.readCell();
    return { $$type: 'Upgrade' as const, queryId: _queryId, newData: _newData, newCode: _newCode };
}

export function storeTupleUpgrade(source: Upgrade) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.newData);
    builder.writeCell(source.newCode);
    return builder.build();
}

export function dictValueParserUpgrade(): DictionaryValue<Upgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadUpgrade(src.loadRef().beginParse());
        }
    }
}

export type ChangeMetadataUri = {
    $$type: 'ChangeMetadataUri';
    queryId: bigint;
    metadata: Slice;
}

export function storeChangeMetadataUri(src: ChangeMetadataUri) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3414567170, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeBuilder(src.metadata.asBuilder());
    };
}

export function loadChangeMetadataUri(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3414567170) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _metadata = sc_0;
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function loadTupleChangeMetadataUri(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell().asSlice();
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function loadGetterTupleChangeMetadataUri(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _metadata = source.readCell().asSlice();
    return { $$type: 'ChangeMetadataUri' as const, queryId: _queryId, metadata: _metadata };
}

export function storeTupleChangeMetadataUri(source: ChangeMetadataUri) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeSlice(source.metadata.asCell());
    return builder.build();
}

export function dictValueParserChangeMetadataUri(): DictionaryValue<ChangeMetadataUri> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeMetadataUri(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMetadataUri(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletBalance = {
    $$type: 'ProvideWalletBalance';
    receiver: Address;
    includeVerifyInfo: boolean;
}

export function storeProvideWalletBalance(src: ProvideWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2059982169, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeBit(src.includeVerifyInfo);
    };
}

export function loadProvideWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2059982169) { throw Error('Invalid prefix'); }
    const _receiver = sc_0.loadAddress();
    const _includeVerifyInfo = sc_0.loadBit();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function loadTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function loadGetterTupleProvideWalletBalance(source: TupleReader) {
    const _receiver = source.readAddress();
    const _includeVerifyInfo = source.readBoolean();
    return { $$type: 'ProvideWalletBalance' as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo };
}

export function storeTupleProvideWalletBalance(source: ProvideWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeBoolean(source.includeVerifyInfo);
    return builder.build();
}

export function dictValueParserProvideWalletBalance(): DictionaryValue<ProvideWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type VerifyInfo = {
    $$type: 'VerifyInfo';
    owner: Address;
    minter: Address;
    code: Cell;
}

export function storeVerifyInfo(src: VerifyInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.minter);
        b_0.storeRef(src.code);
    };
}

export function loadVerifyInfo(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _minter = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function loadTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function loadGetterTupleVerifyInfo(source: TupleReader) {
    const _owner = source.readAddress();
    const _minter = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code };
}

export function storeTupleVerifyInfo(source: VerifyInfo) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.minter);
    builder.writeCell(source.code);
    return builder.build();
}

export function dictValueParserVerifyInfo(): DictionaryValue<VerifyInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVerifyInfo(src)).endCell());
        },
        parse: (src) => {
            return loadVerifyInfo(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletBalance = {
    $$type: 'TakeWalletBalance';
    balance: bigint;
    verifyInfo: VerifyInfo | null;
}

export function storeTakeWalletBalance(src: TakeWalletBalance) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3396861378, 32);
        b_0.storeCoins(src.balance);
        if (src.verifyInfo !== null && src.verifyInfo !== undefined) { b_0.storeBit(true); b_0.store(storeVerifyInfo(src.verifyInfo)); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletBalance(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3396861378) { throw Error('Invalid prefix'); }
    const _balance = sc_0.loadCoins();
    const _verifyInfo = sc_0.loadBit() ? loadVerifyInfo(sc_0) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function loadTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function loadGetterTupleTakeWalletBalance(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _verifyInfo_p = source.readTupleOpt();
    const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null;
    return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo };
}

export function storeTupleTakeWalletBalance(source: TakeWalletBalance) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    if (source.verifyInfo !== null && source.verifyInfo !== undefined) {
        builder.writeTuple(storeTupleVerifyInfo(source.verifyInfo));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

export function dictValueParserTakeWalletBalance(): DictionaryValue<TakeWalletBalance> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletBalance(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletBalance(src.loadRef().beginParse());
        }
    }
}

export type TokenInfo = {
    $$type: 'TokenInfo';
    jetton_master: Address;
    jetton_fee: bigint;
    amount: bigint;
    admin: Address;
}

export function storeTokenInfo(src: TokenInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.jetton_master);
        b_0.storeCoins(src.jetton_fee);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.admin);
    };
}

export function loadTokenInfo(slice: Slice) {
    const sc_0 = slice;
    const _jetton_master = sc_0.loadAddress();
    const _jetton_fee = sc_0.loadCoins();
    const _amount = sc_0.loadCoins();
    const _admin = sc_0.loadAddress();
    return { $$type: 'TokenInfo' as const, jetton_master: _jetton_master, jetton_fee: _jetton_fee, amount: _amount, admin: _admin };
}

export function loadTupleTokenInfo(source: TupleReader) {
    const _jetton_master = source.readAddress();
    const _jetton_fee = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'TokenInfo' as const, jetton_master: _jetton_master, jetton_fee: _jetton_fee, amount: _amount, admin: _admin };
}

export function loadGetterTupleTokenInfo(source: TupleReader) {
    const _jetton_master = source.readAddress();
    const _jetton_fee = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _admin = source.readAddress();
    return { $$type: 'TokenInfo' as const, jetton_master: _jetton_master, jetton_fee: _jetton_fee, amount: _amount, admin: _admin };
}

export function storeTupleTokenInfo(source: TokenInfo) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.jetton_master);
    builder.writeNumber(source.jetton_fee);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.admin);
    return builder.build();
}

export function dictValueParserTokenInfo(): DictionaryValue<TokenInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTokenInfo(src.loadRef().beginParse());
        }
    }
}

export type DaoToken = {
    $$type: 'DaoToken';
    jetton_wallet: Address;
    dao_fee: bigint;
}

export function storeDaoToken(src: DaoToken) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeCoins(src.dao_fee);
    };
}

export function loadDaoToken(slice: Slice) {
    const sc_0 = slice;
    const _jetton_wallet = sc_0.loadAddress();
    const _dao_fee = sc_0.loadCoins();
    return { $$type: 'DaoToken' as const, jetton_wallet: _jetton_wallet, dao_fee: _dao_fee };
}

export function loadTupleDaoToken(source: TupleReader) {
    const _jetton_wallet = source.readAddress();
    const _dao_fee = source.readBigNumber();
    return { $$type: 'DaoToken' as const, jetton_wallet: _jetton_wallet, dao_fee: _dao_fee };
}

export function loadGetterTupleDaoToken(source: TupleReader) {
    const _jetton_wallet = source.readAddress();
    const _dao_fee = source.readBigNumber();
    return { $$type: 'DaoToken' as const, jetton_wallet: _jetton_wallet, dao_fee: _dao_fee };
}

export function storeTupleDaoToken(source: DaoToken) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.jetton_wallet);
    builder.writeNumber(source.dao_fee);
    return builder.build();
}

export function dictValueParserDaoToken(): DictionaryValue<DaoToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDaoToken(src)).endCell());
        },
        parse: (src) => {
            return loadDaoToken(src.loadRef().beginParse());
        }
    }
}

export type OptionInfo = {
    $$type: 'OptionInfo';
    title: string;
    description: string;
}

export function storeOptionInfo(src: OptionInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadOptionInfo(slice: Slice) {
    const sc_0 = slice;
    const _title = sc_0.loadStringRefTail();
    const _description = sc_0.loadStringRefTail();
    return { $$type: 'OptionInfo' as const, title: _title, description: _description };
}

export function loadTupleOptionInfo(source: TupleReader) {
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'OptionInfo' as const, title: _title, description: _description };
}

export function loadGetterTupleOptionInfo(source: TupleReader) {
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'OptionInfo' as const, title: _title, description: _description };
}

export function storeTupleOptionInfo(source: OptionInfo) {
    const builder = new TupleBuilder();
    builder.writeString(source.title);
    builder.writeString(source.description);
    return builder.build();
}

export function dictValueParserOptionInfo(): DictionaryValue<OptionInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptionInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOptionInfo(src.loadRef().beginParse());
        }
    }
}

export type OptionInfoRoot = {
    $$type: 'OptionInfoRoot';
    address: Address;
    title: string;
    description: string;
}

export function storeOptionInfoRoot(src: OptionInfoRoot) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadOptionInfoRoot(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadAddress();
    const _title = sc_0.loadStringRefTail();
    const _description = sc_0.loadStringRefTail();
    return { $$type: 'OptionInfoRoot' as const, address: _address, title: _title, description: _description };
}

export function loadTupleOptionInfoRoot(source: TupleReader) {
    const _address = source.readAddress();
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'OptionInfoRoot' as const, address: _address, title: _title, description: _description };
}

export function loadGetterTupleOptionInfoRoot(source: TupleReader) {
    const _address = source.readAddress();
    const _title = source.readString();
    const _description = source.readString();
    return { $$type: 'OptionInfoRoot' as const, address: _address, title: _title, description: _description };
}

export function storeTupleOptionInfoRoot(source: OptionInfoRoot) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeString(source.title);
    builder.writeString(source.description);
    return builder.build();
}

export function dictValueParserOptionInfoRoot(): DictionaryValue<OptionInfoRoot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptionInfoRoot(src)).endCell());
        },
        parse: (src) => {
            return loadOptionInfoRoot(src.loadRef().beginParse());
        }
    }
}

export type VoteSettings = {
    $$type: 'VoteSettings';
    endTime: bigint;
    min_amount: bigint;
    fee: bigint;
}

export function storeVoteSettings(src: VoteSettings) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.endTime, 64);
        b_0.storeCoins(src.min_amount);
        b_0.storeCoins(src.fee);
    };
}

export function loadVoteSettings(slice: Slice) {
    const sc_0 = slice;
    const _endTime = sc_0.loadUintBig(64);
    const _min_amount = sc_0.loadCoins();
    const _fee = sc_0.loadCoins();
    return { $$type: 'VoteSettings' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function loadTupleVoteSettings(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _min_amount = source.readBigNumber();
    const _fee = source.readBigNumber();
    return { $$type: 'VoteSettings' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function loadGetterTupleVoteSettings(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _min_amount = source.readBigNumber();
    const _fee = source.readBigNumber();
    return { $$type: 'VoteSettings' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function storeTupleVoteSettings(source: VoteSettings) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.endTime);
    builder.writeNumber(source.min_amount);
    builder.writeNumber(source.fee);
    return builder.build();
}

export function dictValueParserVoteSettings(): DictionaryValue<VoteSettings> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoteSettings(src)).endCell());
        },
        parse: (src) => {
            return loadVoteSettings(src.loadRef().beginParse());
        }
    }
}

export type StartNewVotingStruct = {
    $$type: 'StartNewVotingStruct';
    metadata: Cell;
    settings: VoteSettings;
}

export function storeStartNewVotingStruct(src: StartNewVotingStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.metadata);
        b_0.store(storeVoteSettings(src.settings));
    };
}

export function loadStartNewVotingStruct(slice: Slice) {
    const sc_0 = slice;
    const _metadata = sc_0.loadRef();
    const _settings = loadVoteSettings(sc_0);
    return { $$type: 'StartNewVotingStruct' as const, metadata: _metadata, settings: _settings };
}

export function loadTupleStartNewVotingStruct(source: TupleReader) {
    const _metadata = source.readCell();
    const _settings = loadTupleVoteSettings(source);
    return { $$type: 'StartNewVotingStruct' as const, metadata: _metadata, settings: _settings };
}

export function loadGetterTupleStartNewVotingStruct(source: TupleReader) {
    const _metadata = source.readCell();
    const _settings = loadGetterTupleVoteSettings(source);
    return { $$type: 'StartNewVotingStruct' as const, metadata: _metadata, settings: _settings };
}

export function storeTupleStartNewVotingStruct(source: StartNewVotingStruct) {
    const builder = new TupleBuilder();
    builder.writeCell(source.metadata);
    builder.writeTuple(storeTupleVoteSettings(source.settings));
    return builder.build();
}

export function dictValueParserStartNewVotingStruct(): DictionaryValue<StartNewVotingStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartNewVotingStruct(src)).endCell());
        },
        parse: (src) => {
            return loadStartNewVotingStruct(src.loadRef().beginParse());
        }
    }
}

export type StartNewVotingTestStruct = {
    $$type: 'StartNewVotingTestStruct';
    endTime: bigint;
    min_amount: bigint;
    fee: bigint;
}

export function storeStartNewVotingTestStruct(src: StartNewVotingTestStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.endTime, 64);
        b_0.storeCoins(src.min_amount);
        b_0.storeCoins(src.fee);
    };
}

export function loadStartNewVotingTestStruct(slice: Slice) {
    const sc_0 = slice;
    const _endTime = sc_0.loadUintBig(64);
    const _min_amount = sc_0.loadCoins();
    const _fee = sc_0.loadCoins();
    return { $$type: 'StartNewVotingTestStruct' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function loadTupleStartNewVotingTestStruct(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _min_amount = source.readBigNumber();
    const _fee = source.readBigNumber();
    return { $$type: 'StartNewVotingTestStruct' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function loadGetterTupleStartNewVotingTestStruct(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _min_amount = source.readBigNumber();
    const _fee = source.readBigNumber();
    return { $$type: 'StartNewVotingTestStruct' as const, endTime: _endTime, min_amount: _min_amount, fee: _fee };
}

export function storeTupleStartNewVotingTestStruct(source: StartNewVotingTestStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.endTime);
    builder.writeNumber(source.min_amount);
    builder.writeNumber(source.fee);
    return builder.build();
}

export function dictValueParserStartNewVotingTestStruct(): DictionaryValue<StartNewVotingTestStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartNewVotingTestStruct(src)).endCell());
        },
        parse: (src) => {
            return loadStartNewVotingTestStruct(src.loadRef().beginParse());
        }
    }
}

export type TakeDAOVoteStruct = {
    $$type: 'TakeDAOVoteStruct';
    adminAddress: Address;
    optionAddress: Address;
}

export function storeTakeDAOVoteStruct(src: TakeDAOVoteStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.adminAddress);
        b_0.storeAddress(src.optionAddress);
    };
}

export function loadTakeDAOVoteStruct(slice: Slice) {
    const sc_0 = slice;
    const _adminAddress = sc_0.loadAddress();
    const _optionAddress = sc_0.loadAddress();
    return { $$type: 'TakeDAOVoteStruct' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadTupleTakeDAOVoteStruct(source: TupleReader) {
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'TakeDAOVoteStruct' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function loadGetterTupleTakeDAOVoteStruct(source: TupleReader) {
    const _adminAddress = source.readAddress();
    const _optionAddress = source.readAddress();
    return { $$type: 'TakeDAOVoteStruct' as const, adminAddress: _adminAddress, optionAddress: _optionAddress };
}

export function storeTupleTakeDAOVoteStruct(source: TakeDAOVoteStruct) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.adminAddress);
    builder.writeAddress(source.optionAddress);
    return builder.build();
}

export function dictValueParserTakeDAOVoteStruct(): DictionaryValue<TakeDAOVoteStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDAOVoteStruct(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDAOVoteStruct(src.loadRef().beginParse());
        }
    }
}

export type SliceBitsAndRefs = {
    $$type: 'SliceBitsAndRefs';
    bits: bigint;
    refs: bigint;
}

export function storeSliceBitsAndRefs(src: SliceBitsAndRefs) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadSliceBitsAndRefs(slice: Slice) {
    const sc_0 = slice;
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function loadTupleSliceBitsAndRefs(source: TupleReader) {
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function loadGetterTupleSliceBitsAndRefs(source: TupleReader) {
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs };
}

export function storeTupleSliceBitsAndRefs(source: SliceBitsAndRefs) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserSliceBitsAndRefs(): DictionaryValue<SliceBitsAndRefs> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSliceBitsAndRefs(src)).endCell());
        },
        parse: (src) => {
            return loadSliceBitsAndRefs(src.loadRef().beginParse());
        }
    }
}

export type ContractDAOv1$Data = {
    $$type: 'ContractDAOv1$Data';
    owner: Address;
    admin: Address;
    wallet: Address;
    master: Address;
    status: bigint;
    metadata: Cell;
    settings: VoteSettings;
    options: Dictionary<Address, OptionInfoRoot>;
}

export function storeContractDAOv1$Data(src: ContractDAOv1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.wallet);
        const b_1 = new Builder();
        b_1.storeAddress(src.master);
        b_1.storeUint(src.status, 4);
        b_1.storeRef(src.metadata);
        b_1.store(storeVoteSettings(src.settings));
        b_1.storeDict(src.options, Dictionary.Keys.Address(), dictValueParserOptionInfoRoot());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContractDAOv1$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    const _wallet = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _master = sc_1.loadAddress();
    const _status = sc_1.loadUintBig(4);
    const _metadata = sc_1.loadRef();
    const _settings = loadVoteSettings(sc_1);
    const _options = Dictionary.load(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), sc_1);
    return { $$type: 'ContractDAOv1$Data' as const, owner: _owner, admin: _admin, wallet: _wallet, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function loadTupleContractDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _wallet = source.readAddress();
    const _master = source.readAddress();
    const _status = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadTupleVoteSettings(source);
    const _options = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), source.readCellOpt());
    return { $$type: 'ContractDAOv1$Data' as const, owner: _owner, admin: _admin, wallet: _wallet, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function loadGetterTupleContractDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _wallet = source.readAddress();
    const _master = source.readAddress();
    const _status = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadGetterTupleVoteSettings(source);
    const _options = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), source.readCellOpt());
    return { $$type: 'ContractDAOv1$Data' as const, owner: _owner, admin: _admin, wallet: _wallet, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function storeTupleContractDAOv1$Data(source: ContractDAOv1$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeAddress(source.wallet);
    builder.writeAddress(source.master);
    builder.writeNumber(source.status);
    builder.writeCell(source.metadata);
    builder.writeTuple(storeTupleVoteSettings(source.settings));
    builder.writeCell(source.options.size > 0 ? beginCell().storeDictDirect(source.options, Dictionary.Keys.Address(), dictValueParserOptionInfoRoot()).endCell() : null);
    return builder.build();
}

export function dictValueParserContractDAOv1$Data(): DictionaryValue<ContractDAOv1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractDAOv1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractDAOv1$Data(src.loadRef().beginParse());
        }
    }
}

export type ContractDAOv2$Data = {
    $$type: 'ContractDAOv2$Data';
    owner: Address;
    admin: Address;
    master: Address;
    status: bigint;
    metadata: Cell;
    settings: VoteSettings;
    options: Dictionary<Address, OptionInfoRoot>;
}

export function storeContractDAOv2$Data(src: ContractDAOv2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.master);
        b_0.storeUint(src.status, 4);
        b_0.storeRef(src.metadata);
        const b_1 = new Builder();
        b_1.store(storeVoteSettings(src.settings));
        b_1.storeDict(src.options, Dictionary.Keys.Address(), dictValueParserOptionInfoRoot());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContractDAOv2$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    const _master = sc_0.loadAddress();
    const _status = sc_0.loadUintBig(4);
    const _metadata = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _settings = loadVoteSettings(sc_1);
    const _options = Dictionary.load(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), sc_1);
    return { $$type: 'ContractDAOv2$Data' as const, owner: _owner, admin: _admin, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function loadTupleContractDAOv2$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _master = source.readAddress();
    const _status = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadTupleVoteSettings(source);
    const _options = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), source.readCellOpt());
    return { $$type: 'ContractDAOv2$Data' as const, owner: _owner, admin: _admin, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function loadGetterTupleContractDAOv2$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _master = source.readAddress();
    const _status = source.readBigNumber();
    const _metadata = source.readCell();
    const _settings = loadGetterTupleVoteSettings(source);
    const _options = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOptionInfoRoot(), source.readCellOpt());
    return { $$type: 'ContractDAOv2$Data' as const, owner: _owner, admin: _admin, master: _master, status: _status, metadata: _metadata, settings: _settings, options: _options };
}

export function storeTupleContractDAOv2$Data(source: ContractDAOv2$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeAddress(source.master);
    builder.writeNumber(source.status);
    builder.writeCell(source.metadata);
    builder.writeTuple(storeTupleVoteSettings(source.settings));
    builder.writeCell(source.options.size > 0 ? beginCell().storeDictDirect(source.options, Dictionary.Keys.Address(), dictValueParserOptionInfoRoot()).endCell() : null);
    return builder.build();
}

export function dictValueParserContractDAOv2$Data(): DictionaryValue<ContractDAOv2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractDAOv2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractDAOv2$Data(src.loadRef().beginParse());
        }
    }
}

export type NFTCollection$Data = {
    $$type: 'NFTCollection$Data';
    owner: Address;
    admin: Address;
    nextItemIndex: bigint;
    content: Cell;
    defaultContent: Cell;
    royaltyParams: RoyaltyParams;
    commonCode: Cell;
    commonData: Builder;
}

export function storeNFTCollection$Data(src: NFTCollection$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeUint(src.nextItemIndex, 64);
        b_0.storeRef(src.content);
        b_0.storeRef(src.defaultContent);
        b_0.store(storeRoyaltyParams(src.royaltyParams));
        const b_1 = new Builder();
        b_1.storeRef(src.commonCode);
        b_1.storeRef(src.commonData.asCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNFTCollection$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    const _nextItemIndex = sc_0.loadUintBig(64);
    const _content = sc_0.loadRef();
    const _defaultContent = sc_0.loadRef();
    const _royaltyParams = loadRoyaltyParams(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _commonCode = sc_1.loadRef();
    const _commonData = sc_1.loadRef().asBuilder();
    return { $$type: 'NFTCollection$Data' as const, owner: _owner, admin: _admin, nextItemIndex: _nextItemIndex, content: _content, defaultContent: _defaultContent, royaltyParams: _royaltyParams, commonCode: _commonCode, commonData: _commonData };
}

export function loadTupleNFTCollection$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _nextItemIndex = source.readBigNumber();
    const _content = source.readCell();
    const _defaultContent = source.readCell();
    const _royaltyParams = loadTupleRoyaltyParams(source);
    const _commonCode = source.readCell();
    const _commonData = source.readCell().asBuilder();
    return { $$type: 'NFTCollection$Data' as const, owner: _owner, admin: _admin, nextItemIndex: _nextItemIndex, content: _content, defaultContent: _defaultContent, royaltyParams: _royaltyParams, commonCode: _commonCode, commonData: _commonData };
}

export function loadGetterTupleNFTCollection$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _nextItemIndex = source.readBigNumber();
    const _content = source.readCell();
    const _defaultContent = source.readCell();
    const _royaltyParams = loadGetterTupleRoyaltyParams(source);
    const _commonCode = source.readCell();
    const _commonData = source.readCell().asBuilder();
    return { $$type: 'NFTCollection$Data' as const, owner: _owner, admin: _admin, nextItemIndex: _nextItemIndex, content: _content, defaultContent: _defaultContent, royaltyParams: _royaltyParams, commonCode: _commonCode, commonData: _commonData };
}

export function storeTupleNFTCollection$Data(source: NFTCollection$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.content);
    builder.writeCell(source.defaultContent);
    builder.writeTuple(storeTupleRoyaltyParams(source.royaltyParams));
    builder.writeCell(source.commonCode);
    builder.writeBuilder(source.commonData.asCell());
    return builder.build();
}

export function dictValueParserNFTCollection$Data(): DictionaryValue<NFTCollection$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTCollection$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNFTCollection$Data(src.loadRef().beginParse());
        }
    }
}

export type DictGet = {
    $$type: 'DictGet';
    itemIndex: bigint | null;
    item: Slice | null;
    flag: bigint;
}

export function storeDictGet(src: DictGet) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.itemIndex !== null && src.itemIndex !== undefined) { b_0.storeBit(true).storeUint(src.itemIndex, 64); } else { b_0.storeBit(false); }
        if (src.item !== null && src.item !== undefined) { b_0.storeBit(true).storeRef(src.item.asCell()); } else { b_0.storeBit(false); }
        b_0.storeInt(src.flag, 257);
    };
}

export function loadDictGet(slice: Slice) {
    const sc_0 = slice;
    const _itemIndex = sc_0.loadBit() ? sc_0.loadUintBig(64) : null;
    const _item = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    const _flag = sc_0.loadIntBig(257);
    return { $$type: 'DictGet' as const, itemIndex: _itemIndex, item: _item, flag: _flag };
}

export function loadTupleDictGet(source: TupleReader) {
    const _itemIndex = source.readBigNumberOpt();
    const _item = source.readCellOpt()?.asSlice() ?? null;
    const _flag = source.readBigNumber();
    return { $$type: 'DictGet' as const, itemIndex: _itemIndex, item: _item, flag: _flag };
}

export function loadGetterTupleDictGet(source: TupleReader) {
    const _itemIndex = source.readBigNumberOpt();
    const _item = source.readCellOpt()?.asSlice() ?? null;
    const _flag = source.readBigNumber();
    return { $$type: 'DictGet' as const, itemIndex: _itemIndex, item: _item, flag: _flag };
}

export function storeTupleDictGet(source: DictGet) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.itemIndex);
    builder.writeSlice(source.item?.asCell());
    builder.writeNumber(source.flag);
    return builder.build();
}

export function dictValueParserDictGet(): DictionaryValue<DictGet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDictGet(src)).endCell());
        },
        parse: (src) => {
            return loadDictGet(src.loadRef().beginParse());
        }
    }
}

export type DictItem = {
    $$type: 'DictItem';
    amount: bigint;
    initNFTBody: Cell;
}

export function storeDictItem(src: DictItem) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.initNFTBody);
    };
}

export function loadDictItem(slice: Slice) {
    const sc_0 = slice;
    const _amount = sc_0.loadCoins();
    const _initNFTBody = sc_0.loadRef();
    return { $$type: 'DictItem' as const, amount: _amount, initNFTBody: _initNFTBody };
}

export function loadTupleDictItem(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _initNFTBody = source.readCell();
    return { $$type: 'DictItem' as const, amount: _amount, initNFTBody: _initNFTBody };
}

export function loadGetterTupleDictItem(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _initNFTBody = source.readCell();
    return { $$type: 'DictItem' as const, amount: _amount, initNFTBody: _initNFTBody };
}

export function storeTupleDictItem(source: DictItem) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeCell(source.initNFTBody);
    return builder.build();
}

export function dictValueParserDictItem(): DictionaryValue<DictItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDictItem(src)).endCell());
        },
        parse: (src) => {
            return loadDictItem(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    queryId: bigint;
    newOwner: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'Transfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function loadTupleTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function storeTupleTransfer(source: Transfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    queryId: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

export function loadTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

export function loadGetterTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

export function storeTupleGetStaticData(source: GetStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type NFTData = {
    $$type: 'NFTData';
    init: bigint;
    itemIndex: bigint;
    collectionAddress: Address;
    owner: Address | null;
    content: Cell | null;
}

export function storeNFTData(src: NFTData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.init, 257);
        b_0.storeUint(src.itemIndex, 64);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadNFTData(slice: Slice) {
    const sc_0 = slice;
    const _init = sc_0.loadIntBig(257);
    const _itemIndex = sc_0.loadUintBig(64);
    const _collectionAddress = sc_0.loadAddress();
    const _owner = sc_0.loadMaybeAddress();
    const _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'NFTData' as const, init: _init, itemIndex: _itemIndex, collectionAddress: _collectionAddress, owner: _owner, content: _content };
}

export function loadTupleNFTData(source: TupleReader) {
    const _init = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _owner = source.readAddressOpt();
    const _content = source.readCellOpt();
    return { $$type: 'NFTData' as const, init: _init, itemIndex: _itemIndex, collectionAddress: _collectionAddress, owner: _owner, content: _content };
}

export function loadGetterTupleNFTData(source: TupleReader) {
    const _init = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _owner = source.readAddressOpt();
    const _content = source.readCellOpt();
    return { $$type: 'NFTData' as const, init: _init, itemIndex: _itemIndex, collectionAddress: _collectionAddress, owner: _owner, content: _content };
}

export function storeTupleNFTData(source: NFTData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.init);
    builder.writeNumber(source.itemIndex);
    builder.writeAddress(source.collectionAddress);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

export function dictValueParserNFTData(): DictionaryValue<NFTData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTData(src)).endCell());
        },
        parse: (src) => {
            return loadNFTData(src.loadRef().beginParse());
        }
    }
}

export type InitNFTData = {
    $$type: 'InitNFTData';
    collectionAddress: Address;
    itemIndex: bigint;
}

export function storeInitNFTData(src: InitNFTData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.collectionAddress);
        b_0.storeUint(src.itemIndex, 64);
    };
}

export function loadInitNFTData(slice: Slice) {
    const sc_0 = slice;
    const _collectionAddress = sc_0.loadAddress();
    const _itemIndex = sc_0.loadUintBig(64);
    return { $$type: 'InitNFTData' as const, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function loadTupleInitNFTData(source: TupleReader) {
    const _collectionAddress = source.readAddress();
    const _itemIndex = source.readBigNumber();
    return { $$type: 'InitNFTData' as const, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function loadGetterTupleInitNFTData(source: TupleReader) {
    const _collectionAddress = source.readAddress();
    const _itemIndex = source.readBigNumber();
    return { $$type: 'InitNFTData' as const, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function storeTupleInitNFTData(source: InitNFTData) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.collectionAddress);
    builder.writeNumber(source.itemIndex);
    return builder.build();
}

export function dictValueParserInitNFTData(): DictionaryValue<InitNFTData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitNFTData(src)).endCell());
        },
        parse: (src) => {
            return loadInitNFTData(src.loadRef().beginParse());
        }
    }
}

export type InitNFTBody = {
    $$type: 'InitNFTBody';
    owner: Address;
    content: Cell;
}

export function storeInitNFTBody(src: InitNFTBody) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadInitNFTBody(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    return { $$type: 'InitNFTBody' as const, owner: _owner, content: _content };
}

export function loadTupleInitNFTBody(source: TupleReader) {
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'InitNFTBody' as const, owner: _owner, content: _content };
}

export function loadGetterTupleInitNFTBody(source: TupleReader) {
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'InitNFTBody' as const, owner: _owner, content: _content };
}

export function storeTupleInitNFTBody(source: InitNFTBody) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

export function dictValueParserInitNFTBody(): DictionaryValue<InitNFTBody> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitNFTBody(src)).endCell());
        },
        parse: (src) => {
            return loadInitNFTBody(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    nextItemIndex: bigint;
    collectionContent: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.nextItemIndex, 64);
        b_0.storeRef(src.collectionContent);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _nextItemIndex = sc_0.loadUintBig(64);
    const _collectionContent = sc_0.loadRef();
    const _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, owner: _owner };
}

export function loadTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, owner: _owner };
}

export function loadGetterTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, owner: _owner };
}

export function storeTupleCollectionData(source: CollectionData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeAddress(source.owner);
    return builder.build();
}

export function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    nominator: bigint;
    dominator: bigint;
    owner: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.nominator, 16);
        b_0.storeUint(src.dominator, 16);
        b_0.storeAddress(src.owner);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    const _nominator = sc_0.loadUintBig(16);
    const _dominator = sc_0.loadUintBig(16);
    const _owner = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, nominator: _nominator, dominator: _dominator, owner: _owner };
}

export function loadTupleRoyaltyParams(source: TupleReader) {
    const _nominator = source.readBigNumber();
    const _dominator = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, nominator: _nominator, dominator: _dominator, owner: _owner };
}

export function loadGetterTupleRoyaltyParams(source: TupleReader) {
    const _nominator = source.readBigNumber();
    const _dominator = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, nominator: _nominator, dominator: _dominator, owner: _owner };
}

export function storeTupleRoyaltyParams(source: RoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nominator);
    builder.writeNumber(source.dominator);
    builder.writeAddress(source.owner);
    return builder.build();
}

export function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    queryId: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

export function loadTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

export function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

export function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type DeployNFT = {
    $$type: 'DeployNFT';
    queryId: bigint;
    itemIndex: bigint;
    amount: bigint;
    initNFTBody: Cell;
}

export function storeDeployNFT(src: DeployNFT) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.itemIndex, 64);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.initNFTBody);
    };
}

export function loadDeployNFT(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _itemIndex = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _initNFTBody = sc_0.loadRef();
    return { $$type: 'DeployNFT' as const, queryId: _queryId, itemIndex: _itemIndex, amount: _amount, initNFTBody: _initNFTBody };
}

export function loadTupleDeployNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _initNFTBody = source.readCell();
    return { $$type: 'DeployNFT' as const, queryId: _queryId, itemIndex: _itemIndex, amount: _amount, initNFTBody: _initNFTBody };
}

export function loadGetterTupleDeployNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _initNFTBody = source.readCell();
    return { $$type: 'DeployNFT' as const, queryId: _queryId, itemIndex: _itemIndex, amount: _amount, initNFTBody: _initNFTBody };
}

export function storeTupleDeployNFT(source: DeployNFT) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.itemIndex);
    builder.writeNumber(source.amount);
    builder.writeCell(source.initNFTBody);
    return builder.build();
}

export function dictValueParserDeployNFT(): DictionaryValue<DeployNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployNFT(src)).endCell());
        },
        parse: (src) => {
            return loadDeployNFT(src.loadRef().beginParse());
        }
    }
}

export type EditContent = {
    $$type: 'EditContent';
    queryId: bigint;
    content: Cell;
}

export function storeEditContent(src: EditContent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(436968785, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.content);
    };
}

export function loadEditContent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 436968785) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _content = sc_0.loadRef();
    return { $$type: 'EditContent' as const, queryId: _queryId, content: _content };
}

export function loadTupleEditContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'EditContent' as const, queryId: _queryId, content: _content };
}

export function loadGetterTupleEditContent(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'EditContent' as const, queryId: _queryId, content: _content };
}

export function storeTupleEditContent(source: EditContent) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.content);
    return builder.build();
}

export function dictValueParserEditContent(): DictionaryValue<EditContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEditContent(src)).endCell());
        },
        parse: (src) => {
            return loadEditContent(src.loadRef().beginParse());
        }
    }
}

export type BatchDeploy = {
    $$type: 'BatchDeploy';
    queryId: bigint;
    deployList: Cell;
}

export function storeBatchDeploy(src: BatchDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.deployList);
    };
}

export function loadBatchDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _deployList = sc_0.loadRef();
    return { $$type: 'BatchDeploy' as const, queryId: _queryId, deployList: _deployList };
}

export function loadTupleBatchDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _deployList = source.readCell();
    return { $$type: 'BatchDeploy' as const, queryId: _queryId, deployList: _deployList };
}

export function loadGetterTupleBatchDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _deployList = source.readCell();
    return { $$type: 'BatchDeploy' as const, queryId: _queryId, deployList: _deployList };
}

export function storeTupleBatchDeploy(source: BatchDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.deployList);
    return builder.build();
}

export function dictValueParserBatchDeploy(): DictionaryValue<BatchDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBatchDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadBatchDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    queryId: bigint;
    params: RoyaltyParams;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.store(storeRoyaltyParams(src.params));
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _params = loadRoyaltyParams(sc_0);
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, params: _params };
}

export function loadTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _params = loadTupleRoyaltyParams(source);
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, params: _params };
}

export function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _params = loadGetterTupleRoyaltyParams(source);
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, params: _params };
}

export function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeTuple(storeTupleRoyaltyParams(source.params));
    return builder.build();
}

export function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ContractCitizenDAOv1$Data = {
    $$type: 'ContractCitizenDAOv1$Data';
    owner: Address;
    admin: Address | null;
    status: bigint;
}

export function storeContractCitizenDAOv1$Data(src: ContractCitizenDAOv1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeUint(src.status, 4);
    };
}

export function loadContractCitizenDAOv1$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadMaybeAddress();
    const _status = sc_0.loadUintBig(4);
    return { $$type: 'ContractCitizenDAOv1$Data' as const, owner: _owner, admin: _admin, status: _status };
}

export function loadTupleContractCitizenDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddressOpt();
    const _status = source.readBigNumber();
    return { $$type: 'ContractCitizenDAOv1$Data' as const, owner: _owner, admin: _admin, status: _status };
}

export function loadGetterTupleContractCitizenDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddressOpt();
    const _status = source.readBigNumber();
    return { $$type: 'ContractCitizenDAOv1$Data' as const, owner: _owner, admin: _admin, status: _status };
}

export function storeTupleContractCitizenDAOv1$Data(source: ContractCitizenDAOv1$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeNumber(source.status);
    return builder.build();
}

export function dictValueParserContractCitizenDAOv1$Data(): DictionaryValue<ContractCitizenDAOv1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractCitizenDAOv1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractCitizenDAOv1$Data(src.loadRef().beginParse());
        }
    }
}

export type JettonMinterState = {
    $$type: 'JettonMinterState';
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    jettonContent: Cell;
    jettonWalletCode: Cell;
}

export function storeJettonMinterState(src: JettonMinterState) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.adminAddress);
        b_0.storeRef(src.jettonContent);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonMinterState(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _mintable = sc_0.loadBit();
    const _adminAddress = sc_0.loadAddress();
    const _jettonContent = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function loadTupleJettonMinterState(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _adminAddress = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function loadGetterTupleJettonMinterState(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _adminAddress = source.readAddress();
    const _jettonContent = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonMinterState' as const, totalSupply: _totalSupply, mintable: _mintable, adminAddress: _adminAddress, jettonContent: _jettonContent, jettonWalletCode: _jettonWalletCode };
}

export function storeTupleJettonMinterState(source: JettonMinterState) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.adminAddress);
    builder.writeCell(source.jettonContent);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

export function dictValueParserJettonMinterState(): DictionaryValue<JettonMinterState> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMinterState(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMinterState(src.loadRef().beginParse());
        }
    }
}

export type GovernanceJettonMinter$Data = {
    $$type: 'GovernanceJettonMinter$Data';
    totalSupply: bigint;
    adminAddress: Address;
    nextAdminAddress: Address | null;
    jettonContent: Cell;
}

export function storeGovernanceJettonMinter$Data(src: GovernanceJettonMinter$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeAddress(src.adminAddress);
        b_0.storeAddress(src.nextAdminAddress);
        b_0.storeRef(src.jettonContent);
    };
}

export function loadGovernanceJettonMinter$Data(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _adminAddress = sc_0.loadAddress();
    const _nextAdminAddress = sc_0.loadMaybeAddress();
    const _jettonContent = sc_0.loadRef();
    return { $$type: 'GovernanceJettonMinter$Data' as const, totalSupply: _totalSupply, adminAddress: _adminAddress, nextAdminAddress: _nextAdminAddress, jettonContent: _jettonContent };
}

export function loadTupleGovernanceJettonMinter$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _nextAdminAddress = source.readAddressOpt();
    const _jettonContent = source.readCell();
    return { $$type: 'GovernanceJettonMinter$Data' as const, totalSupply: _totalSupply, adminAddress: _adminAddress, nextAdminAddress: _nextAdminAddress, jettonContent: _jettonContent };
}

export function loadGetterTupleGovernanceJettonMinter$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _adminAddress = source.readAddress();
    const _nextAdminAddress = source.readAddressOpt();
    const _jettonContent = source.readCell();
    return { $$type: 'GovernanceJettonMinter$Data' as const, totalSupply: _totalSupply, adminAddress: _adminAddress, nextAdminAddress: _nextAdminAddress, jettonContent: _jettonContent };
}

export function storeTupleGovernanceJettonMinter$Data(source: GovernanceJettonMinter$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeAddress(source.adminAddress);
    builder.writeAddress(source.nextAdminAddress);
    builder.writeCell(source.jettonContent);
    return builder.build();
}

export function dictValueParserGovernanceJettonMinter$Data(): DictionaryValue<GovernanceJettonMinter$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGovernanceJettonMinter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadGovernanceJettonMinter$Data(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletGovernance$Data = {
    $$type: 'JettonWalletGovernance$Data';
    status: bigint;
    balance: bigint;
    owner: Address;
    master: Address;
}

export function storeJettonWalletGovernance$Data(src: JettonWalletGovernance$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.status, 4);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadJettonWalletGovernance$Data(slice: Slice) {
    const sc_0 = slice;
    const _status = sc_0.loadUintBig(4);
    const _balance = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _master = sc_0.loadAddress();
    return { $$type: 'JettonWalletGovernance$Data' as const, status: _status, balance: _balance, owner: _owner, master: _master };
}

export function loadTupleJettonWalletGovernance$Data(source: TupleReader) {
    const _status = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    return { $$type: 'JettonWalletGovernance$Data' as const, status: _status, balance: _balance, owner: _owner, master: _master };
}

export function loadGetterTupleJettonWalletGovernance$Data(source: TupleReader) {
    const _status = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    return { $$type: 'JettonWalletGovernance$Data' as const, status: _status, balance: _balance, owner: _owner, master: _master };
}

export function storeTupleJettonWalletGovernance$Data(source: JettonWalletGovernance$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.status);
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    return builder.build();
}

export function dictValueParserJettonWalletGovernance$Data(): DictionaryValue<JettonWalletGovernance$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletGovernance$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletGovernance$Data(src.loadRef().beginParse());
        }
    }
}

export type ContractVaultDAOv1$Data = {
    $$type: 'ContractVaultDAOv1$Data';
    owner: Address;
    status: bigint;
    data: OptionInfo;
}

export function storeContractVaultDAOv1$Data(src: ContractVaultDAOv1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.status, 4);
        b_0.store(storeOptionInfo(src.data));
    };
}

export function loadContractVaultDAOv1$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _status = sc_0.loadUintBig(4);
    const _data = loadOptionInfo(sc_0);
    return { $$type: 'ContractVaultDAOv1$Data' as const, owner: _owner, status: _status, data: _data };
}

export function loadTupleContractVaultDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _status = source.readBigNumber();
    const _data = loadTupleOptionInfo(source);
    return { $$type: 'ContractVaultDAOv1$Data' as const, owner: _owner, status: _status, data: _data };
}

export function loadGetterTupleContractVaultDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _status = source.readBigNumber();
    const _data = loadGetterTupleOptionInfo(source);
    return { $$type: 'ContractVaultDAOv1$Data' as const, owner: _owner, status: _status, data: _data };
}

export function storeTupleContractVaultDAOv1$Data(source: ContractVaultDAOv1$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.status);
    builder.writeTuple(storeTupleOptionInfo(source.data));
    return builder.build();
}

export function dictValueParserContractVaultDAOv1$Data(): DictionaryValue<ContractVaultDAOv1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractVaultDAOv1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractVaultDAOv1$Data(src.loadRef().beginParse());
        }
    }
}

export type ContractJettonDAOv1$Data = {
    $$type: 'ContractJettonDAOv1$Data';
    owner: Address;
    admin: Address;
    option: Address;
    wallet: Address;
    amount: bigint;
}

export function storeContractJettonDAOv1$Data(src: ContractJettonDAOv1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.option);
        const b_1 = new Builder();
        b_1.storeAddress(src.wallet);
        b_1.storeCoins(src.amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContractJettonDAOv1$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    const _option = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _wallet = sc_1.loadAddress();
    const _amount = sc_1.loadCoins();
    return { $$type: 'ContractJettonDAOv1$Data' as const, owner: _owner, admin: _admin, option: _option, wallet: _wallet, amount: _amount };
}

export function loadTupleContractJettonDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _option = source.readAddress();
    const _wallet = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ContractJettonDAOv1$Data' as const, owner: _owner, admin: _admin, option: _option, wallet: _wallet, amount: _amount };
}

export function loadGetterTupleContractJettonDAOv1$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _option = source.readAddress();
    const _wallet = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ContractJettonDAOv1$Data' as const, owner: _owner, admin: _admin, option: _option, wallet: _wallet, amount: _amount };
}

export function storeTupleContractJettonDAOv1$Data(source: ContractJettonDAOv1$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeAddress(source.option);
    builder.writeAddress(source.wallet);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserContractJettonDAOv1$Data(): DictionaryValue<ContractJettonDAOv1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractJettonDAOv1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractJettonDAOv1$Data(src.loadRef().beginParse());
        }
    }
}

export type ContractVirtualDAOv2$Data = {
    $$type: 'ContractVirtualDAOv2$Data';
    owner: Address;
    admin: Address;
    option: Address | null;
    status: bigint;
}

export function storeContractVirtualDAOv2$Data(src: ContractVirtualDAOv2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.option);
        b_0.storeUint(src.status, 4);
    };
}

export function loadContractVirtualDAOv2$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _admin = sc_0.loadAddress();
    const _option = sc_0.loadMaybeAddress();
    const _status = sc_0.loadUintBig(4);
    return { $$type: 'ContractVirtualDAOv2$Data' as const, owner: _owner, admin: _admin, option: _option, status: _status };
}

export function loadTupleContractVirtualDAOv2$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _option = source.readAddressOpt();
    const _status = source.readBigNumber();
    return { $$type: 'ContractVirtualDAOv2$Data' as const, owner: _owner, admin: _admin, option: _option, status: _status };
}

export function loadGetterTupleContractVirtualDAOv2$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _admin = source.readAddress();
    const _option = source.readAddressOpt();
    const _status = source.readBigNumber();
    return { $$type: 'ContractVirtualDAOv2$Data' as const, owner: _owner, admin: _admin, option: _option, status: _status };
}

export function storeTupleContractVirtualDAOv2$Data(source: ContractVirtualDAOv2$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.admin);
    builder.writeAddress(source.option);
    builder.writeNumber(source.status);
    return builder.build();
}

export function dictValueParserContractVirtualDAOv2$Data(): DictionaryValue<ContractVirtualDAOv2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractVirtualDAOv2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadContractVirtualDAOv2$Data(src.loadRef().beginParse());
        }
    }
}

export type NFTItemInit = {
    $$type: 'NFTItemInit';
    owner: Address;
    content: Cell;
}

export function storeNFTItemInit(src: NFTItemInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNFTItemInit(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    return { $$type: 'NFTItemInit' as const, owner: _owner, content: _content };
}

export function loadTupleNFTItemInit(source: TupleReader) {
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'NFTItemInit' as const, owner: _owner, content: _content };
}

export function loadGetterTupleNFTItemInit(source: TupleReader) {
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'NFTItemInit' as const, owner: _owner, content: _content };
}

export function storeTupleNFTItemInit(source: NFTItemInit) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

export function dictValueParserNFTItemInit(): DictionaryValue<NFTItemInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTItemInit(src)).endCell());
        },
        parse: (src) => {
            return loadNFTItemInit(src.loadRef().beginParse());
        }
    }
}

export type NFTItem$Data = {
    $$type: 'NFTItem$Data';
    owner: Address | null;
    content: Cell | null;
    editor: Address;
    collectionAddress: Address;
    itemIndex: bigint;
}

export function storeNFTItem$Data(src: NFTItem$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.editor);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeUint(src.itemIndex, 64);
    };
}

export function loadNFTItem$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadMaybeAddress();
    const _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _editor = sc_0.loadAddress();
    const _collectionAddress = sc_0.loadAddress();
    const _itemIndex = sc_0.loadUintBig(64);
    return { $$type: 'NFTItem$Data' as const, owner: _owner, content: _content, editor: _editor, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function loadTupleNFTItem$Data(source: TupleReader) {
    const _owner = source.readAddressOpt();
    const _content = source.readCellOpt();
    const _editor = source.readAddress();
    const _collectionAddress = source.readAddress();
    const _itemIndex = source.readBigNumber();
    return { $$type: 'NFTItem$Data' as const, owner: _owner, content: _content, editor: _editor, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function loadGetterTupleNFTItem$Data(source: TupleReader) {
    const _owner = source.readAddressOpt();
    const _content = source.readCellOpt();
    const _editor = source.readAddress();
    const _collectionAddress = source.readAddress();
    const _itemIndex = source.readBigNumber();
    return { $$type: 'NFTItem$Data' as const, owner: _owner, content: _content, editor: _editor, collectionAddress: _collectionAddress, itemIndex: _itemIndex };
}

export function storeTupleNFTItem$Data(source: NFTItem$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeAddress(source.editor);
    builder.writeAddress(source.collectionAddress);
    builder.writeNumber(source.itemIndex);
    return builder.build();
}

export function dictValueParserNFTItem$Data(): DictionaryValue<NFTItem$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTItem$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNFTItem$Data(src.loadRef().beginParse());
        }
    }
}

export type MasterDAO$Data = {
    $$type: 'MasterDAO$Data';
    owner: Address;
    fees: bigint;
    admins: Dictionary<Address, boolean>;
    collection: Address;
    token: DaoToken | null;
}

export function storeMasterDAO$Data(src: MasterDAO$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.fees);
        b_0.storeDict(src.admins, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeAddress(src.collection);
        const b_1 = new Builder();
        if (src.token !== null && src.token !== undefined) { b_1.storeBit(true); b_1.store(storeDaoToken(src.token)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMasterDAO$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _fees = sc_0.loadCoins();
    const _admins = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    const _collection = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _token = sc_1.loadBit() ? loadDaoToken(sc_1) : null;
    return { $$type: 'MasterDAO$Data' as const, owner: _owner, fees: _fees, admins: _admins, collection: _collection, token: _token };
}

export function loadTupleMasterDAO$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _fees = source.readBigNumber();
    const _admins = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _collection = source.readAddress();
    const _token_p = source.readTupleOpt();
    const _token = _token_p ? loadTupleDaoToken(_token_p) : null;
    return { $$type: 'MasterDAO$Data' as const, owner: _owner, fees: _fees, admins: _admins, collection: _collection, token: _token };
}

export function loadGetterTupleMasterDAO$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _fees = source.readBigNumber();
    const _admins = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _collection = source.readAddress();
    const _token_p = source.readTupleOpt();
    const _token = _token_p ? loadTupleDaoToken(_token_p) : null;
    return { $$type: 'MasterDAO$Data' as const, owner: _owner, fees: _fees, admins: _admins, collection: _collection, token: _token };
}

export function storeTupleMasterDAO$Data(source: MasterDAO$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.fees);
    builder.writeCell(source.admins.size > 0 ? beginCell().storeDictDirect(source.admins, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeAddress(source.collection);
    if (source.token !== null && source.token !== undefined) {
        builder.writeTuple(storeTupleDaoToken(source.token));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

export function dictValueParserMasterDAO$Data(): DictionaryValue<MasterDAO$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMasterDAO$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMasterDAO$Data(src.loadRef().beginParse());
        }
    }
}

 type ContractJettonDAOv1_init_args = {
    $$type: 'ContractJettonDAOv1_init_args';
    owner: Address;
    admin: Address;
    option: Address;
    wallet: Address;
    amount: bigint;
}

function initContractJettonDAOv1_init_args(src: ContractJettonDAOv1_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.admin);
        b_0.storeAddress(src.option);
        const b_1 = new Builder();
        b_1.storeAddress(src.wallet);
        b_1.storeCoins(src.amount);
        b_0.storeRef(b_1.endCell());
    };
}

async function ContractJettonDAOv1_init(owner: Address, admin: Address, option: Address, wallet: Address, amount: bigint) {
    const __code = Cell.fromHex('b5ee9c72410207010001d1000228ff008e88f4a413f4bcf2c80bed5320e303ed43d901030141a666e13b51343e903e903e903500743e903e800c040944090408db0576cf1b14600200022201de30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0fa40fa40fa40d401d0fa40fa00301025102410236c1506925f06e024d749c21f9410455f05e30df90182f03337c1b0540f3051cd19233eb8253c982812c2475a2d7d38076e5a62503410fcbadcf2c08204019804d31f2182107362d09cba8e32313403d33f31fa00fa40308200f0f65114c705f2f4f8425055a0443012c855405045ce12cece01c8ce58fa02cdc9ed54db31e0018210ebf2f4cebae3026c510501fa30f8416f2430318200a78432821007270e00bcf2f48200f0f6f84223c705f2f45cc8598210e94e61b25003cb1fcecec9821007270e00802a6d821005f5e100c87101cb0015ccc9d0271035104a51384313c8556082100f8a7ea55008cb1f16cb3f5004fa0212ce01206e9430cf84809201cee2f40001fa02cec954446606009e706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb005a70c855405045ce12cece01c8ce58fa02cdc9ed54db310f3aeb65');
    const builder = beginCell();
    initContractJettonDAOv1_init_args({ $$type: 'ContractJettonDAOv1_init_args', owner, admin, option, wallet, amount })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const ContractJettonDAOv1_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    2366: { message: "Incorrect balance after send" },
    9215: { message: "Incorrect sender" },
    10363: { message: "Unauthorized burn" },
    12119: { message: "insufficient amount" },
    14101: { message: "already exists" },
    14534: { message: "Not owner" },
    16693: { message: "vote time is not over" },
    21196: { message: "Contract is locked" },
    30277: { message: "Incoming transfers are locked" },
    32113: { message: "Insufficient amount of TON attached" },
    32290: { message: "vote time is over" },
    35251: { message: "time expired" },
    42884: { message: "gas error" },
    45676: { message: "wrong operation" },
    46257: { message: "Wrong workchain" },
    46467: { message: "not enough" },
    52585: { message: "bad request" },
    54285: { message: "unknown wallet" },
    61686: { message: "access denied" },
    63951: { message: "Not next admin" },
    63977: { message: "unknown contract" },
} as const

export const ContractJettonDAOv1_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Incorrect balance after send": 2366,
    "Incorrect sender": 9215,
    "Unauthorized burn": 10363,
    "insufficient amount": 12119,
    "already exists": 14101,
    "Not owner": 14534,
    "vote time is not over": 16693,
    "Contract is locked": 21196,
    "Incoming transfers are locked": 30277,
    "Insufficient amount of TON attached": 32113,
    "vote time is over": 32290,
    "time expired": 35251,
    "gas error": 42884,
    "wrong operation": 45676,
    "Wrong workchain": 46257,
    "not enough": 46467,
    "bad request": 52585,
    "unknown wallet": 54285,
    "access denied": 61686,
    "Not next admin": 63951,
    "unknown contract": 63977,
} as const

const ContractJettonDAOv1_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DAOvote","header":1475729905,"fields":[{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isJetton","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isNFTSBT","type":{"kind":"simple","type":"bool","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"WhiteList","header":3714265888,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DropCollection","header":2783320816,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeAdminCitizen","header":11,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"citizen","type":{"kind":"simple","type":"address","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerDAO","header":7,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetFunds","header":8,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddAdmin","header":9,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveAdmin","header":10,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StartNewVoting","header":3100530816,"fields":[{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"settings","type":{"kind":"simple","type":"VoteSettings","optional":false}}]},
    {"name":"StartDAOVoting","header":718541994,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"settings","type":{"kind":"simple","type":"VoteSettings","optional":false}}]},
    {"name":"InitVoting","header":1440328515,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ActivateVote","header":690358848,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CallVote","header":435109211,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GiveVote","header":3041426889,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TakeVote","header":3958568142,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TakeDAOVote","header":3914228146,"fields":[{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PassPassport","header":57069,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetToken","header":3233865037,"fields":[{"name":"dao_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddOption","header":3367105963,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"VaultInitialization","header":3683237002,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"VirtualInitialization","header":226213212,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SubmitVoting","header":4022960818,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CancelVoting","header":502754399,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProvideAction","header":385206731,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideActionDAO","header":1847741543,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideVoting","header":943290294,"fields":[{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PassportControl","header":3735928559,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"citizen","type":{"kind":"simple","type":"address","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MaybeAddress","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"JettonTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeAddress","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TopUp","header":3547469196,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetStatus","header":4006754003,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}}]},
    {"name":"Mint","header":1680571655,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"toAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"masterMsg","type":{"kind":"simple","type":"JettonTransferInternal","optional":false}}]},
    {"name":"ChangeAdmin","header":1694626644,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newAdminAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimAdmin","header":4220051737,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CallTo","header":593276754,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"toAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"masterMsg","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Upgrade","header":621336170,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"newCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeMetadataUri","header":3414567170,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ProvideWalletBalance","header":2059982169,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeVerifyInfo","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"VerifyInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeWalletBalance","header":3396861378,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"verifyInfo","type":{"kind":"simple","type":"VerifyInfo","optional":true}}]},
    {"name":"TokenInfo","header":null,"fields":[{"name":"jetton_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DaoToken","header":null,"fields":[{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"dao_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"OptionInfo","header":null,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"OptionInfoRoot","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"VoteSettings","header":null,"fields":[{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"min_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"StartNewVotingStruct","header":null,"fields":[{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"settings","type":{"kind":"simple","type":"VoteSettings","optional":false}}]},
    {"name":"StartNewVotingTestStruct","header":null,"fields":[{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"min_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TakeDAOVoteStruct","header":null,"fields":[{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"optionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SliceBitsAndRefs","header":null,"fields":[{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ContractDAOv1$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"settings","type":{"kind":"simple","type":"VoteSettings","optional":false}},{"name":"options","type":{"kind":"dict","key":"address","value":"OptionInfoRoot","valueFormat":"ref"}}]},
    {"name":"ContractDAOv2$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"settings","type":{"kind":"simple","type":"VoteSettings","optional":false}},{"name":"options","type":{"kind":"dict","key":"address","value":"OptionInfoRoot","valueFormat":"ref"}}]},
    {"name":"NFTCollection$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"defaultContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"royaltyParams","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"commonCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"commonData","type":{"kind":"simple","type":"builder","optional":false}}]},
    {"name":"DictGet","header":null,"fields":[{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":true,"format":64}},{"name":"item","type":{"kind":"simple","type":"slice","optional":true}},{"name":"flag","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DictItem","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initNFTBody","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NFTData","header":null,"fields":[{"name":"init","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"InitNFTData","header":null,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"InitNFTBody","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"nominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"dominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployNFT","header":1,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initNFTBody","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EditContent","header":436968785,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"BatchDeploy","header":2,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deployList","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeOwner","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"params","type":{"kind":"simple","type":"RoyaltyParams","optional":false}}]},
    {"name":"ContractCitizenDAOv1$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":true}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}}]},
    {"name":"JettonMinterState","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"GovernanceJettonMinter$Data","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"nextAdminAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"jettonContent","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletGovernance$Data","header":null,"fields":[{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContractVaultDAOv1$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}},{"name":"data","type":{"kind":"simple","type":"OptionInfo","optional":false}}]},
    {"name":"ContractJettonDAOv1$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"option","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ContractVirtualDAOv2$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"option","type":{"kind":"simple","type":"address","optional":true}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":4}}]},
    {"name":"NFTItemInit","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"NFTItem$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"editor","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"MasterDAO$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"fees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"admins","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"DaoToken","optional":true}}]},
]

const ContractJettonDAOv1_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "DAOvote": 1475729905,
    "WhiteList": 3714265888,
    "DropCollection": 2783320816,
    "ChangeAdminCitizen": 11,
    "ChangeOwnerDAO": 7,
    "GetFunds": 8,
    "AddAdmin": 9,
    "RemoveAdmin": 10,
    "JettonTransferNotification": 1935855772,
    "StartNewVoting": 3100530816,
    "StartDAOVoting": 718541994,
    "InitVoting": 1440328515,
    "ActivateVote": 690358848,
    "CallVote": 435109211,
    "GiveVote": 3041426889,
    "TakeVote": 3958568142,
    "TakeDAOVote": 3914228146,
    "PassPassport": 57069,
    "SetToken": 3233865037,
    "AddOption": 3367105963,
    "VaultInitialization": 3683237002,
    "VirtualInitialization": 226213212,
    "SubmitVoting": 4022960818,
    "CancelVoting": 502754399,
    "ProvideAction": 385206731,
    "ProvideActionDAO": 1847741543,
    "ProvideVoting": 943290294,
    "PassportControl": 3735928559,
    "JettonTransfer": 260734629,
    "JettonBurn": 1499400124,
    "JettonNotification": 1935855772,
    "JettonExcesses": 3576854235,
    "JettonTransferInternal": 395134233,
    "JettonBurnNotification": 2078119902,
    "ProvideWalletAddress": 745978227,
    "TakeWalletAddress": 3513996288,
    "TopUp": 3547469196,
    "SetStatus": 4006754003,
    "Mint": 1680571655,
    "ChangeAdmin": 1694626644,
    "ClaimAdmin": 4220051737,
    "CallTo": 593276754,
    "Upgrade": 621336170,
    "ChangeMetadataUri": 3414567170,
    "ProvideWalletBalance": 2059982169,
    "TakeWalletBalance": 3396861378,
    "Transfer": 1607220500,
    "GetStaticData": 801842850,
    "GetRoyaltyParams": 1765620048,
    "DeployNFT": 1,
    "EditContent": 436968785,
    "BatchDeploy": 2,
    "ChangeOwner": 3,
    "ReportRoyaltyParams": 2831876269,
}

const ContractJettonDAOv1_getters: ABIGetter[] = [
    {"name":"get_option","methodId":105348,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const ContractJettonDAOv1_getterMapping: { [key: string]: string } = {
    'get_option': 'getGetOption',
}

const ContractJettonDAOv1_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"vote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TakeVote"}},
]

export const minVotingCreationFee = 250000000n;
export const minVotingActivationFee = 25000000n;
export const Workchain = 0n;
export const OwnershipAssigned = 85167505n;
export const Excesses = 3576854235n;
export const ReportStaticData = 2339837749n;
export const IncorrectDeployer = 405n;
export const IncorrectIndex = 402n;
export const IncorrectAmount = 399n;
export const IncorrectIndexes = 403n;
export const IncorrectForwardPayload = 708n;
export const IncorrectSender = 401n;
export const InvalidDestinationWorkchain = 333n;
export const InvalidData = 65535n;
export const NotInit = 9n;
export const InvalidFees = 402n;
export const minTonsForNFTStorage = 50000000n;
export const IndexSizeBits = 64n;
export const MyWorkchain = false;
export const minTonsForStorage = 10000000n;
export const gasForTransfer = 10200n;
export const gasForBurn = 7500n;
export const walletStateInitCells = 30n;
export const walletStateInitBits = 20000n;

export class ContractJettonDAOv1 implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = ContractJettonDAOv1_errors_backward;
    public static readonly opcodes = ContractJettonDAOv1_opcodes;
    
    static async init(owner: Address, admin: Address, option: Address, wallet: Address, amount: bigint) {
        return await ContractJettonDAOv1_init(owner, admin, option, wallet, amount);
    }
    
    static async fromInit(owner: Address, admin: Address, option: Address, wallet: Address, amount: bigint) {
        const __gen_init = await ContractJettonDAOv1_init(owner, admin, option, wallet, amount);
        const address = contractAddress(0, __gen_init);
        return new ContractJettonDAOv1(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new ContractJettonDAOv1(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ContractJettonDAOv1_types,
        getters: ContractJettonDAOv1_getters,
        receivers: ContractJettonDAOv1_receivers,
        errors: ContractJettonDAOv1_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: "vote" | JettonTransferNotification | TakeVote) {
        
        let body: Cell | null = null;
        if (message === "vote") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeVote') {
            body = beginCell().store(storeTakeVote(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetOption(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_option', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}