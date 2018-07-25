import { transform } from 'babel-core';

const Markets = {
    BONDS: 2,
    COMMODITIES: 24,
    CURRENCIES: 45,
    ETF: 28,
    FUTURES: 14,
    FUTURES_ARCHIVE: 17,
    FUTURES_USA: 7,
    INDEXES: 6,
    SHARES: 1,
    SPB: 517,
    USA: 25
};

const Timeframe = {
    TICKS: 1,
    MINUTES1: 2,
    MINUTES5: 3,
    MINUTES10: 4,
    MINUTES15: 5,
    MINUTES30: 6,
    HOURLY: 7,
    DAILY: 8,
    WEEKLY: 9,
    MONTHLY: 10
};

const LookupComparator = {
    EQUALS: 1,
    STARTSWITH: 2,
    CONTAINS: 3
};

//#region  Export Errors

class FinamExportError extends Error {
    constructor(message) {
        super(message);
    }
}

class FinamDownloadError extends FinamExportError {
    constructor(message) {
        super(message);
    }
}

class FinamThrottlingError extends FinamExportError {
    constructor(message) {
        super(message);
    }
}

class FinamParsingError extends FinamExportError {
    constructor(message) {
        super(message);
    }
}

class FinamObjectNotFoundError extends FinamExportError {
    constructor(message) {
        super(message);
    }
}

class FinamTooLongTimeframeError extends FinamExportError {
    constructor(message) {
        super(message);
    }
}

//#endregion

class ExporterMeta {
    FINAM_DICT_URL = 'https://www.finam.ru/cache/icharts/icharts.js';
    FINAM_CATEGORIES = -1;

}

export {
    Markets,
    Timeframe,
    LookupComparator,
    FinamExportError,
    FinamDownloadError,
    FinamThrottlingError,
    FinamParsingError,
    FinamObjectNotFoundError,
    FinamTooLongTimeframeError
};
