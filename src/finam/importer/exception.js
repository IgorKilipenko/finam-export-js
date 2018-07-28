//#region  Export Errors

class FinamImportError extends Error {
    constructor(message) {
        super(message);
    }
}

class FinamDownloadError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}

class FinamThrottlingError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}

class FinamParsingError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}

class FinamObjectNotFoundError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}

class FinamTooLongTimeframeError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}

//#endregion

export {
    FinamImportError,
    FinamDownloadError,
    FinamThrottlingError,
    FinamParsingError,
    FinamObjectNotFoundError,
    FinamTooLongTimeframeError,
}