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

class FinamParsingError extends FinamImportError {
    constructor(message) {
        super(message);
    }
}


//#endregion

export {
    FinamImportError,
    FinamDownloadError,
    FinamParsingError,
}