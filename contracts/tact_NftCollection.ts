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
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue,
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        },
    };
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        },
    };
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
        $$type: 'SendParameters' as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return {
        $$type: 'SendParameters' as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        },
    };
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        },
    };
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        },
    };
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) {
        throw Error('Invalid prefix');
    }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        },
    };
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
};

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        },
    };
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
};

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return {
        $$type: 'ReportRoyaltyParams' as const,
        query_id: _query_id,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return {
        $$type: 'ReportRoyaltyParams' as const,
        query_id: _query_id,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        },
    };
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
};

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: 'Transfer' as const,
        query_id: _query_id,
        new_owner: _new_owner,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_amount: _forward_amount,
        forward_payload: _forward_payload,
    };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: 'Transfer' as const,
        query_id: _query_id,
        new_owner: _new_owner,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_amount: _forward_amount,
        forward_payload: _forward_payload,
    };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        },
    };
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
};

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: 'OwnershipAssigned' as const,
        query_id: _query_id,
        prev_owner: _prev_owner,
        forward_payload: _forward_payload,
    };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return {
        $$type: 'OwnershipAssigned' as const,
        query_id: _query_id,
        prev_owner: _prev_owner,
        forward_payload: _forward_payload,
    };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        },
    };
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
};

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        },
    };
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
};

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        },
    };
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
};

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        },
    };
}

export type Mint = {
    $$type: 'Mint';
    query_id: bigint;
};

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(793212987, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 793212987) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Mint' as const, query_id: _query_id };
}

function loadTupleMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Mint' as const, query_id: _query_id };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        },
    };
}

export type BatchMint = {
    $$type: 'BatchMint';
    query_id: bigint;
    size: bigint;
    items: Dictionary<bigint, Cell>;
};

export function storeBatchMint(src: BatchMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2432039616, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.size, 8);
        b_0.storeDict(src.items, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
    };
}

export function loadBatchMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2432039616) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _size = sc_0.loadUintBig(8);
    let _items = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    return { $$type: 'BatchMint' as const, query_id: _query_id, size: _size, items: _items };
}

function loadTupleBatchMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _size = source.readBigNumber();
    let _items = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'BatchMint' as const, query_id: _query_id, size: _size, items: _items };
}

function storeTupleBatchMint(source: BatchMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.size);
    builder.writeCell(
        source.items.size > 0
            ? beginCell().storeDictDirect(source.items, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell()
            : null
    );
    return builder.build();
}

function dictValueParserBatchMint(): DictionaryValue<BatchMint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBatchMint(src)).endCell());
        },
        parse: (src) => {
            return loadBatchMint(src.loadRef().beginParse());
        },
    };
}

export type SetCollectionMetaData = {
    $$type: 'SetCollectionMetaData';
    query_id: bigint;
    new_collection_content: Cell;
};

export function storeSetCollectionMetaData(src: SetCollectionMetaData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3836233402, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.new_collection_content);
    };
}

export function loadSetCollectionMetaData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3836233402) {
        throw Error('Invalid prefix');
    }
    let _query_id = sc_0.loadUintBig(64);
    let _new_collection_content = sc_0.loadRef();
    return {
        $$type: 'SetCollectionMetaData' as const,
        query_id: _query_id,
        new_collection_content: _new_collection_content,
    };
}

function loadTupleSetCollectionMetaData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_collection_content = source.readCell();
    return {
        $$type: 'SetCollectionMetaData' as const,
        query_id: _query_id,
        new_collection_content: _new_collection_content,
    };
}

function storeTupleSetCollectionMetaData(source: SetCollectionMetaData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.new_collection_content);
    return builder.build();
}

function dictValueParserSetCollectionMetaData(): DictionaryValue<SetCollectionMetaData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetCollectionMetaData(src)).endCell());
        },
        parse: (src) => {
            return loadSetCollectionMetaData(src.loadRef().beginParse());
        },
    };
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return {
        $$type: 'CollectionData' as const,
        next_item_index: _next_item_index,
        collection_content: _collection_content,
        owner_address: _owner_address,
    };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return {
        $$type: 'CollectionData' as const,
        next_item_index: _next_item_index,
        collection_content: _collection_content,
        owner_address: _owner_address,
    };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        },
    };
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
};

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return {
        $$type: 'RoyaltyParams' as const,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return {
        $$type: 'RoyaltyParams' as const,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        },
    };
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
};

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return {
        $$type: 'GetNftData' as const,
        is_initialized: _is_initialized,
        index: _index,
        collection_address: _collection_address,
        owner_address: _owner_address,
        individual_content: _individual_content,
    };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return {
        $$type: 'GetNftData' as const,
        is_initialized: _is_initialized,
        index: _index,
        collection_address: _collection_address,
        owner_address: _owner_address,
        individual_content: _individual_content,
    };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        },
    };
}

type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
};

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.collection_content);
        let b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty_params));
        b_0.storeRef(b_1.endCell());
    };
}

async function NftCollection_init(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
    const __code = Cell.fromBase64(
        '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'
    );
    const __system = Cell.fromBase64(
        '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'
    );
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({ $$type: 'NftCollection_init_args', owner, collection_content, royalty_params })(
        builder
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4188: { message: `custum_payload is not exist` },
    49280: { message: `not owner` },
    62742: { message: `non-sequential NFTs` },
};

const NftCollection_types: ABIType[] = [
    {
        name: 'StateInit',
        header: null,
        fields: [
            { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
            { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
        ],
    },
    {
        name: 'Context',
        header: null,
        fields: [
            { name: 'bounced', type: { kind: 'simple', type: 'bool', optional: false } },
            { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
        ],
    },
    {
        name: 'SendParameters',
        header: null,
        fields: [
            { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
            { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
            { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
            { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
        ],
    },
    {
        name: 'Deploy',
        header: 2490013878,
        fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'DeployOk',
        header: 2952335191,
        fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'FactoryDeploy',
        header: 1829761339,
        fields: [
            { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'cashback', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'ChangeOwner',
        header: 2174598809,
        fields: [
            { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'newOwner', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'ChangeOwnerOk',
        header: 846932810,
        fields: [
            { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'newOwner', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'GetRoyaltyParams',
        header: 1765620048,
        fields: [{ name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'ReportRoyaltyParams',
        header: 2831876269,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'numerator', type: { kind: 'simple', type: 'uint', optional: false, format: 16 } },
            { name: 'denominator', type: { kind: 'simple', type: 'uint', optional: false, format: 16 } },
            { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'Transfer',
        header: 1607220500,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'new_owner', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'custom_payload', type: { kind: 'simple', type: 'cell', optional: true } },
            { name: 'forward_amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
            { name: 'forward_payload', type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' } },
        ],
    },
    {
        name: 'OwnershipAssigned',
        header: 85167505,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'prev_owner', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'forward_payload', type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' } },
        ],
    },
    {
        name: 'Excesses',
        header: 3576854235,
        fields: [{ name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'GetStaticData',
        header: 801842850,
        fields: [{ name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'ReportStaticData',
        header: 2339837749,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'index_id', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'collection', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'Mint',
        header: 793212987,
        fields: [{ name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
    },
    {
        name: 'BatchMint',
        header: 2432039616,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'size', type: { kind: 'simple', type: 'uint', optional: false, format: 8 } },
            { name: 'items', type: { kind: 'dict', key: 'int', value: 'cell', valueFormat: 'ref' } },
        ],
    },
    {
        name: 'SetCollectionMetaData',
        header: 3836233402,
        fields: [
            { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
            { name: 'new_collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
        ],
    },
    {
        name: 'CollectionData',
        header: null,
        fields: [
            { name: 'next_item_index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
            { name: 'owner_address', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'RoyaltyParams',
        header: null,
        fields: [
            { name: 'numerator', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'denominator', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
        ],
    },
    {
        name: 'GetNftData',
        header: null,
        fields: [
            { name: 'is_initialized', type: { kind: 'simple', type: 'bool', optional: false } },
            { name: 'index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'collection_address', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'owner_address', type: { kind: 'simple', type: 'address', optional: false } },
            { name: 'individual_content', type: { kind: 'simple', type: 'cell', optional: false } },
        ],
    },
];

const NftCollection_getters: ABIGetter[] = [
    {
        name: 'get_collection_data',
        arguments: [],
        returnType: { kind: 'simple', type: 'CollectionData', optional: false },
    },
    {
        name: 'get_nft_address_by_index',
        arguments: [{ name: 'item_index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } }],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'getNftItemInit',
        arguments: [{ name: 'item_index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } }],
        returnType: { kind: 'simple', type: 'StateInit', optional: false },
    },
    {
        name: 'get_nft_content',
        arguments: [
            { name: 'index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
            { name: 'individual_content', type: { kind: 'simple', type: 'cell', optional: false } },
        ],
        returnType: { kind: 'simple', type: 'cell', optional: true },
    },
    { name: 'royalty_params', arguments: [], returnType: { kind: 'simple', type: 'RoyaltyParams', optional: false } },
    { name: 'owner', arguments: [], returnType: { kind: 'simple', type: 'address', optional: false } },
];

const NftCollection_receivers: ABIReceiver[] = [
    { receiver: 'internal', message: { kind: 'typed', type: 'Mint' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'GetRoyaltyParams' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'ChangeOwner' } },
];

export class NftCollection implements Contract {
    static async init(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        return await NftCollection_init(owner, collection_content, royalty_params);
    }

    static async fromInit(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        const init = await NftCollection_init(owner, collection_content, royalty_params);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }

    static fromAddress(address: Address) {
        return new NftCollection(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: NftCollection_types,
        getters: NftCollection_getters,
        receivers: NftCollection_receivers,
        errors: NftCollection_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: Mint | GetRoyaltyParams | Deploy | ChangeOwner
    ) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'GetRoyaltyParams'
        ) {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }

    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }

    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }

    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCellOpt();
        return result;
    }

    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }

    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
}
