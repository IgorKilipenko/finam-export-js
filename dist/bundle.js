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

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

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

    this.saveMetadata = function (meta) {
        _fs2.default.writeFile('metadata.txt', meta, function (err) {
            if (err) {
                _utils.logger.error(err);
            }
        });
    };
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
exports.FinamParsingError = exports.FinamDownloadError = exports.FinamImportError = undefined;

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

var FinamParsingError = function (_FinamImportError2) {
    (0, _inherits3.default)(FinamParsingError, _FinamImportError2);

    function FinamParsingError(message) {
        (0, _classCallCheck3.default)(this, FinamParsingError);
        return (0, _possibleConstructorReturn3.default)(this, (FinamParsingError.__proto__ || (0, _getPrototypeOf2.default)(FinamParsingError)).call(this, message));
    }

    return FinamParsingError;
}(FinamImportError);

//#endregion

exports.FinamImportError = FinamImportError;
exports.FinamDownloadError = FinamDownloadError;
exports.FinamParsingError = FinamParsingError;

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

var _Metadata = __webpack_require__(/*! ./Metadata */ "./src/finam/importer/Metadata.js");

var _Metadata2 = _interopRequireDefault(_Metadata);

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

        var searchParams = new _url.URLSearchParams((0, _extends3.default)({}, _this.url_params, params));

        assert(searchParams.toString().length > 0);

        var url = new _url.URL('http://' + _this.host);
        url.protocol = 'http:', url.host = _this.host;
        url.pathname = 'table.csv';
        //url.search = search;
        url.search = searchParams.toString();

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

                        parser.saveMetadata(data);
                        vars.forEach(function (item) {
                            //if (Array.isArray(item.value)){
                            //    logger.debug({[item.name]: item.value.slice(0,5)});
                            //}
                            _utils.logger.debug(item.name);
                        });
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](2);

                        _utils.logger.error(_context.t0);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 11]]);
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
//testImporter();

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

var _string_decoder = __webpack_require__(/*! string_decoder */ "string_decoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchContent = function fetchContent(url) {
    return new _promise2.default(function (resolve, reject) {
        (0, _nodeFetch2.default)(url).then(function (res) {
            return res.buffer();
        }).then(function (buffer) {
            return _iconvLite2.default.decode(buffer, 'win1251');
        }).then(function (text) {
            return resolve(text);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

var fetchContent_ = function fetchContent_(url) {
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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

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

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL01ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL2ltcG9ydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmluYW0vaW1wb3J0ZXIvdGltZWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaHR0cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJ5bG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpY29udi1saXRlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS1mZXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN0cmluZ19kZWNvZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiXSwibmFtZXMiOlsiYXNzZXJ0IiwibG9nZ2VyIiwiTWV0YWRhdGEiLCJmaW5hbVVybCIsInBhcnNlIiwidGV4dENvZGUiLCJsZW5ndGgiLCJGaW5hbUltcG9ydEVycm9yIiwiYXN0IiwiZXJyIiwiRmluYW1QYXJzaW5nRXJyb3IiLCJtZXNzYWdlIiwicHJvZ3JhbSIsInVuZGVmaW5lZCIsImJvZHkiLCJ2YXJpYWJsZURlY2xhcmF0aW9ucyIsImZpbHRlciIsIm5vZGUiLCJ0eXBlIiwia2luZCIsIm1hdGNoIiwiZGVjbGFyYXRpb25zIiwibWFwIiwidmFyRGVjIiwicmVkdWNlIiwicmVzIiwiY3VyciIsInB1c2giLCJpdGVtIiwiaW5pdCIsInZhcnMiLCJmb3JFYWNoIiwiZGVjIiwiZWxlbWVudHMiLCJ2YWx1ZSIsIm5hbWUiLCJpZCIsInByb3BlcnRpZXMiLCJwcm9wSXRlbSIsImtleSIsImRvd25sb2FkIiwiaWNvbnYiLCJkZWNvZGVTdHJlYW0iLCJkYXRhIiwic2F2ZU1ldGFkYXRhIiwibWV0YSIsImZzIiwid3JpdGVGaWxlIiwiZXJyb3IiLCJFcnJvciIsIkZpbmFtRG93bmxvYWRFcnJvciIsIkxvb2t1cENvbXBhcmF0b3IiLCJFUVVBTFMiLCJTVEFSVFNXSVRIIiwiQ09OVEFJTlMiLCJJbXBvcnRlciIsImhvc3QiLCJ1cmxfcGFyYW1zIiwiZCIsImYiLCJlIiwiZHRmIiwidG1mIiwiTVNPUiIsIm1zdGltZSIsIm1zdGltZXZlciIsInNlcCIsInNlcDIiLCJhdCIsIm1hcmtldCIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJlbmREYXRlIiwidGltZWZyYW1lIiwiVGltZWZyYW1lIiwiREFJTFkiLCJjb2RlIiwicGFyYW1zIiwicCIsImVtIiwiZGYiLCJnZXREYXRlIiwibWYiLCJnZXRNb250aCIsInlmIiwiZ2V0RnVsbFllYXIiLCJkdCIsIm10IiwieXQiLCJjbiIsImRhdGYiLCJUSUNLUyIsInVybCIsImJ1aWxkVXJsIiwiZGVidWciLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ0b1N0cmluZyIsIlVSTCIsInByb3RvY29sIiwicGF0aG5hbWUiLCJzZWFyY2giLCJkZWZhdWx0IiwiTUlOVVRFUzEiLCJNSU5VVEVTNSIsIk1JTlVURVMxMCIsIk1JTlVURVMxNSIsIk1JTlVURVMzMCIsIkhPVVJMWSIsIldFRUtMWSIsIk1PTlRITFkiLCJ0ZXN0TWV0YWRhdGEiLCJwYXJzZXIiLCJ0ZXN0SW1wb3J0ZXIiLCJpbXBvcnRlciIsImZldGNoQ29udGVudCIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwiYnVmZmVyIiwiZGVjb2RlIiwidGV4dCIsImNhdGNoIiwiZmV0Y2hDb250ZW50XyIsImNvbnZlcnRlclN0cmVhbSIsInVybEJ1aWxkZXIiLCJocmVmIiwibGliIiwiaHR0cHMiLCJodHRwIiwib3B0aW9ucyIsInBhdGgiLCJhZ2VudCIsImhlYWRlcnMiLCJBY2NlcHQiLCJyZXF1ZXN0IiwiZ2V0Iiwic3RhdHVzQ29kZSIsInN0cmVhbSIsInBpcGUiLCJvbiIsImNodW5rIiwiam9pbiIsIkNvbnNvbGVMb2dnZXIiLCJsb2ciLCJsZXZlbCIsInRyYWNlIiwib3MiLCJjb25zb2xlIiwiaW5mbyIsIndhcm4iLCJjb25kaXRpb24iLCJjb25zb2xlTG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQVFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxjQUFPRCxNQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFhTUUsUTs7OztTQUNGQyxRLEdBQVcsK0M7O1NBU1hDLEssR0FBUSxvQkFBWTs7QUFFaEIsWUFDSSxDQUFDQyxRQUFELElBQ0EsT0FBT0EsUUFBUCxLQUFvQixRQURwQixJQUVBQSxTQUFTQyxNQUFULEtBQW9CLENBSHhCLEVBSUU7QUFDRSxrQkFBTSxJQUFJQywyQkFBSixDQUFxQixZQUFyQixDQUFOO0FBQ0g7O0FBRUQsWUFBSUMsTUFBTSxJQUFWOztBQUVBLFlBQUk7QUFDQUEsa0JBQU0sb0JBQU9ILFFBQVAsQ0FBTjtBQUNILFNBRkQsQ0FFRSxPQUFPSSxHQUFQLEVBQVk7QUFDVkQsa0JBQU0sSUFBTjtBQUNBLGtCQUFNLElBQUlFLDRCQUFKLENBQXNCRCxJQUFJRSxPQUExQixDQUFOO0FBQ0g7O0FBSUQsWUFBSSxDQUFDSCxHQUFELElBQVFBLElBQUlJLE9BQUosS0FBZ0JDLFNBQTVCLEVBQXNDO0FBQ2xDLGtCQUFNLElBQUlILDRCQUFKLENBQXNCLHFCQUF0QixDQUFOO0FBQ0g7O0FBRUQsWUFBTUksT0FBT04sSUFBSUksT0FBSixDQUFZRSxJQUF6Qjs7QUFFQSxZQUFNQyx1QkFBdUJELEtBQUtFLE1BQUwsQ0FDekI7QUFBQSxtQkFDSUMsS0FBS0MsSUFBTCxLQUFjLHFCQUFkLElBQ0FELEtBQUtFLElBQUwsQ0FBVUMsS0FBVixDQUFnQixlQUFoQixDQUZKO0FBQUEsU0FEeUIsQ0FBN0I7O0FBTUEsWUFBSSxDQUFDTCxvQkFBRCxJQUF5QkEscUJBQXFCVCxNQUFyQixLQUFnQyxDQUE3RCxFQUFnRTtBQUM1RCxrQkFBTSxJQUFJSSw0QkFBSixDQUFzQixvQ0FBdEIsQ0FBTjtBQUNIOztBQUVELFlBQU1XLGVBQWVOLHFCQUNoQk8sR0FEZ0IsQ0FDWjtBQUFBLG1CQUFVQyxPQUFPRixZQUFqQjtBQUFBLFNBRFksRUFFaEJHLE1BRmdCLENBRVQsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDbkJELGdCQUFJRSxJQUFKLDZDQUNPRCxLQUFLVixNQUFMLENBQ0M7QUFBQSx1QkFBUVksS0FBS1YsSUFBTCxLQUFjLG9CQUFkLElBQXNDVSxLQUFLQyxJQUFuRDtBQUFBLGFBREQsQ0FEUDtBQUtBLG1CQUFPSixHQUFQO0FBQ0gsU0FUZ0IsRUFTZCxFQVRjLENBQXJCOztBQVdBLFlBQUksQ0FBQ0osWUFBRCxJQUFpQkEsYUFBYWYsTUFBYixLQUF3QixDQUE3QyxFQUFnRDtBQUM1QyxrQkFBTSxJQUFJSSw0QkFBSixDQUFzQiw2QkFBdEIsQ0FBTjtBQUNIOztBQUVELFlBQU1vQixPQUFPLEVBQWIsQ0FwRGdCLENBb0RJO0FBQ3BCVCxxQkFBYVUsT0FBYixDQUFxQixlQUFPO0FBQ3hCLGdCQUFJQyxJQUFJSCxJQUFKLENBQVNYLElBQVQsS0FBa0IsaUJBQWxCLElBQXVDYyxJQUFJSCxJQUFKLENBQVNJLFFBQXBELEVBQThEO0FBQzFELG9CQUFNQyxRQUFRLEVBQWQ7QUFDQUoscUJBQUtILElBQUwsQ0FBVTtBQUNOUSwwQkFBTUgsSUFBSUksRUFBSixDQUFPRCxJQURQO0FBRU5EO0FBRk0saUJBQVY7QUFJQUYsb0JBQUlILElBQUosQ0FBU0ksUUFBVCxDQUFrQkYsT0FBbEIsQ0FBMEIsZ0JBQVE7QUFDOUIsd0JBQUlILEtBQUtWLElBQUwsQ0FBVUUsS0FBVixDQUFnQixVQUFoQixDQUFKLEVBQWlDO0FBQzdCYyw4QkFBTVAsSUFBTixDQUFXQyxLQUFLTSxLQUFoQjtBQUNIO0FBQ0osaUJBSkQ7QUFLSCxhQVhELE1BV08sSUFDSEYsSUFBSUgsSUFBSixDQUFTWCxJQUFULEtBQWtCLGtCQUFsQixJQUNBYyxJQUFJSCxJQUFKLENBQVNRLFVBRk4sRUFHTDtBQUNFLG9CQUFNSCxTQUFRLEVBQWQ7QUFDQUoscUJBQUtILElBQUwsQ0FBVTtBQUNOUSwwQkFBTUgsSUFBSUksRUFBSixDQUFPRCxJQURQO0FBRU5EO0FBRk0saUJBQVY7QUFJQUYsb0JBQUlILElBQUosQ0FBU1EsVUFBVCxDQUFvQk4sT0FBcEIsQ0FBNEIsb0JBQVk7QUFDcEMsd0JBQUlPLFNBQVNwQixJQUFULENBQWNFLEtBQWQsQ0FBb0IsV0FBcEIsQ0FBSixFQUFzQztBQUNsQ2MsK0JBQU1JLFNBQVNDLEdBQVQsQ0FBYUosSUFBbkIsSUFBMkJHLFNBQVNKLEtBQVQsQ0FBZUEsS0FBMUM7QUFDSDtBQUNKLGlCQUpEO0FBS0g7QUFDSixTQTNCRDs7QUE2QkFsQyxlQUFPOEIsS0FBS3hCLE1BQUwsR0FBYyxDQUFyQjs7QUFFQSxlQUFPd0IsSUFBUDtBQUNILEs7O1NBT0RVLFEsNEVBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFDWSx5QkFDZixNQUFLckMsUUFEVSxFQUVmc0Msb0JBQU1DLFlBQU4sQ0FBbUIsU0FBbkIsQ0FGZSxDQURaOztBQUFBO0FBQ0RDLDRCQURDO0FBQUEseURBS0FBLElBTEE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSzs7U0FRWEMsWSxHQUFlLFVBQUNDLElBQUQsRUFBVTtBQUNyQkMscUJBQUdDLFNBQUgsQ0FBYSxjQUFiLEVBQTZCRixJQUE3QixFQUFtQyxlQUFPO0FBQ3RDLGdCQUFJcEMsR0FBSixFQUFRO0FBQ0pSLDhCQUFPK0MsS0FBUCxDQUFhdkMsR0FBYjtBQUNIO0FBQ0osU0FKRDtBQUtILEs7OztBQWpIRDs7Ozs7Ozs7O0FBOEZBOzs7Ozs7O2tCQXNCV1AsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25KZjs7SUFFTUssZ0I7OztBQUNGLDhCQUFZSSxPQUFaLEVBQXFCO0FBQUE7QUFBQSx5SkFDWEEsT0FEVztBQUVwQjs7O0VBSDBCc0MsSzs7SUFNekJDLGtCOzs7QUFDRixnQ0FBWXZDLE9BQVosRUFBcUI7QUFBQTtBQUFBLDZKQUNYQSxPQURXO0FBRXBCOzs7RUFINEJKLGdCOztJQU0zQkcsaUI7OztBQUNGLCtCQUFZQyxPQUFaLEVBQXFCO0FBQUE7QUFBQSwySkFDWEEsT0FEVztBQUVwQjs7O0VBSDJCSixnQjs7QUFNaEM7O1FBR0lBLGdCLEdBQUFBLGdCO1FBQ0EyQyxrQixHQUFBQSxrQjtRQUNBeEMsaUIsR0FBQUEsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJKOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1WLFNBQVNDLGNBQU9ELE1BQXRCOztBQUVBLElBQU1tRCxtQkFBbUI7QUFDckJDLFlBQVEsQ0FEYTtBQUVyQkMsZ0JBQVksQ0FGUztBQUdyQkMsY0FBVTtBQUhXLENBQXpCOztJQU1NQyxRLEdBQ0Ysb0JBQXNDO0FBQUE7O0FBQUEsUUFBMUJDLElBQTBCLHVFQUFuQixpQkFBbUI7QUFBQTtBQUFBLFNBS3RDQyxVQUxzQyxHQUt6QjtBQUNUQyxXQUFHLEdBRE07QUFFVEMsV0FBRyxPQUZNO0FBR1RDLFdBQUcsTUFITTtBQUlUQyxhQUFLLEdBSkk7QUFLVEMsYUFBSyxHQUxJO0FBTVRDLGNBQU0sR0FORztBQU9UQyxnQkFBUSxJQVBDO0FBUVRDLG1CQUFXLEdBUkY7QUFTVEMsYUFBSyxHQVRJO0FBVVRDLGNBQU0sR0FWRztBQVdUQyxZQUFJO0FBWEssS0FMeUI7QUFBQSxTQW1CdEM1QixRQW5Cc0MsNEVBbUIzQjtBQUFBLFlBQ1BKLEVBRE8sdUVBQ0osS0FESTtBQUFBLFlBRVBpQyxNQUZPLHVFQUVBLENBRkE7QUFBQSxZQUdQQyxTQUhPLHVFQUdLLElBQUlDLElBQUosQ0FBUyxJQUFULEVBQWUsQ0FBZixFQUFrQixDQUFsQixDQUhMO0FBQUEsWUFJUEMsT0FKTyx1RUFJRyxJQUFJRCxJQUFKLEVBSkg7QUFBQSxZQUtQRSxTQUxPLHVFQUtLQyxvQkFBVUMsS0FMZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRREMsNEJBUkMsR0FRTSxNQVJOO0FBVURDLDhCQVZDLEdBVVE7QUFDWEMsK0JBQUdMLFVBQVV2QyxLQURGO0FBRVg2QyxnQ0FBSTNDLEVBRk87QUFHWGlDLG9DQUFRQSxPQUFPbkMsS0FISjtBQUlYOEMsZ0NBQUlWLFVBQVVXLE9BQVYsRUFKTztBQUtYQyxnQ0FBSVosVUFBVWEsUUFBVixLQUF1QixDQUxoQjtBQU1YQyxnQ0FBSWQsVUFBVWUsV0FBVixFQU5PO0FBT1hDLGdDQUFJZCxRQUFRUyxPQUFSLEVBUE87QUFRWE0sZ0NBQUlmLFFBQVFXLFFBQVIsS0FBcUIsQ0FSZDtBQVNYSyxnQ0FBSWhCLFFBQVFhLFdBQVIsRUFUTztBQVVYSSxnQ0FBSWIsSUFWTztBQVdYQSxrQ0FBTUEsSUFYSztBQVlYYyxrQ0FBTWpCLGNBQWNDLG9CQUFVaUIsS0FBeEIsR0FBZ0MsQ0FBaEMsR0FBb0M7QUFaL0IseUJBVlI7QUF5QkRDLDJCQXpCQyxHQXlCSyxNQUFLQyxRQUFMLENBQWNoQixNQUFkLENBekJMO0FBQUE7QUFBQSwrQkEyQlkseUJBQWFlLEdBQWIsQ0EzQlo7O0FBQUE7QUEyQkRqRCw0QkEzQkM7OztBQTZCUDFDLHNDQUFPNkYsS0FBUCxDQUFhbkQsSUFBYjs7QUE3Qk8seURBK0JBQSxJQS9CQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQW5CMkI7O0FBQUEsU0FxRHRDa0QsUUFyRHNDLEdBcUQzQixrQkFBVTs7QUFFakIsWUFBTUUsZUFBZSxJQUFJQyxvQkFBSiw0QkFDZCxNQUFLdkMsVUFEUyxFQUVkb0IsTUFGYyxFQUFyQjs7QUFLQTdFLGVBQU8rRixhQUFhRSxRQUFiLEdBQXdCM0YsTUFBeEIsR0FBaUMsQ0FBeEM7O0FBRUEsWUFBTXNGLE1BQU0sSUFBSU0sUUFBSixhQUFrQixNQUFLMUMsSUFBdkIsQ0FBWjtBQUNBb0MsWUFBSU8sUUFBSixHQUFlLE9BQWYsRUFDQVAsSUFBSXBDLElBQUosR0FBVyxNQUFLQSxJQURoQjtBQUVBb0MsWUFBSVEsUUFBSixHQUFlLFdBQWY7QUFDQTtBQUNBUixZQUFJUyxNQUFKLEdBQWFOLGFBQWFFLFFBQWIsRUFBYjs7QUFFQSxlQUFPTCxHQUFQO0FBQ0gsS0F0RXFDOztBQUNsQyxRQUFJLFFBQU9wQyxJQUFQLHVEQUFPQSxJQUFQLE9BQWdCM0MsU0FBcEIsRUFBK0I7QUFDM0IsYUFBSzJDLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBQ0osQzs7a0JBeUVVRCxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2Q0MzRlArQyxPOzs7Ozs7Ozs7NkNBQ0FBLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RSLElBQU03QixZQUFZO0FBQ2RrQixXQUFPLENBRE87QUFFZFksY0FBVSxDQUZJO0FBR2RDLGNBQVUsQ0FISTtBQUlkQyxlQUFXLENBSkc7QUFLZEMsZUFBVyxDQUxHO0FBTWRDLGVBQVcsQ0FORztBQU9kQyxZQUFRLENBUE07QUFRZGpDLFdBQU8sQ0FSTztBQVNka0MsWUFBUSxDQVRNO0FBVWRDLGFBQVM7QUFWSyxDQUFsQjs7a0JBYWVyQyxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JmOztBQUNBOzs7O0FBRUEsSUFBTXNDO0FBQUEsd0ZBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2pCOUcsc0NBQU82RixLQUFQLFFBQW9CNUYsZUFBcEIsdURBQW9CQSxlQUFwQjtBQUNNOEcsOEJBRlcsR0FFRixJQUFJOUcsZUFBSixFQUZFO0FBQUE7QUFBQTtBQUFBLCtCQUlNOEcsT0FBT3hFLFFBQVAsRUFKTjs7QUFBQTtBQUlQRyw0QkFKTztBQUtQYiw0QkFMTyxHQUtBa0YsT0FBTzVHLEtBQVAsQ0FBYXVDLElBQWIsQ0FMQTs7QUFNYnFFLCtCQUFPcEUsWUFBUCxDQUFvQkQsSUFBcEI7QUFDQWIsNkJBQUtDLE9BQUwsQ0FBYSxnQkFBUTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTlCLDBDQUFPNkYsS0FBUCxDQUFhbEUsS0FBS08sSUFBbEI7QUFDSCx5QkFMRDtBQVBhO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQWNibEMsc0NBQU8rQyxLQUFQOztBQWRhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFtQkEsSUFBTWlFLGVBQWUsU0FBZkEsWUFBZSxHQUFNO0FBQ3ZCLFFBQU1DLFdBQVcsSUFBSTNELGVBQUosRUFBakI7O0FBRUEyRCxhQUFTMUUsUUFBVDtBQUNILENBSkQ7O0FBTUF1RTtBQUNBLGlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBLElBQU1JLGVBQWUsU0FBZkEsWUFBZSxDQUFDdkIsR0FBRCxFQUFTO0FBQzFCLFdBQU8sc0JBQVksVUFBQ3dCLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyxpQ0FBTXpCLEdBQU4sRUFBVzBCLElBQVgsQ0FBZ0I7QUFBQSxtQkFBTzdGLElBQUk4RixNQUFKLEVBQVA7QUFBQSxTQUFoQixFQUFxQ0QsSUFBckMsQ0FBMEM7QUFBQSxtQkFBVTdFLG9CQUFNK0UsTUFBTixDQUFhRCxNQUFiLEVBQW9CLFNBQXBCLENBQVY7QUFBQSxTQUExQyxFQUFvRkQsSUFBcEYsQ0FBeUY7QUFBQSxtQkFBUUYsUUFBUUssSUFBUixDQUFSO0FBQUEsU0FBekYsRUFBZ0hDLEtBQWhILENBQXNIO0FBQUEsbUJBQU9MLE9BQU81RyxHQUFQLENBQVA7QUFBQSxTQUF0SDtBQUNILEtBRk0sQ0FBUDtBQUlILENBTEQ7O0FBT0EsSUFBTWtILGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQy9CLEdBQUQsRUFBMEQ7QUFBQSxRQUFwRGdDLGVBQW9ELHVFQUFsQ25GLG9CQUFNQyxZQUFOLENBQW1CLFNBQW5CLENBQWtDOztBQUM1RSxXQUFPLHNCQUFZLFVBQUMwRSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsWUFBTVEsYUFBYSxJQUFJM0IsUUFBSixDQUFRTixHQUFSLENBQW5CO0FBQ0EzRiw4QkFBTzZGLEtBQVAsQ0FBYStCLFdBQVdDLElBQXhCO0FBQ0EsWUFBTUMsTUFDRkYsV0FBVzFCLFFBQVgsS0FBd0IsUUFBeEIsR0FDTTZCLGVBRE4sR0FFTUMsY0FIVjtBQUlBLFlBQU1DLFVBQVU7QUFDWi9CLHNCQUFVMEIsV0FBVzFCLFFBRFQ7QUFFWjNDLGtCQUFNcUUsV0FBV3JFLElBRkw7QUFHWjJFLGtCQUFNTixXQUFXekIsUUFITDtBQUlaZ0MsbUJBQU8sS0FKSztBQUtaO0FBQ0E7QUFDQTtBQUNBQyxxQkFBUztBQUNMLDhCQUFjLG9IQURUO0FBRUxDLHdCQUFRLHVGQUZIO0FBR0wsbUNBQW1CLGVBSGQ7QUFJTCxtQ0FBbUI7QUFKZDtBQVJHLFNBQWhCO0FBZUFySSw4QkFBTzZGLEtBQVAsQ0FBYSx5QkFBZW9DLE9BQWYsQ0FBYjtBQUNBLFlBQU1LLFVBQVVSLElBQUlTLEdBQUosQ0FBUU4sT0FBUixFQUFpQixlQUFPO0FBQ3BDLGdCQUFJekcsSUFBSWdILFVBQUosR0FBaUIsR0FBakIsSUFBd0JoSCxJQUFJZ0gsVUFBSixHQUFpQixHQUE3QyxFQUFrRDtBQUM5Q3BCLHVCQUNJLElBQUlwRSxLQUFKLENBQ0ksMkNBQ0l4QixJQUFJZ0gsVUFGWixDQURKO0FBTUg7QUFDRCxnQkFBTTNILE9BQU8sRUFBYjtBQUNBLGdCQUFNNEgsU0FDRmQsb0JBQW9CL0csU0FBcEIsSUFBaUMrRyxlQUFqQyxHQUNNQSxlQUROLEdBRU1uRyxHQUhWO0FBSUEsZ0JBQUlpSCxXQUFXZCxlQUFmLEVBQWdDO0FBQzVCbkcsb0JBQUlrSCxJQUFKLENBQVNmLGVBQVQ7QUFDSDtBQUNEYyxtQkFBT0UsRUFBUCxDQUFVLE1BQVYsRUFBa0I7QUFBQSx1QkFBUzlILEtBQUthLElBQUwsQ0FBVWtILEtBQVYsQ0FBVDtBQUFBLGFBQWxCO0FBQ0FILG1CQUFPRSxFQUFQLENBQVUsS0FBVixFQUFpQixZQUFNO0FBQ25CLG9CQUFNakcsT0FBTzdCLEtBQUtnSSxJQUFMLENBQVUsRUFBVixDQUFiO0FBQ0E3SSxzQ0FBTzZGLEtBQVAsbUdBQWtDbkQsS0FBS3JDLE1BQXZDO0FBQ0E4Ryx3QkFBUXpFLElBQVI7QUFDSCxhQUpEO0FBS0gsU0F2QmUsQ0FBaEI7QUF3QkE0RixnQkFBUUssRUFBUixDQUFXLE9BQVgsRUFBb0I7QUFBQSxtQkFBT3ZCLE9BQU81RyxHQUFQLENBQVA7QUFBQSxTQUFwQjtBQUNILEtBaERNLENBQVA7QUFpREgsQ0FsREQ7O1FBcURTMEcsWSxHQUFBQSxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVUOztBQUNBOztRQUVTbEgsTSxHQUFBQSxxQjtRQUFRa0gsWSxHQUFBQSxrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU00QixhLEdBQ0YsdUJBQVliLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFBQSxTQUlyQmMsR0FKcUIsR0FJZixVQUFDQyxLQUFELEVBQVF0SSxPQUFSLEVBQWlDO0FBQUEsWUFBaEJ1SSxLQUFnQix1RUFBVixLQUFVOztBQUNuQyxZQUFNQyxLQUFLRCxRQUFRRSxRQUFRRixLQUFoQixHQUF3QkUsUUFBUUosR0FBM0M7QUFDQUcsaUJBQU9GLEtBQVAsV0FBa0J0SSxPQUFsQjtBQUNILEtBUG9COztBQUFBLFNBUXJCMEksSUFScUIsR0FRZDtBQUFBLGVBQVcsTUFBS0wsR0FBTCxDQUFTLE1BQVQsRUFBaUJySSxPQUFqQixDQUFYO0FBQUEsS0FSYzs7QUFBQSxTQVNyQjJJLElBVHFCLEdBU2Q7QUFBQSxlQUFXLE1BQUtOLEdBQUwsQ0FBUyxNQUFULEVBQWlCckksT0FBakIsQ0FBWDtBQUFBLEtBVGM7O0FBQUEsU0FVckJxQyxLQVZxQixHQVViO0FBQUEsZUFBVyxNQUFLZ0csR0FBTCxDQUFTLE9BQVQsRUFBa0JySSxPQUFsQixDQUFYO0FBQUEsS0FWYTs7QUFBQSxTQVdyQlgsTUFYcUIsR0FXWixVQUFDdUosU0FBRCxFQUFtRjtBQUFBLFlBQXZFNUksT0FBdUUsaU5BQWhDLHlCQUFlNEksU0FBZixDQUFnQzs7QUFDeEYsWUFBSSxDQUFDQSxTQUFMLEVBQWU7QUFDWCxnQkFBSSxNQUFLckIsT0FBTCxDQUFhcEMsS0FBakIsRUFBdUI7QUFDbkIsc0JBQUtrRCxHQUFMLENBQVMsUUFBVCxFQUFtQnJJLE9BQW5CLEVBQTRCLElBQTVCO0FBQ0gsYUFGRCxNQUdLO0FBQ0Qsc0JBQU0sSUFBSXNDLEtBQUosQ0FBVXRDLE9BQVYsQ0FBTjtBQUNIO0FBQ0o7QUFDSixLQXBCb0I7O0FBQUEsU0FxQnJCbUYsS0FyQnFCLEdBcUJiLG1CQUFXO0FBQ2YsY0FBS29DLE9BQUwsQ0FBYXBDLEtBQWIsR0FBcUIsTUFBS2tELEdBQUwsQ0FBUyxPQUFULEVBQWtCckksT0FBbEIsQ0FBckIsR0FBa0QsSUFBbEQ7QUFDSCxLQXZCb0I7O0FBQ2pCLFNBQUt1SCxPQUFMLEdBQWVBLE9BQWY7QUFDSCxDOztBQXdCRSxJQUFNc0Isd0NBQWdCLElBQUlULGFBQUosQ0FBa0IsRUFBRWpELE9BQU8sSUFBVCxFQUFsQixDQUF0QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q1AsMkM7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEsMEU7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsbUU7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7Ozs7O0FDQUEsNEU7Ozs7Ozs7Ozs7O0FDQUEsb0U7Ozs7Ozs7Ozs7O0FDQUEseUQ7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7O0FDQUEsZ0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7IGxvZ2dlciwgZmV0Y2hDb250ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgaWNvbnYgZnJvbSAnaWNvbnYtbGl0ZSc7XHJcbmltcG9ydCB7IHBhcnNlIGFzIF9wYXJzZSB9IGZyb20gJ2JhYnlsb24nO1xyXG5pbXBvcnQge1xyXG4gICAgRmluYW1JbXBvcnRFcnJvcixcclxuICAgIEZpbmFtRG93bmxvYWRFcnJvcixcclxuICAgIEZpbmFtVGhyb3R0bGluZ0Vycm9yLFxyXG4gICAgRmluYW1QYXJzaW5nRXJyb3IsXHJcbiAgICBGaW5hbU9iamVjdE5vdEZvdW5kRXJyb3IsXHJcbiAgICBGaW5hbVRvb0xvbmdUaW1lZnJhbWVFcnJvcixcclxufSBmcm9tICcuL2V4Y2VwdGlvbic7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG5jb25zdCBhc3NlcnQgPSBsb2dnZXIuYXNzZXJ0O1xyXG5cclxuLyoqXHJcbiAqINCe0LHQtdGB0L/QtdGH0LjQstCw0LXRgiDQv9C+0LvRg9GH0LXQvdC40LUg0LzQtdGC0LDQtNCw0L3QvdGL0YUg0YEg0YHQsNC50YLQsCDRhNC40L3QsNC8LiBbXHJcbiAqIGFFbWl0ZW50SWRzXHJcbiAqIGFFbWl0ZW50TmFtZXNcclxuICogYUVtaXRlbnRDb2Rlc1xyXG4gKiBhRW1pdGVudE1hcmtldHNcclxuICogYUVtaXRlbnREZWNwXHJcbiAqIGFEYXRhRm9ybWF0U3Ryc1xyXG4gKiBhRW1pdGVudENoaWxkXHJcbiAqIGFFbWl0ZW50VXJsc11cclxuICpcclxuICogQGNsYXNzIE1ldGFkYXRhXHJcbiAqL1xyXG5jbGFzcyBNZXRhZGF0YSB7XHJcbiAgICBmaW5hbVVybCA9ICdodHRwczovL3d3dy5maW5hbS5ydS9jYWNoZS9pY2hhcnRzL2ljaGFydHMuanMnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QsNGA0YHQuNGCINC40YHRhdC+0LTQvdGL0Lkg0LrQvtC0IGpzINC90LDRhdC+0LTQuNGCINCy0YHQtSDQvtCx0Y/QstC70LXQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLINGC0LjQv9CwOiBb0LzQsNGB0YHQuNCyIHwg0L7QsdGK0LXQutGCXVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dENvZGUg0JjRgdGF0L7QtNC90YvQuSDQutC+0LQg0L3QsCBqc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PG9iamVjdD59INCc0LDRgdGB0LjQsiDQsNC70LXQvNC10L3RgtC+0LIge25hbWUsIHZhbHVlfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIHBhcnNlID0gdGV4dENvZGUgPT4ge1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICF0ZXh0Q29kZSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgdGV4dENvZGUgIT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgICAgIHRleHRDb2RlLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1JbXBvcnRFcnJvcign0J3QtdGCINC00LDQvdC90YvRhScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFzdCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGFzdCA9IF9wYXJzZSh0ZXh0Q29kZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFzdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbVBhcnNpbmdFcnJvcihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKCFhc3QgfHwgYXN0LnByb2dyYW0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbVBhcnNpbmdFcnJvcign0KPQt9C10LsgYm9keSDQvdC1INC90LDQudC00LXQvScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IGFzdC5wcm9ncmFtLmJvZHk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlRGVjbGFyYXRpb25zID0gYm9keS5maWx0ZXIoXHJcbiAgICAgICAgICAgIG5vZGUgPT5cclxuICAgICAgICAgICAgICAgIG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmtpbmQubWF0Y2goJ2xldHxjb25zdHx2YXInKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghdmFyaWFibGVEZWNsYXJhdGlvbnMgfHwgdmFyaWFibGVEZWNsYXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbVBhcnNpbmdFcnJvcign0KPQt9C10LsgVmFyaWFibGVEZWNsYXJhdGlvbiDQvdC1INC90LDQudC00LXQvScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVjbGFyYXRpb25zID0gdmFyaWFibGVEZWNsYXJhdGlvbnNcclxuICAgICAgICAgICAgLm1hcCh2YXJEZWMgPT4gdmFyRGVjLmRlY2xhcmF0aW9ucylcclxuICAgICAgICAgICAgLnJlZHVjZSgocmVzLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAuLi5jdXJyLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0b3InICYmIGl0ZW0uaW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGlmICghZGVjbGFyYXRpb25zIHx8IGRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEZpbmFtUGFyc2luZ0Vycm9yKCfQo9C30LXQuyBkZWNsYXJhdGlvbnMg0L3QtSDQvdCw0LnQtNC10L0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHZhcnMgPSBbXTsgICAgLy8g0JzQsNGB0YHQuNCyINGA0LDRgdC/0L7Qt9C90LDQvdC90YvRhSDQvtCx0YrQtdC60YLQvtCyXHJcbiAgICAgICAgZGVjbGFyYXRpb25zLmZvckVhY2goZGVjID0+IHtcclxuICAgICAgICAgICAgaWYgKGRlYy5pbml0LnR5cGUgPT09ICdBcnJheUV4cHJlc3Npb24nICYmIGRlYy5pbml0LmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZWMuaWQubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC5lbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUubWF0Y2goL0xpdGVyYWwkLykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChpdGVtLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIGRlYy5pbml0LnR5cGUgPT09ICdPYmplY3RFeHByZXNzaW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgZGVjLmluaXQucHJvcGVydGllc1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge307XHJcbiAgICAgICAgICAgICAgICB2YXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlYy5pZC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRlYy5pbml0LnByb3BlcnRpZXMuZm9yRWFjaChwcm9wSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BJdGVtLnR5cGUubWF0Y2goL1Byb3BlcnR5JC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW3Byb3BJdGVtLmtleS5uYW1lXSA9IHByb3BJdGVtLnZhbHVlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFzc2VydCh2YXJzLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gdmFycztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodC60LDRh9C40LLQsNC10YIg0LjRgdGF0L7QtNC90YvQuSDRhNCw0LnQuyDQvNC10YLQsNC00LDQvdC90YvQtdGFICguanMpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaENvbnRlbnQoXHJcbiAgICAgICAgICAgIHRoaXMuZmluYW1VcmwsXHJcbiAgICAgICAgICAgIGljb252LmRlY29kZVN0cmVhbSgnd2luMTI1MScpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZU1ldGFkYXRhID0gKG1ldGEpID0+IHtcclxuICAgICAgICBmcy53cml0ZUZpbGUoJ21ldGFkYXRhLnR4dCcsIG1ldGEsIGVyciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWV0YWRhdGE7XHJcbiIsIi8vI3JlZ2lvbiAgRXhwb3J0IEVycm9yc1xyXG5cclxuY2xhc3MgRmluYW1JbXBvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmluYW1Eb3dubG9hZEVycm9yIGV4dGVuZHMgRmluYW1JbXBvcnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZpbmFtUGFyc2luZ0Vycm9yIGV4dGVuZHMgRmluYW1JbXBvcnRFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuZXhwb3J0IHtcclxuICAgIEZpbmFtSW1wb3J0RXJyb3IsXHJcbiAgICBGaW5hbURvd25sb2FkRXJyb3IsXHJcbiAgICBGaW5hbVBhcnNpbmdFcnJvcixcclxufSIsImltcG9ydCB7IGxvZ2dlciwgZmV0Y2hDb250ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgVGltZWZyYW1lIGZyb20gJy4vdGltZWZyYW1lJztcclxuaW1wb3J0IHtVUkwsIFVSTFNlYXJjaFBhcmFtc30gZnJvbSAndXJsJztcclxuaW1wb3J0IE1ldGFkYXRhIGZyb20gJy4vTWV0YWRhdGEnO1xyXG5cclxuY29uc3QgYXNzZXJ0ID0gbG9nZ2VyLmFzc2VydDtcclxuXHJcbmNvbnN0IExvb2t1cENvbXBhcmF0b3IgPSB7XHJcbiAgICBFUVVBTFM6IDEsXHJcbiAgICBTVEFSVFNXSVRIOiAyLFxyXG4gICAgQ09OVEFJTlM6IDNcclxufTtcclxuXHJcbmNsYXNzIEltcG9ydGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGhvc3QgPSAnZXhwb3J0LmZpbmFtLnJ1Jykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaG9zdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXJsX3BhcmFtcyA9IHtcclxuICAgICAgICBkOiAnZCcsXHJcbiAgICAgICAgZjogJ3RhYmxlJyxcclxuICAgICAgICBlOiAnLmNzdicsXHJcbiAgICAgICAgZHRmOiAnMScsXHJcbiAgICAgICAgdG1mOiAnMycsXHJcbiAgICAgICAgTVNPUjogJzAnLFxyXG4gICAgICAgIG1zdGltZTogJ29uJyxcclxuICAgICAgICBtc3RpbWV2ZXI6ICcxJyxcclxuICAgICAgICBzZXA6ICczJyxcclxuICAgICAgICBzZXAyOiAnMScsXHJcbiAgICAgICAgYXQ6ICcxJ1xyXG4gICAgfTtcclxuXHJcbiAgICBkb3dubG9hZCA9IGFzeW5jIChcclxuICAgICAgICBpZD0xNjg0MixcclxuICAgICAgICBtYXJrZXQ9MSxcclxuICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgyMDA3LCAxLCAxKSxcclxuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKSxcclxuICAgICAgICB0aW1lZnJhbWUgPSBUaW1lZnJhbWUuREFJTFlcclxuICAgICkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBjb2RlID0gJ0dBWlAnO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIHA6IHRpbWVmcmFtZS52YWx1ZSxcclxuICAgICAgICAgICAgZW06IGlkLFxyXG4gICAgICAgICAgICBtYXJrZXQ6IG1hcmtldC52YWx1ZSxcclxuICAgICAgICAgICAgZGY6IHN0YXJ0RGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgICAgIG1mOiBzdGFydERhdGUuZ2V0TW9udGgoKSAtIDEsXHJcbiAgICAgICAgICAgIHlmOiBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgZHQ6IGVuZERhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtdDogZW5kRGF0ZS5nZXRNb250aCgpIC0gMSxcclxuICAgICAgICAgICAgeXQ6IGVuZERhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgY246IGNvZGUsXHJcbiAgICAgICAgICAgIGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICAgIGRhdGY6IHRpbWVmcmFtZSA9PT0gVGltZWZyYW1lLlRJQ0tTID8gNiA6IDVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkVXJsKHBhcmFtcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaENvbnRlbnQodXJsKTtcclxuXHJcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgYnVpbGRVcmwgPSBwYXJhbXMgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgICAgLi4udGhpcy51cmxfcGFyYW1zLFxyXG4gICAgICAgICAgICAuLi5wYXJhbXNcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBhc3NlcnQoc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgaHR0cDovLyR7dGhpcy5ob3N0fWApO1xyXG4gICAgICAgIHVybC5wcm90b2NvbCA9ICdodHRwOicsIFxyXG4gICAgICAgIHVybC5ob3N0ID0gdGhpcy5ob3N0O1xyXG4gICAgICAgIHVybC5wYXRobmFtZSA9ICd0YWJsZS5jc3YnO1xyXG4gICAgICAgIC8vdXJsLnNlYXJjaCA9IHNlYXJjaDtcclxuICAgICAgICB1cmwuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9O1xyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1wb3J0ZXI7XHJcbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBJbXBvcnRlcn0gZnJvbSAnLi9pbXBvcnRlcic7XHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBNZXRhZGF0YX0gZnJvbSAnLi9NZXRhZGF0YSc7XHJcblxyXG4iLCJjb25zdCB0aW1lZnJhbWUgPSB7XHJcbiAgICBUSUNLUzogMSxcclxuICAgIE1JTlVURVMxOiAyLFxyXG4gICAgTUlOVVRFUzU6IDMsXHJcbiAgICBNSU5VVEVTMTA6IDQsXHJcbiAgICBNSU5VVEVTMTU6IDUsXHJcbiAgICBNSU5VVEVTMzA6IDYsXHJcbiAgICBIT1VSTFk6IDcsXHJcbiAgICBEQUlMWTogOCxcclxuICAgIFdFRUtMWTogOSxcclxuICAgIE1PTlRITFk6IDEwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aW1lZnJhbWU7IiwiaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7SW1wb3J0ZXIsIE1ldGFkYXRhIH0gZnJvbSAnLi9maW5hbS9pbXBvcnRlci9pbmRleCc7XHJcblxyXG5jb25zdCB0ZXN0TWV0YWRhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsb2dnZXIuZGVidWcodHlwZW9mIE1ldGFkYXRhKTtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBNZXRhZGF0YSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcGFyc2VyLmRvd25sb2FkKCk7XHJcbiAgICAgICAgY29uc3QgdmFycyA9IHBhcnNlci5wYXJzZShkYXRhKTtcclxuICAgICAgICBwYXJzZXIuc2F2ZU1ldGFkYXRhKGRhdGEpO1xyXG4gICAgICAgIHZhcnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgLy9pZiAoQXJyYXkuaXNBcnJheShpdGVtLnZhbHVlKSl7XHJcbiAgICAgICAgICAgIC8vICAgIGxvZ2dlci5kZWJ1Zyh7W2l0ZW0ubmFtZV06IGl0ZW0udmFsdWUuc2xpY2UoMCw1KX0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIC8vY29uc3QgY29kZSA9IHBhcnNlci5wYXJzZSgndmFyIGRhdGEgPSBbMSwyLDNdLCBvYmogPSB7bm06IFwiSWdvclwifSwgdHN0PTM7IHZhciB2Mz1cImZmZlwiLCB2TnVsbCcpO1xyXG59O1xyXG5cclxuY29uc3QgdGVzdEltcG9ydGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgSW1wb3J0ZXIoKTtcclxuXHJcbiAgICBpbXBvcnRlci5kb3dubG9hZCgpXHJcbn1cclxuXHJcbnRlc3RNZXRhZGF0YSgpO1xyXG4vL3Rlc3RJbXBvcnRlcigpO1xyXG5cclxuIiwiaW1wb3J0IHsgY29uc29sZUxvZ2dlciBhcyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xyXG5pbXBvcnQgaWNvbnYgZnJvbSAnaWNvbnYtbGl0ZSc7XHJcblxyXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tICdzdHJpbmdfZGVjb2Rlcic7XHJcblxyXG5jb25zdCBmZXRjaENvbnRlbnQgPSAodXJsKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4gcmVzLmJ1ZmZlcigpKS50aGVuKGJ1ZmZlciA9PiBpY29udi5kZWNvZGUoYnVmZmVyLCd3aW4xMjUxJykpLnRoZW4odGV4dCA9PiByZXNvbHZlKHRleHQpKS5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG5jb25zdCBmZXRjaENvbnRlbnRfID0gKHVybCwgY29udmVydGVyU3RyZWFtID0gaWNvbnYuZGVjb2RlU3RyZWFtKCd3aW4xMjUxJykpID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsQnVpbGRlciA9IG5ldyBVUkwodXJsKTtcclxuICAgICAgICBsb2dnZXIuZGVidWcodXJsQnVpbGRlci5ocmVmKTtcclxuICAgICAgICBjb25zdCBsaWIgPVxyXG4gICAgICAgICAgICB1cmxCdWlsZGVyLnByb3RvY29sID09PSAnaHR0cHM6J1xyXG4gICAgICAgICAgICAgICAgPyBodHRwc1xyXG4gICAgICAgICAgICAgICAgOiBodHRwXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcHJvdG9jb2w6IHVybEJ1aWxkZXIucHJvdG9jb2wsXHJcbiAgICAgICAgICAgIGhvc3Q6IHVybEJ1aWxkZXIuaG9zdCxcclxuICAgICAgICAgICAgcGF0aDogdXJsQnVpbGRlci5wYXRobmFtZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAvL2hlYWRlcnM6IHtcclxuICAgICAgICAgICAgLy8gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0J1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaGVhZGVyczogeyBcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82Ny4wLjMzOTYuOTkgU2FmYXJpLzUzNy4zNicsXHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICd0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44JyxcclxuICAgICAgICAgICAgICAgICdBY2NlcHQtRW5jb2RpbmcnOiAnZ3ppcCwgZGVmbGF0ZScsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0LUxhbmd1YWdlJzogJ3J1LVJVLHJ1O3E9MC45LGVuLVVTO3E9MC44LGVuO3E9MC43J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsb2dnZXIuZGVidWcoSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBsaWIuZ2V0KG9wdGlvbnMsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA8IDIwMCB8fCByZXMuc3RhdHVzQ29kZSA+IDI5OSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YssINC60L7QtCDQvtGI0LjQsdC60Lg6ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGVcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBbXTtcclxuICAgICAgICAgICAgY29uc3Qgc3RyZWFtID1cclxuICAgICAgICAgICAgICAgIGNvbnZlcnRlclN0cmVhbSAhPT0gdW5kZWZpbmVkICYmIGNvbnZlcnRlclN0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgID8gY29udmVydGVyU3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgOiByZXM7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0gPT09IGNvbnZlcnRlclN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnBpcGUoY29udmVydGVyU3RyZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJlYW0ub24oJ2RhdGEnLCBjaHVuayA9PiBib2R5LnB1c2goY2h1bmspKTtcclxuICAgICAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYm9keS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zyhg0JTQsNC90L3Ri9C1INC30LDQs9GA0YPQttC10L3Riy4gJHtkYXRhLmxlbmd0aH0g0YHQuNC80LLQvtC70L7QsmApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxdWVzdC5vbignZXJyb3InLCBlcnIgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgZmV0Y2hDb250ZW50IH07XHJcbiIsImltcG9ydCB7IGNvbnNvbGVMb2dnZXIgYXMgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBmZXRjaENvbnRlbnQgfSBmcm9tICcuL2h0dHAnO1xyXG5cclxuZXhwb3J0IHsgbG9nZ2VyLCBmZXRjaENvbnRlbnQgfTtcclxuIiwiLy9pbXBvcnQgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nO1xyXG4vL1xyXG4vL2NvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih7XHJcbi8vICAgIHRyYW5zcG9ydHM6IFtcclxuLy8gICAgICAgIG5ldyB0cmFuc3BvcnRzLkNvbnNvbGUoe1xyXG4vLyAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWVcclxuLy8gICAgICAgIH0pXHJcbi8vICAgIF0sXHJcbi8vICAgIGV4aXRPbkVycm9yOiBmYWxzZVxyXG4vL30pO1xyXG5cclxuY2xhc3MgQ29uc29sZUxvZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBsb2cgPSAobGV2ZWwsIG1lc3NhZ2UsIHRyYWNlPWZhbHNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3MgPSB0cmFjZSA/IGNvbnNvbGUudHJhY2UgOiBjb25zb2xlLmxvZztcclxuICAgICAgICBvcyhgWyR7bGV2ZWx9XTogJHttZXNzYWdlfWApO1xyXG4gICAgfTtcclxuICAgIGluZm8gPSBtZXNzYWdlID0+IHRoaXMubG9nKCdpbmZvJywgbWVzc2FnZSk7XHJcbiAgICB3YXJuID0gbWVzc2FnZSA9PiB0aGlzLmxvZygnd2FybicsIG1lc3NhZ2UpO1xyXG4gICAgZXJyb3IgPSBtZXNzYWdlID0+IHRoaXMubG9nKCdlcnJvcicsIG1lc3NhZ2UpO1xyXG4gICAgYXNzZXJ0ID0gKGNvbmRpdGlvbiwgbWVzc2FnZT1g0JLQndCY0JzQkNCd0JjQlSEg0KLQtdGB0YIg0L3QtSDQv9GA0L7QudC00LXQvSA6ICR7SlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uKX1gKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjb25kaXRpb24pe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdhc3NlcnQnLCBtZXNzYWdlLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGRlYnVnID0gbWVzc2FnZSA9PiB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlYnVnID8gdGhpcy5sb2coJ2RlYnVnJywgbWVzc2FnZSkgOiBudWxsO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnNvbGVMb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcih7IGRlYnVnOiB0cnVlIH0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJ5bG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaWNvbnYtbGl0ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmluZ19kZWNvZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiXSwic291cmNlUm9vdCI6IiJ9