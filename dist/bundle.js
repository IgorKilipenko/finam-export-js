/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/finam/importer/Metadata.js":
/*!****************************************!*\
  !*** ./src/finam/importer/Metadata.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");

var _iconvLite = __webpack_require__(/*! iconv-lite */ "iconv-lite");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _babylon = __webpack_require__(/*! babylon */ "babylon");

var _exception = __webpack_require__(/*! ./exception */ "./src/finam/importer/exception.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _utils.logger.assert;

/**
 * Обеспечивает получение метаданных с сайта финам. [
 * aEmitentIds
 * aEmitentNames
 * aEmitentCodes
 * aEmitentMarkets
 * aEmitentDecp
 * aDataFormatStrs
 * aEmitentChild
 * aEmitentUrls]
 *
 * @class Metadata
 */

var Metadata = function Metadata() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Metadata);
    this.finamUrl = 'https://www.finam.ru/cache/icharts/icharts.js';

    this.parse = function (textCode) {

        if (!textCode || typeof textCode !== 'string' || textCode.length === 0) {
            throw new _exception.FinamImportError('Нет данных');
        }

        var ast = null;

        try {
            ast = (0, _babylon.parse)(textCode);
        } catch (err) {
            ast = null;
            throw new _exception.FinamParsingError(err.message);
        }

        if (!ast || ast.program === undefined) {
            throw new _exception.FinamParsingError('Узел body не найден');
        }

        var body = ast.program.body;

        var variableDeclarations = body.filter(function (node) {
            return node.type === 'VariableDeclaration' && node.kind.match('let|const|var');
        });

        if (!variableDeclarations || variableDeclarations.length === 0) {
            throw new _exception.FinamParsingError('Узел VariableDeclaration не найден');
        }

        var declarations = variableDeclarations.map(function (varDec) {
            return varDec.declarations;
        }).reduce(function (res, curr) {
            res.push.apply(res, (0, _toConsumableArray3.default)(curr.filter(function (item) {
                return item.type === 'VariableDeclarator' && item.init;
            })));
            return res;
        }, []);

        if (!declarations || declarations.length === 0) {
            throw new _exception.FinamParsingError('Узел declarations не найден');
        }

        var vars = []; // Массив распознанных объектов
        declarations.forEach(function (dec) {
            if (dec.init.type === 'ArrayExpression' && dec.init.elements) {
                var value = [];
                vars.push({
                    name: dec.id.name,
                    value: value
                });
                dec.init.elements.forEach(function (item) {
                    if (item.type.match(/Literal$/)) {
                        value.push(item.value);
                    }
                });
            } else if (dec.init.type === 'ObjectExpression' && dec.init.properties) {
                var _value = {};
                vars.push({
                    name: dec.id.name,
                    value: _value
                });
                dec.init.properties.forEach(function (propItem) {
                    if (propItem.type.match(/Property$/)) {
                        _value[propItem.key.name] = propItem.value.value;
                    }
                });
            }
        });

        assert(vars.length > 0);

        return vars;
    };

    this.download = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.fetchContent)(_this.finamUrl, _iconvLite2.default.decodeStream('win1251'));

                    case 2:
                        data = _context.sent;
                        return _context.abrupt('return', data);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));
}

/**
 * Парсит исходный код js находит все обявленные элементы типа: [массив | объект]
 * 
 * @param {string} textCode Исходный код на js
 * @returns {Array<object>} Массив алементов {name, value}
 * @memberof Metadata
 */


/**
 * Скачивает исходный файл метаданныех (.js)
 *
 * @memberof Metadata
 */
;

exports.default = Metadata;

/***/ }),

/***/ "./src/finam/importer/exception.js":
/*!*****************************************!*\
  !*** ./src/finam/importer/exception.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FinamTooLongTimeframeError = exports.FinamObjectNotFoundError = exports.FinamParsingError = exports.FinamThrottlingError = exports.FinamDownloadError = exports.FinamImportError = undefined;

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//#region  Export Errors

var FinamImportError = function (_Error) {
    (0, _inherits3.default)(FinamImportError, _Error);

    function FinamImportError(message) {
        (0, _classCallCheck3.default)(this, FinamImportError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamImportError.__proto__ || (0, _getPrototypeOf2.default)(FinamImportError)).call(this, message));
    }

    return FinamImportError;
}(Error);

var FinamDownloadError = function (_FinamImportError) {
    (0, _inherits3.default)(FinamDownloadError, _FinamImportError);

    function FinamDownloadError(message) {
        (0, _classCallCheck3.default)(this, FinamDownloadError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamDownloadError.__proto__ || (0, _getPrototypeOf2.default)(FinamDownloadError)).call(this, message));
    }

    return FinamDownloadError;
}(FinamImportError);

var FinamThrottlingError = function (_FinamImportError2) {
    (0, _inherits3.default)(FinamThrottlingError, _FinamImportError2);

    function FinamThrottlingError(message) {
        (0, _classCallCheck3.default)(this, FinamThrottlingError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamThrottlingError.__proto__ || (0, _getPrototypeOf2.default)(FinamThrottlingError)).call(this, message));
    }

    return FinamThrottlingError;
}(FinamImportError);

var FinamParsingError = function (_FinamImportError3) {
    (0, _inherits3.default)(FinamParsingError, _FinamImportError3);

    function FinamParsingError(message) {
        (0, _classCallCheck3.default)(this, FinamParsingError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamParsingError.__proto__ || (0, _getPrototypeOf2.default)(FinamParsingError)).call(this, message));
    }

    return FinamParsingError;
}(FinamImportError);

var FinamObjectNotFoundError = function (_FinamImportError4) {
    (0, _inherits3.default)(FinamObjectNotFoundError, _FinamImportError4);

    function FinamObjectNotFoundError(message) {
        (0, _classCallCheck3.default)(this, FinamObjectNotFoundError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamObjectNotFoundError.__proto__ || (0, _getPrototypeOf2.default)(FinamObjectNotFoundError)).call(this, message));
    }

    return FinamObjectNotFoundError;
}(FinamImportError);

var FinamTooLongTimeframeError = function (_FinamImportError5) {
    (0, _inherits3.default)(FinamTooLongTimeframeError, _FinamImportError5);

    function FinamTooLongTimeframeError(message) {
        (0, _classCallCheck3.default)(this, FinamTooLongTimeframeError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamTooLongTimeframeError.__proto__ || (0, _getPrototypeOf2.default)(FinamTooLongTimeframeError)).call(this, message));
    }

    return FinamTooLongTimeframeError;
}(FinamImportError);

//#endregion

exports.FinamImportError = FinamImportError;
exports.FinamDownloadError = FinamDownloadError;
exports.FinamThrottlingError = FinamThrottlingError;
exports.FinamParsingError = FinamParsingError;
exports.FinamObjectNotFoundError = FinamObjectNotFoundError;
exports.FinamTooLongTimeframeError = FinamTooLongTimeframeError;

/***/ }),

/***/ "./src/finam/importer/importer.js":
/*!****************************************!*\
  !*** ./src/finam/importer/importer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");

var _timeframe = __webpack_require__(/*! ./timeframe */ "./src/finam/importer/timeframe.js");

var _timeframe2 = _interopRequireDefault(_timeframe);

var _url = __webpack_require__(/*! url */ "url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _utils.logger.assert;

var LookupComparator = {
    EQUALS: 1,
    STARTSWITH: 2,
    CONTAINS: 3
};

var Importer = function Importer() {
    var _this = this;

    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'export.finam.ru';
    (0, _classCallCheck3.default)(this, Importer);
    this.url_params = {
        d: 'd',
        f: 'table',
        e: '.csv',
        dtf: '1',
        tmf: '3',
        MSOR: '0',
        mstime: 'on',
        mstimever: '1',
        sep: '3',
        sep2: '1',
        at: '1'
    };
    this.download = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16842;
        var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var startDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date(2007, 1, 1);
        var endDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();
        var timeframe = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _timeframe2.default.DAILY;
        var code, params, url, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        code = 'GAZP';
                        params = {
                            p: timeframe.value,
                            em: id,
                            market: market.value,
                            df: startDate.getDate(),
                            mf: startDate.getMonth() - 1,
                            yf: startDate.getFullYear(),
                            dt: endDate.getDate(),
                            mt: endDate.getMonth() - 1,
                            yt: endDate.getFullYear(),
                            cn: code,
                            code: code,
                            datf: timeframe === _timeframe2.default.TICKS ? 6 : 5
                        };
                        url = _this.buildUrl(params);
                        _context.next = 5;
                        return (0, _utils.fetchContent)(url);

                    case 5:
                        data = _context.sent;


                        _utils.logger.debug(data);

                        return _context.abrupt('return', data);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    this.buildUrl = function (params) {
        //const search = Object.keys({...this.url_params, ...params}).reduce(
        //    (res, currKey) =>{
        //        res.push(`${currKey}=${this.url_params[currKey]}`)
        //        return res;
        //    },[]
        //).join('&');

        var searchParams = new _url.URLSearchParams((0, _extends3.default)({}, _this.url_params, params));

        assert(searchParams.toString().length > 0);

        var url = new _url.URL('http://' + _this.host);
        url.protocol = 'http:', url.host = _this.host;
        url.pathname = 'table.csv';
        //url.search = search;
        url.search = searchParams.toString();

        _utils.logger.debug(url.href);
        return url;
    };

    if ((typeof host === 'undefined' ? 'undefined' : (0, _typeof3.default)(host)) !== undefined) {
        this.host = host;
    }
};

exports.default = Importer;

/***/ }),

/***/ "./src/finam/importer/index.js":
/*!*************************************!*\
  !*** ./src/finam/importer/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _importer = __webpack_require__(/*! ./importer */ "./src/finam/importer/importer.js");

Object.defineProperty(exports, 'Importer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_importer).default;
  }
});

var _Metadata = __webpack_require__(/*! ./Metadata */ "./src/finam/importer/Metadata.js");

Object.defineProperty(exports, 'Metadata', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Metadata).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/finam/importer/timeframe.js":
/*!*****************************************!*\
  !*** ./src/finam/importer/timeframe.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var timeframe = {
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

exports.default = timeframe;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils/index.js");

var _index = __webpack_require__(/*! ./finam/importer/index */ "./src/finam/importer/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testMetadata = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var parser, data, vars;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _utils.logger.debug(typeof _index.Metadata === 'undefined' ? 'undefined' : (0, _typeof3.default)(_index.Metadata));
                        parser = new _index.Metadata();
                        _context.prev = 2;
                        _context.next = 5;
                        return parser.download();

                    case 5:
                        data = _context.sent;
                        vars = parser.parse(data);

                        vars.forEach(function (item) {
                            //if (Array.isArray(item.value)){
                            //    logger.debug({[item.name]: item.value.slice(0,5)});
                            //}
                            _utils.logger.debug(item.name);
                        });
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](2);

                        _utils.logger.error(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 10]]);
    }));

    return function testMetadata() {
        return _ref.apply(this, arguments);
    };
}();

var testImporter = function testImporter() {
    var importer = new _index.Importer();

    importer.download();
};

testMetadata();
testImporter();

/***/ }),

/***/ "./src/utils/http.js":
/*!***************************!*\
  !*** ./src/utils/http.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchContent = undefined;

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _url = __webpack_require__(/*! url */ "url");

var _http = __webpack_require__(/*! http */ "http");

var _http2 = _interopRequireDefault(_http);

var _https = __webpack_require__(/*! https */ "https");

var _https2 = _interopRequireDefault(_https);

var _iconvLite = __webpack_require__(/*! iconv-lite */ "iconv-lite");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _nodeFetch = __webpack_require__(/*! node-fetch */ "node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchContent = function fetchContent(url) {
    var converterStream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _iconvLite2.default.decodeStream('win1251');

    return new _promise2.default(function (resolve, reject) {
        (0, _nodeFetch2.default)(url).then(function (res) {
            return res.text();
        }).then(function (text) {
            return resolve(text);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

var _fetchContent = function _fetchContent(url) {
    var converterStream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _iconvLite2.default.decodeStream('win1251');

    return new _promise2.default(function (resolve, reject) {
        var urlBuilder = new _url.URL(url);
        _logger.consoleLogger.debug(urlBuilder.href);
        var lib = urlBuilder.protocol === 'https:' ? _https2.default : _http2.default;
        var options = {
            protocol: urlBuilder.protocol,
            host: urlBuilder.host,
            path: urlBuilder.pathname,
            agent: false,
            //headers: {
            //    'Content-Type': 'application/javascript'
            //}
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        };
        _logger.consoleLogger.debug((0, _stringify2.default)(options));
        var request = lib.get(options, function (res) {
            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error('Ошибка загрузки страницы, код ошибки: ' + res.statusCode));
            }
            var body = [];
            var stream = converterStream !== undefined && converterStream ? converterStream : res;
            if (stream === converterStream) {
                res.pipe(converterStream);
            }
            stream.on('data', function (chunk) {
                return body.push(chunk);
            });
            stream.on('end', function () {
                var data = body.join('');
                _logger.consoleLogger.debug('\u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B. ' + data.length + ' \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
                resolve(data);
            });
        });
        request.on('error', function (err) {
            return reject(err);
        });
    });
};

exports.fetchContent = fetchContent;

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContent = exports.logger = undefined;

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _http = __webpack_require__(/*! ./http */ "./src/utils/http.js");

exports.logger = _logger.consoleLogger;
exports.fetchContent = _http.fetchContent;

/***/ }),

/***/ "./src/utils/logger.js":
/*!*****************************!*\
  !*** ./src/utils/logger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleLogger = undefined;

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { createLogger, format, transports } from 'winston';
//
//const logger = createLogger({
//    transports: [
//        new transports.Console({
//            handleExceptions: true
//        })
//    ],
//    exitOnError: false
//});

var ConsoleLogger = function ConsoleLogger(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, ConsoleLogger);

    this.log = function (level, message) {
        var trace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var os = trace ? console.trace : console.log;
        os('[' + level + ']: ' + message);
    };

    this.info = function (message) {
        return _this.log('info', message);
    };

    this.warn = function (message) {
        return _this.log('warn', message);
    };

    this.error = function (message) {
        return _this.log('error', message);
    };

    this.assert = function (condition) {
        var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\u0412\u041D\u0418\u041C\u0410\u041D\u0418\u0415! \u0422\u0435\u0441\u0442 \u043D\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u043D : ' + (0, _stringify2.default)(condition);

        if (!condition) {
            if (_this.options.debug) {
                _this.log('assert', message, true);
            } else {
                throw new Error(message);
            }
        }
    };

    this.debug = function (message) {
        _this.options.debug ? _this.log('debug', message) : null;
    };

    this.options = options;
};

var consoleLogger = exports.consoleLogger = new ConsoleLogger({ debug: true });

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi babel-polyfill ./src/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"babel-polyfill");
module.exports = __webpack_require__(/*! C:\Users\Igor\Documents\__GitHub__\finam-export-js\src\index.js */"./src/index.js");


/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/extends":
/*!************************************************!*\
  !*** external "babel-runtime/helpers/extends" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/*!*************************************************!*\
  !*** external "babel-runtime/helpers/inherits" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/*!******************************************************************!*\
  !*** external "babel-runtime/helpers/possibleConstructorReturn" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "babel-runtime/helpers/toConsumableArray":
/*!**********************************************************!*\
  !*** external "babel-runtime/helpers/toConsumableArray" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),

/***/ "babel-runtime/helpers/typeof":
/*!***********************************************!*\
  !*** external "babel-runtime/helpers/typeof" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "babylon":
/*!**************************!*\
  !*** external "babylon" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babylon");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL01ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL2ltcG9ydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmluYW0vaW1wb3J0ZXIvdGltZWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaHR0cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJ5bG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaWNvbnYtbGl0ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiJdLCJuYW1lcyI6WyJhc3NlcnQiLCJsb2dnZXIiLCJNZXRhZGF0YSIsImZpbmFtVXJsIiwicGFyc2UiLCJ0ZXh0Q29kZSIsImxlbmd0aCIsIkZpbmFtSW1wb3J0RXJyb3IiLCJhc3QiLCJlcnIiLCJGaW5hbVBhcnNpbmdFcnJvciIsIm1lc3NhZ2UiLCJwcm9ncmFtIiwidW5kZWZpbmVkIiwiYm9keSIsInZhcmlhYmxlRGVjbGFyYXRpb25zIiwiZmlsdGVyIiwibm9kZSIsInR5cGUiLCJraW5kIiwibWF0Y2giLCJkZWNsYXJhdGlvbnMiLCJtYXAiLCJ2YXJEZWMiLCJyZWR1Y2UiLCJyZXMiLCJjdXJyIiwicHVzaCIsIml0ZW0iLCJpbml0IiwidmFycyIsImZvckVhY2giLCJkZWMiLCJlbGVtZW50cyIsInZhbHVlIiwibmFtZSIsImlkIiwicHJvcGVydGllcyIsInByb3BJdGVtIiwia2V5IiwiZG93bmxvYWQiLCJpY29udiIsImRlY29kZVN0cmVhbSIsImRhdGEiLCJFcnJvciIsIkZpbmFtRG93bmxvYWRFcnJvciIsIkZpbmFtVGhyb3R0bGluZ0Vycm9yIiwiRmluYW1PYmplY3ROb3RGb3VuZEVycm9yIiwiRmluYW1Ub29Mb25nVGltZWZyYW1lRXJyb3IiLCJMb29rdXBDb21wYXJhdG9yIiwiRVFVQUxTIiwiU1RBUlRTV0lUSCIsIkNPTlRBSU5TIiwiSW1wb3J0ZXIiLCJob3N0IiwidXJsX3BhcmFtcyIsImQiLCJmIiwiZSIsImR0ZiIsInRtZiIsIk1TT1IiLCJtc3RpbWUiLCJtc3RpbWV2ZXIiLCJzZXAiLCJzZXAyIiwiYXQiLCJtYXJrZXQiLCJzdGFydERhdGUiLCJEYXRlIiwiZW5kRGF0ZSIsInRpbWVmcmFtZSIsIlRpbWVmcmFtZSIsIkRBSUxZIiwiY29kZSIsInBhcmFtcyIsInAiLCJlbSIsImRmIiwiZ2V0RGF0ZSIsIm1mIiwiZ2V0TW9udGgiLCJ5ZiIsImdldEZ1bGxZZWFyIiwiZHQiLCJtdCIsInl0IiwiY24iLCJkYXRmIiwiVElDS1MiLCJ1cmwiLCJidWlsZFVybCIsImRlYnVnIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwidG9TdHJpbmciLCJVUkwiLCJwcm90b2NvbCIsInBhdGhuYW1lIiwic2VhcmNoIiwiaHJlZiIsImRlZmF1bHQiLCJNSU5VVEVTMSIsIk1JTlVURVM1IiwiTUlOVVRFUzEwIiwiTUlOVVRFUzE1IiwiTUlOVVRFUzMwIiwiSE9VUkxZIiwiV0VFS0xZIiwiTU9OVEhMWSIsInRlc3RNZXRhZGF0YSIsInBhcnNlciIsImVycm9yIiwidGVzdEltcG9ydGVyIiwiaW1wb3J0ZXIiLCJmZXRjaENvbnRlbnQiLCJjb252ZXJ0ZXJTdHJlYW0iLCJyZXNvbHZlIiwicmVqZWN0IiwidGhlbiIsInRleHQiLCJjYXRjaCIsIl9mZXRjaENvbnRlbnQiLCJ1cmxCdWlsZGVyIiwibGliIiwiaHR0cHMiLCJodHRwIiwib3B0aW9ucyIsInBhdGgiLCJhZ2VudCIsImhlYWRlcnMiLCJBY2NlcHQiLCJyZXF1ZXN0IiwiZ2V0Iiwic3RhdHVzQ29kZSIsInN0cmVhbSIsInBpcGUiLCJvbiIsImNodW5rIiwiam9pbiIsIkNvbnNvbGVMb2dnZXIiLCJsb2ciLCJsZXZlbCIsInRyYWNlIiwib3MiLCJjb25zb2xlIiwiaW5mbyIsIndhcm4iLCJjb25kaXRpb24iLCJjb25zb2xlTG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBU0EsSUFBTUEsU0FBU0MsY0FBT0QsTUFBdEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBYU1FLFE7Ozs7U0FDRkMsUSxHQUFXLCtDOztTQVNYQyxLLEdBQVEsb0JBQVk7O0FBRWhCLFlBQ0ksQ0FBQ0MsUUFBRCxJQUNBLE9BQU9BLFFBQVAsS0FBb0IsUUFEcEIsSUFFQUEsU0FBU0MsTUFBVCxLQUFvQixDQUh4QixFQUlFO0FBQ0Usa0JBQU0sSUFBSUMsMkJBQUosQ0FBcUIsWUFBckIsQ0FBTjtBQUNIOztBQUVELFlBQUlDLE1BQU0sSUFBVjs7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QmxJLE9BQWxCLENBQXJCLEdBQWtELElBQWxEO0FBQ0gsS0F2Qm9COztBQUNqQixTQUFLb0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0gsQzs7QUF3QkUsSUFBTXNCLHdDQUFnQixJQUFJVCxhQUFKLENBQWtCLEVBQUVoRCxPQUFPLElBQVQsRUFBbEIsQ0FBdEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENQLDJDOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLDBFOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG1FOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLDJEOzs7Ozs7Ozs7OztBQ0FBLDRFOzs7Ozs7Ozs7OztBQ0FBLG9FOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IGljb252IGZyb20gJ2ljb252LWxpdGUnO1xyXG5pbXBvcnQgeyBwYXJzZSBhcyBfcGFyc2UgfSBmcm9tICdiYWJ5bG9uJztcclxuaW1wb3J0IHtcclxuICAgIEZpbmFtSW1wb3J0RXJyb3IsXHJcbiAgICBGaW5hbURvd25sb2FkRXJyb3IsXHJcbiAgICBGaW5hbVRocm90dGxpbmdFcnJvcixcclxuICAgIEZpbmFtUGFyc2luZ0Vycm9yLFxyXG4gICAgRmluYW1PYmplY3ROb3RGb3VuZEVycm9yLFxyXG4gICAgRmluYW1Ub29Mb25nVGltZWZyYW1lRXJyb3IsXHJcbn0gZnJvbSAnLi9leGNlcHRpb24nO1xyXG5cclxuY29uc3QgYXNzZXJ0ID0gbG9nZ2VyLmFzc2VydDtcclxuXHJcbi8qKlxyXG4gKiDQntCx0LXRgdC/0LXRh9C40LLQsNC10YIg0L/QvtC70YPRh9C10L3QuNC1INC80LXRgtCw0LTQsNC90L3Ri9GFINGBINGB0LDQudGC0LAg0YTQuNC90LDQvC4gW1xyXG4gKiBhRW1pdGVudElkc1xyXG4gKiBhRW1pdGVudE5hbWVzXHJcbiAqIGFFbWl0ZW50Q29kZXNcclxuICogYUVtaXRlbnRNYXJrZXRzXHJcbiAqIGFFbWl0ZW50RGVjcFxyXG4gKiBhRGF0YUZvcm1hdFN0cnNcclxuICogYUVtaXRlbnRDaGlsZFxyXG4gKiBhRW1pdGVudFVybHNdXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRhZGF0YVxyXG4gKi9cclxuY2xhc3MgTWV0YWRhdGEge1xyXG4gICAgZmluYW1VcmwgPSAnaHR0cHM6Ly93d3cuZmluYW0ucnUvY2FjaGUvaWNoYXJ0cy9pY2hhcnRzLmpzJztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0LDRgNGB0LjRgiDQuNGB0YXQvtC00L3Ri9C5INC60L7QtCBqcyDQvdCw0YXQvtC00LjRgiDQstGB0LUg0L7QsdGP0LLQu9C10L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRiyDRgtC40L/QsDogW9C80LDRgdGB0LjQsiB8INC+0LHRitC10LrRgl1cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRDb2RlINCY0YHRhdC+0LTQvdGL0Lkg0LrQvtC0INC90LAganNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxvYmplY3Q+fSDQnNCw0YHRgdC40LIg0LDQu9C10LzQtdC90YLQvtCyIHtuYW1lLCB2YWx1ZX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwYXJzZSA9IHRleHRDb2RlID0+IHtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhdGV4dENvZGUgfHxcclxuICAgICAgICAgICAgdHlwZW9mIHRleHRDb2RlICE9PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgICB0ZXh0Q29kZS5sZW5ndGggPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEZpbmFtSW1wb3J0RXJyb3IoJ9Cd0LXRgiDQtNCw0L3QvdGL0YUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhc3QgPSBudWxsO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhc3QgPSBfcGFyc2UodGV4dENvZGUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhc3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmICghYXN0IHx8IGFzdC5wcm9ncmFtID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoJ9Cj0LfQtdC7IGJvZHkg0L3QtSDQvdCw0LnQtNC10L0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhc3QucHJvZ3JhbS5ib2R5O1xyXG5cclxuICAgICAgICBjb25zdCB2YXJpYWJsZURlY2xhcmF0aW9ucyA9IGJvZHkuZmlsdGVyKFxyXG4gICAgICAgICAgICBub2RlID0+XHJcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgbm9kZS5raW5kLm1hdGNoKCdsZXR8Y29uc3R8dmFyJylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXZhcmlhYmxlRGVjbGFyYXRpb25zIHx8IHZhcmlhYmxlRGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoJ9Cj0LfQtdC7IFZhcmlhYmxlRGVjbGFyYXRpb24g0L3QtSDQvdCw0LnQtNC10L0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlY2xhcmF0aW9ucyA9IHZhcmlhYmxlRGVjbGFyYXRpb25zXHJcbiAgICAgICAgICAgIC5tYXAodmFyRGVjID0+IHZhckRlYy5kZWNsYXJhdGlvbnMpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHJlcywgY3VycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY3Vyci5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPT4gaXRlbS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJyAmJiBpdGVtLmluaXRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICBpZiAoIWRlY2xhcmF0aW9ucyB8fCBkZWNsYXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbVBhcnNpbmdFcnJvcign0KPQt9C10LsgZGVjbGFyYXRpb25zINC90LUg0L3QsNC50LTQtdC9Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB2YXJzID0gW107ICAgIC8vINCc0LDRgdGB0LjQsiDRgNCw0YHQv9C+0LfQvdCw0L3QvdGL0YUg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlYyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkZWMuaW5pdC50eXBlID09PSAnQXJyYXlFeHByZXNzaW9uJyAmJiBkZWMuaW5pdC5lbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVjLmlkLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGVjLmluaXQuZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlLm1hdGNoKC9MaXRlcmFsJC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC50eXBlID09PSAnT2JqZWN0RXhwcmVzc2lvbicgJiZcclxuICAgICAgICAgICAgICAgIGRlYy5pbml0LnByb3BlcnRpZXNcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZWMuaWQubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC5wcm9wZXJ0aWVzLmZvckVhY2gocHJvcEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wSXRlbS50eXBlLm1hdGNoKC9Qcm9wZXJ0eSQvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtwcm9wSXRlbS5rZXkubmFtZV0gPSBwcm9wSXRlbS52YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhc3NlcnQodmFycy5sZW5ndGggPiAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZhcnM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQutCw0YfQuNCy0LDQtdGCINC40YHRhdC+0LTQvdGL0Lkg0YTQsNC50Lsg0LzQtdGC0LDQtNCw0L3QvdGL0LXRhSAoLmpzKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBkb3dubG9hZCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hDb250ZW50KFxyXG4gICAgICAgICAgICB0aGlzLmZpbmFtVXJsLFxyXG4gICAgICAgICAgICBpY29udi5kZWNvZGVTdHJlYW0oJ3dpbjEyNTEnKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXRhZGF0YTtcclxuIiwiLy8jcmVnaW9uICBFeHBvcnQgRXJyb3JzXHJcblxyXG5jbGFzcyBGaW5hbUltcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBGaW5hbURvd25sb2FkRXJyb3IgZXh0ZW5kcyBGaW5hbUltcG9ydEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmluYW1UaHJvdHRsaW5nRXJyb3IgZXh0ZW5kcyBGaW5hbUltcG9ydEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmluYW1QYXJzaW5nRXJyb3IgZXh0ZW5kcyBGaW5hbUltcG9ydEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmluYW1PYmplY3ROb3RGb3VuZEVycm9yIGV4dGVuZHMgRmluYW1JbXBvcnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZpbmFtVG9vTG9uZ1RpbWVmcmFtZUVycm9yIGV4dGVuZHMgRmluYW1JbXBvcnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHtcclxuICAgIEZpbmFtSW1wb3J0RXJyb3IsXHJcbiAgICBGaW5hbURvd25sb2FkRXJyb3IsXHJcbiAgICBGaW5hbVRocm90dGxpbmdFcnJvcixcclxuICAgIEZpbmFtUGFyc2luZ0Vycm9yLFxyXG4gICAgRmluYW1PYmplY3ROb3RGb3VuZEVycm9yLFxyXG4gICAgRmluYW1Ub29Mb25nVGltZWZyYW1lRXJyb3IsXHJcbn0iLCJpbXBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IFRpbWVmcmFtZSBmcm9tICcuL3RpbWVmcmFtZSc7XHJcbmltcG9ydCB7VVJMLCBVUkxTZWFyY2hQYXJhbXN9IGZyb20gJ3VybCdcclxuXHJcbmNvbnN0IGFzc2VydCA9IGxvZ2dlci5hc3NlcnQ7XHJcblxyXG5jb25zdCBMb29rdXBDb21wYXJhdG9yID0ge1xyXG4gICAgRVFVQUxTOiAxLFxyXG4gICAgU1RBUlRTV0lUSDogMixcclxuICAgIENPTlRBSU5TOiAzXHJcbn07XHJcblxyXG5jbGFzcyBJbXBvcnRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0ID0gJ2V4cG9ydC5maW5hbS5ydScpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGhvc3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVybF9wYXJhbXMgPSB7XHJcbiAgICAgICAgZDogJ2QnLFxyXG4gICAgICAgIGY6ICd0YWJsZScsXHJcbiAgICAgICAgZTogJy5jc3YnLFxyXG4gICAgICAgIGR0ZjogJzEnLFxyXG4gICAgICAgIHRtZjogJzMnLFxyXG4gICAgICAgIE1TT1I6ICcwJyxcclxuICAgICAgICBtc3RpbWU6ICdvbicsXHJcbiAgICAgICAgbXN0aW1ldmVyOiAnMScsXHJcbiAgICAgICAgc2VwOiAnMycsXHJcbiAgICAgICAgc2VwMjogJzEnLFxyXG4gICAgICAgIGF0OiAnMSdcclxuICAgIH07XHJcblxyXG4gICAgZG93bmxvYWQgPSBhc3luYyAoXHJcbiAgICAgICAgaWQ9MTY4NDIsXHJcbiAgICAgICAgbWFya2V0PTEsXHJcbiAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoMjAwNywgMSwgMSksXHJcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgdGltZWZyYW1lID0gVGltZWZyYW1lLkRBSUxZXHJcbiAgICApID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgY29kZSA9ICdHQVpQJztcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBwOiB0aW1lZnJhbWUudmFsdWUsXHJcbiAgICAgICAgICAgIGVtOiBpZCxcclxuICAgICAgICAgICAgbWFya2V0OiBtYXJrZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRmOiBzdGFydERhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtZjogc3RhcnREYXRlLmdldE1vbnRoKCkgLSAxLFxyXG4gICAgICAgICAgICB5Zjogc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIGR0OiBlbmREYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbXQ6IGVuZERhdGUuZ2V0TW9udGgoKSAtIDEsXHJcbiAgICAgICAgICAgIHl0OiBlbmREYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIGNuOiBjb2RlLFxyXG4gICAgICAgICAgICBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgICBkYXRmOiB0aW1lZnJhbWUgPT09IFRpbWVmcmFtZS5USUNLUyA/IDYgOiA1XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybChwYXJhbXMpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hDb250ZW50KHVybCk7XHJcblxyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ1aWxkVXJsID0gcGFyYW1zID0+IHtcclxuICAgICAgICAvL2NvbnN0IHNlYXJjaCA9IE9iamVjdC5rZXlzKHsuLi50aGlzLnVybF9wYXJhbXMsIC4uLnBhcmFtc30pLnJlZHVjZShcclxuICAgICAgICAvLyAgICAocmVzLCBjdXJyS2V5KSA9PntcclxuICAgICAgICAvLyAgICAgICAgcmVzLnB1c2goYCR7Y3VycktleX09JHt0aGlzLnVybF9wYXJhbXNbY3VycktleV19YClcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAvLyAgICB9LFtdXHJcbiAgICAgICAgLy8pLmpvaW4oJyYnKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMudXJsX3BhcmFtcyxcclxuICAgICAgICAgICAgLi4ucGFyYW1zXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYXNzZXJ0KHNlYXJjaFBhcmFtcy50b1N0cmluZygpLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHA6Ly8ke3RoaXMuaG9zdH1gKTtcclxuICAgICAgICB1cmwucHJvdG9jb2wgPSAnaHR0cDonLCBcclxuICAgICAgICB1cmwuaG9zdCA9IHRoaXMuaG9zdDtcclxuICAgICAgICB1cmwucGF0aG5hbWUgPSAndGFibGUuY3N2JztcclxuICAgICAgICAvL3VybC5zZWFyY2ggPSBzZWFyY2g7XHJcbiAgICAgICAgdXJsLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBsb2dnZXIuZGVidWcodXJsLmhyZWYpO1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9O1xyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1wb3J0ZXI7XHJcbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBJbXBvcnRlcn0gZnJvbSAnLi9pbXBvcnRlcic7XHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBNZXRhZGF0YX0gZnJvbSAnLi9NZXRhZGF0YSc7XHJcblxyXG4iLCJjb25zdCB0aW1lZnJhbWUgPSB7XHJcbiAgICBUSUNLUzogMSxcclxuICAgIE1JTlVURVMxOiAyLFxyXG4gICAgTUlOVVRFUzU6IDMsXHJcbiAgICBNSU5VVEVTMTA6IDQsXHJcbiAgICBNSU5VVEVTMTU6IDUsXHJcbiAgICBNSU5VVEVTMzA6IDYsXHJcbiAgICBIT1VSTFk6IDcsXHJcbiAgICBEQUlMWTogOCxcclxuICAgIFdFRUtMWTogOSxcclxuICAgIE1PTlRITFk6IDEwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lZnJhbWU7IiwiaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7SW1wb3J0ZXIsIE1ldGFkYXRhIH0gZnJvbSAnLi9maW5hbS9pbXBvcnRlci9pbmRleCc7XHJcblxyXG5jb25zdCB0ZXN0TWV0YWRhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsb2dnZXIuZGVidWcodHlwZW9mIE1ldGFkYXRhKTtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBNZXRhZGF0YSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcGFyc2VyLmRvd25sb2FkKCk7XHJcbiAgICAgICAgY29uc3QgdmFycyA9IHBhcnNlci5wYXJzZShkYXRhKTtcclxuICAgICAgICB2YXJzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIC8vaWYgKEFycmF5LmlzQXJyYXkoaXRlbS52YWx1ZSkpe1xyXG4gICAgICAgICAgICAvLyAgICBsb2dnZXIuZGVidWcoe1tpdGVtLm5hbWVdOiBpdGVtLnZhbHVlLnNsaWNlKDAsNSl9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhpdGVtLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgICAvL2NvbnN0IGNvZGUgPSBwYXJzZXIucGFyc2UoJ3ZhciBkYXRhID0gWzEsMiwzXSwgb2JqID0ge25tOiBcIklnb3JcIn0sIHRzdD0zOyB2YXIgdjM9XCJmZmZcIiwgdk51bGwnKTtcclxufTtcclxuXHJcbmNvbnN0IHRlc3RJbXBvcnRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGltcG9ydGVyID0gbmV3IEltcG9ydGVyKCk7XHJcblxyXG4gICAgaW1wb3J0ZXIuZG93bmxvYWQoKVxyXG59XHJcblxyXG50ZXN0TWV0YWRhdGEoKTtcclxudGVzdEltcG9ydGVyKCk7XHJcblxyXG4iLCJpbXBvcnQgeyBjb25zb2xlTG9nZ2VyIGFzIGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XHJcbmltcG9ydCBpY29udiBmcm9tICdpY29udi1saXRlJztcclxuXHJcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcclxuXHJcbmNvbnN0IGZldGNoQ29udGVudCA9ICh1cmwsIGNvbnZlcnRlclN0cmVhbSA9IGljb252LmRlY29kZVN0cmVhbSgnd2luMTI1MScpKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4gcmVzLnRleHQoKSkudGhlbih0ZXh0ID0+IHJlc29sdmUodGV4dCkpLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcbmNvbnN0IF9mZXRjaENvbnRlbnQgPSAodXJsLCBjb252ZXJ0ZXJTdHJlYW0gPSBpY29udi5kZWNvZGVTdHJlYW0oJ3dpbjEyNTEnKSkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1cmxCdWlsZGVyID0gbmV3IFVSTCh1cmwpO1xyXG4gICAgICAgIGxvZ2dlci5kZWJ1Zyh1cmxCdWlsZGVyLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IGxpYiA9XHJcbiAgICAgICAgICAgIHVybEJ1aWxkZXIucHJvdG9jb2wgPT09ICdodHRwczonXHJcbiAgICAgICAgICAgICAgICA/IGh0dHBzXHJcbiAgICAgICAgICAgICAgICA6IGh0dHBcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwcm90b2NvbDogdXJsQnVpbGRlci5wcm90b2NvbCxcclxuICAgICAgICAgICAgaG9zdDogdXJsQnVpbGRlci5ob3N0LFxyXG4gICAgICAgICAgICBwYXRoOiB1cmxCdWlsZGVyLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vaGVhZGVyczoge1xyXG4gICAgICAgICAgICAvLyAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFxyXG4gICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzY3LjAuMzM5Ni45OSBTYWZhcmkvNTM3LjM2JyxcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ3RleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL3dlYnAsaW1hZ2UvYXBuZywqLyo7cT0wLjgnLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdC1FbmNvZGluZyc6ICdnemlwLCBkZWZsYXRlJyxcclxuICAgICAgICAgICAgICAgICdBY2NlcHQtTGFuZ3VhZ2UnOiAncnUtUlUscnU7cT0wLjksZW4tVVM7cT0wLjgsZW47cT0wLjcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGxpYi5nZXQob3B0aW9ucywgcmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlcy5zdGF0dXNDb2RlID4gMjk5KSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAn0J7RiNC40LHQutCwINC30LDQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRiywg0LrQvtC0INC+0YjQuNCx0LrQuDogJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJlYW0gPVxyXG4gICAgICAgICAgICAgICAgY29udmVydGVyU3RyZWFtICE9PSB1bmRlZmluZWQgJiYgY29udmVydGVyU3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjb252ZXJ0ZXJTdHJlYW1cclxuICAgICAgICAgICAgICAgICAgICA6IHJlcztcclxuICAgICAgICAgICAgaWYgKHN0cmVhbSA9PT0gY29udmVydGVyU3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICByZXMucGlwZShjb252ZXJ0ZXJTdHJlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmVhbS5vbignZGF0YScsIGNodW5rID0+IGJvZHkucHVzaChjaHVuaykpO1xyXG4gICAgICAgICAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBib2R5LmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGDQlNCw0L3QvdGL0LUg0LfQsNCz0YDRg9C20LXQvdGLLiAke2RhdGEubGVuZ3RofSDRgdC40LzQstC+0LvQvtCyYCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIGVyciA9PiByZWplY3QoZXJyKSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgeyBmZXRjaENvbnRlbnQgfTtcclxuIiwiaW1wb3J0IHsgY29uc29sZUxvZ2dlciBhcyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IGZldGNoQ29udGVudCB9IGZyb20gJy4vaHR0cCc7XHJcblxyXG5leHBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9O1xyXG4iLCIvL2ltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgZm9ybWF0LCB0cmFuc3BvcnRzIH0gZnJvbSAnd2luc3Rvbic7XHJcbi8vXHJcbi8vY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHtcclxuLy8gICAgdHJhbnNwb3J0czogW1xyXG4vLyAgICAgICAgbmV3IHRyYW5zcG9ydHMuQ29uc29sZSh7XHJcbi8vICAgICAgICAgICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgXSxcclxuLy8gICAgZXhpdE9uRXJyb3I6IGZhbHNlXHJcbi8vfSk7XHJcblxyXG5jbGFzcyBDb25zb2xlTG9nZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZyA9IChsZXZlbCwgbWVzc2FnZSwgdHJhY2U9ZmFsc2UpID0+IHtcclxuICAgICAgICBjb25zdCBvcyA9IHRyYWNlID8gY29uc29sZS50cmFjZSA6IGNvbnNvbGUubG9nO1xyXG4gICAgICAgIG9zKGBbJHtsZXZlbH1dOiAke21lc3NhZ2V9YCk7XHJcbiAgICB9O1xyXG4gICAgaW5mbyA9IG1lc3NhZ2UgPT4gdGhpcy5sb2coJ2luZm8nLCBtZXNzYWdlKTtcclxuICAgIHdhcm4gPSBtZXNzYWdlID0+IHRoaXMubG9nKCd3YXJuJywgbWVzc2FnZSk7XHJcbiAgICBlcnJvciA9IG1lc3NhZ2UgPT4gdGhpcy5sb2coJ2Vycm9yJywgbWVzc2FnZSk7XHJcbiAgICBhc3NlcnQgPSAoY29uZGl0aW9uLCBtZXNzYWdlPWDQktCd0JjQnNCQ0J3QmNCVISDQotC10YHRgiDQvdC1INC/0YDQvtC50LTQtdC9IDogJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb24pfWApID0+IHtcclxuICAgICAgICBpZiAoIWNvbmRpdGlvbil7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2Fzc2VydCcsIG1lc3NhZ2UsIHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGVidWcgPSBtZXNzYWdlID0+IHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZGVidWcgPyB0aGlzLmxvZygnZGVidWcnLCBtZXNzYWdlKSA6IG51bGw7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uc29sZUxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKHsgZGVidWc6IHRydWUgfSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYnlsb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpY29udi1saXRlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=