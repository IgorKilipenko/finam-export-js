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
    this.upload = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    this.saveMetadata = function (meta) {
        var dir = './udata';
        if (!_fs2.default.existsSync(dir)) {
            _fs2.default.mkdirSync(dir);
        }
        _fs2.default.writeFile(dir + '/metadata.js', meta, function (err) {
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

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils/index.js");

var _index = __webpack_require__(/*! ./finam/importer/index */ "./src/finam/importer/index.js");

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testMetadata = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var parser, data, vars;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        parser = new _index.Metadata();
                        _context.prev = 1;
                        _context.next = 4;
                        return parser.download();

                    case 4:
                        data = _context.sent;
                        vars = parser.parse(data);

                        parser.saveMetadata(data);
                        vars.forEach(function (item) {
                            _utils.logger.debug(item.name);
                        });
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](1);

                        _utils.logger.error(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 10]]);
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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL01ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL2ltcG9ydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmluYW0vaW1wb3J0ZXIvdGltZWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaHR0cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJ5bG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpY29udi1saXRlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS1mZXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHJpbmdfZGVjb2RlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIl0sIm5hbWVzIjpbImFzc2VydCIsImxvZ2dlciIsIk1ldGFkYXRhIiwiZmluYW1VcmwiLCJwYXJzZSIsInRleHRDb2RlIiwibGVuZ3RoIiwiRmluYW1JbXBvcnRFcnJvciIsImFzdCIsImVyciIsIkZpbmFtUGFyc2luZ0Vycm9yIiwibWVzc2FnZSIsInByb2dyYW0iLCJ1bmRlZmluZWQiLCJib2R5IiwidmFyaWFibGVEZWNsYXJhdGlvbnMiLCJmaWx0ZXIiLCJub2RlIiwidHlwZSIsImtpbmQiLCJtYXRjaCIsImRlY2xhcmF0aW9ucyIsIm1hcCIsInZhckRlYyIsInJlZHVjZSIsInJlcyIsImN1cnIiLCJwdXNoIiwiaXRlbSIsImluaXQiLCJ2YXJzIiwiZm9yRWFjaCIsImRlYyIsImVsZW1lbnRzIiwidmFsdWUiLCJuYW1lIiwiaWQiLCJwcm9wZXJ0aWVzIiwicHJvcEl0ZW0iLCJrZXkiLCJkb3dubG9hZCIsImljb252IiwiZGVjb2RlU3RyZWFtIiwiZGF0YSIsInVwbG9hZCIsInNhdmVNZXRhZGF0YSIsIm1ldGEiLCJkaXIiLCJmcyIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJ3cml0ZUZpbGUiLCJlcnJvciIsIkVycm9yIiwiRmluYW1Eb3dubG9hZEVycm9yIiwiTG9va3VwQ29tcGFyYXRvciIsIkVRVUFMUyIsIlNUQVJUU1dJVEgiLCJDT05UQUlOUyIsIkltcG9ydGVyIiwiaG9zdCIsInVybF9wYXJhbXMiLCJkIiwiZiIsImUiLCJkdGYiLCJ0bWYiLCJNU09SIiwibXN0aW1lIiwibXN0aW1ldmVyIiwic2VwIiwic2VwMiIsImF0IiwibWFya2V0Iiwic3RhcnREYXRlIiwiRGF0ZSIsImVuZERhdGUiLCJ0aW1lZnJhbWUiLCJUaW1lZnJhbWUiLCJEQUlMWSIsImNvZGUiLCJwYXJhbXMiLCJwIiwiZW0iLCJkZiIsImdldERhdGUiLCJtZiIsImdldE1vbnRoIiwieWYiLCJnZXRGdWxsWWVhciIsImR0IiwibXQiLCJ5dCIsImNuIiwiZGF0ZiIsIlRJQ0tTIiwidXJsIiwiYnVpbGRVcmwiLCJkZWJ1ZyIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInRvU3RyaW5nIiwiVVJMIiwicHJvdG9jb2wiLCJwYXRobmFtZSIsInNlYXJjaCIsImRlZmF1bHQiLCJNSU5VVEVTMSIsIk1JTlVURVM1IiwiTUlOVVRFUzEwIiwiTUlOVVRFUzE1IiwiTUlOVVRFUzMwIiwiSE9VUkxZIiwiV0VFS0xZIiwiTU9OVEhMWSIsInRlc3RNZXRhZGF0YSIsInBhcnNlciIsInRlc3RJbXBvcnRlciIsImltcG9ydGVyIiwiZmV0Y2hDb250ZW50IiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJidWZmZXIiLCJkZWNvZGUiLCJ0ZXh0IiwiY2F0Y2giLCJmZXRjaENvbnRlbnRfIiwiY29udmVydGVyU3RyZWFtIiwidXJsQnVpbGRlciIsImhyZWYiLCJsaWIiLCJodHRwcyIsImh0dHAiLCJvcHRpb25zIiwicGF0aCIsImFnZW50IiwiaGVhZGVycyIsIkFjY2VwdCIsInJlcXVlc3QiLCJnZXQiLCJzdGF0dXNDb2RlIiwic3RyZWFtIiwicGlwZSIsIm9uIiwiY2h1bmsiLCJqb2luIiwiQ29uc29sZUxvZ2dlciIsImxvZyIsImxldmVsIiwidHJhY2UiLCJvcyIsImNvbnNvbGUiLCJpbmZvIiwid2FybiIsImNvbmRpdGlvbiIsImNvbnNvbGVMb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBUUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLGNBQU9ELE1BQXRCOztBQUVBOzs7Ozs7Ozs7Ozs7OztJQWFNRSxROzs7O1NBQ0ZDLFEsR0FBVywrQzs7U0FTWEMsSyxHQUFRLG9CQUFZOztBQUVoQixZQUNJLENBQUNDLFFBQUQsSUFD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O0FBQ0osS0FwQm9COztBQUFBLFNBcUJyQnVGLEtBckJxQixHQXFCYixtQkFBVztBQUNmLGNBQUtvQyxPQUFMLENBQWFwQyxLQUFiLEdBQXFCLE1BQUtrRCxHQUFMLENBQVMsT0FBVCxFQUFrQnpJLE9BQWxCLENBQXJCLEdBQWtELElBQWxEO0FBQ0gsS0F2Qm9COztBQUNqQixTQUFLMkgsT0FBTCxHQUFlQSxPQUFmO0FBQ0gsQzs7QUF3QkUsSUFBTXNCLHdDQUFnQixJQUFJVCxhQUFKLENBQWtCLEVBQUVqRCxPQUFPLElBQVQsRUFBbEIsQ0FBdEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENQLDJDOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLDBFOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG1FOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLDJEOzs7Ozs7Ozs7OztBQ0FBLDRFOzs7Ozs7Ozs7OztBQ0FBLG9FOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IGljb252IGZyb20gJ2ljb252LWxpdGUnO1xyXG5pbXBvcnQgeyBwYXJzZSBhcyBfcGFyc2UgfSBmcm9tICdiYWJ5bG9uJztcclxuaW1wb3J0IHtcclxuICAgIEZpbmFtSW1wb3J0RXJyb3IsXHJcbiAgICBGaW5hbURvd25sb2FkRXJyb3IsXHJcbiAgICBGaW5hbVRocm90dGxpbmdFcnJvcixcclxuICAgIEZpbmFtUGFyc2luZ0Vycm9yLFxyXG4gICAgRmluYW1PYmplY3ROb3RGb3VuZEVycm9yLFxyXG4gICAgRmluYW1Ub29Mb25nVGltZWZyYW1lRXJyb3IsXHJcbn0gZnJvbSAnLi9leGNlcHRpb24nO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5cclxuY29uc3QgYXNzZXJ0ID0gbG9nZ2VyLmFzc2VydDtcclxuXHJcbi8qKlxyXG4gKiDQntCx0LXRgdC/0LXRh9C40LLQsNC10YIg0L/QvtC70YPRh9C10L3QuNC1INC80LXRgtCw0LTQsNC90L3Ri9GFINGBINGB0LDQudGC0LAg0YTQuNC90LDQvC4gW1xyXG4gKiBhRW1pdGVudElkc1xyXG4gKiBhRW1pdGVudE5hbWVzXHJcbiAqIGFFbWl0ZW50Q29kZXNcclxuICogYUVtaXRlbnRNYXJrZXRzXHJcbiAqIGFFbWl0ZW50RGVjcFxyXG4gKiBhRGF0YUZvcm1hdFN0cnNcclxuICogYUVtaXRlbnRDaGlsZFxyXG4gKiBhRW1pdGVudFVybHNdXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRhZGF0YVxyXG4gKi9cclxuY2xhc3MgTWV0YWRhdGEge1xyXG4gICAgZmluYW1VcmwgPSAnaHR0cHM6Ly93d3cuZmluYW0ucnUvY2FjaGUvaWNoYXJ0cy9pY2hhcnRzLmpzJztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0LDRgNGB0LjRgiDQuNGB0YXQvtC00L3Ri9C5INC60L7QtCBqcyDQvdCw0YXQvtC00LjRgiDQstGB0LUg0L7QsdGP0LLQu9C10L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRiyDRgtC40L/QsDogW9C80LDRgdGB0LjQsiB8INC+0LHRitC10LrRgl1cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRDb2RlINCY0YHRhdC+0LTQvdGL0Lkg0LrQvtC0INC90LAganNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxvYmplY3Q+fSDQnNCw0YHRgdC40LIg0LDQu9C10LzQtdC90YLQvtCyIHtuYW1lLCB2YWx1ZX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwYXJzZSA9IHRleHRDb2RlID0+IHtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhdGV4dENvZGUgfHxcclxuICAgICAgICAgICAgdHlwZW9mIHRleHRDb2RlICE9PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgICB0ZXh0Q29kZS5sZW5ndGggPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEZpbmFtSW1wb3J0RXJyb3IoJ9Cd0LXRgiDQtNCw0L3QvdGL0YUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhc3QgPSBudWxsO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhc3QgPSBfcGFyc2UodGV4dENvZGUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhc3QgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmICghYXN0IHx8IGFzdC5wcm9ncmFtID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoJ9Cj0LfQtdC7IGJvZHkg0L3QtSDQvdCw0LnQtNC10L0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhc3QucHJvZ3JhbS5ib2R5O1xyXG5cclxuICAgICAgICBjb25zdCB2YXJpYWJsZURlY2xhcmF0aW9ucyA9IGJvZHkuZmlsdGVyKFxyXG4gICAgICAgICAgICBub2RlID0+XHJcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgbm9kZS5raW5kLm1hdGNoKCdsZXR8Y29uc3R8dmFyJylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXZhcmlhYmxlRGVjbGFyYXRpb25zIHx8IHZhcmlhYmxlRGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRmluYW1QYXJzaW5nRXJyb3IoJ9Cj0LfQtdC7IFZhcmlhYmxlRGVjbGFyYXRpb24g0L3QtSDQvdCw0LnQtNC10L0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlY2xhcmF0aW9ucyA9IHZhcmlhYmxlRGVjbGFyYXRpb25zXHJcbiAgICAgICAgICAgIC5tYXAodmFyRGVjID0+IHZhckRlYy5kZWNsYXJhdGlvbnMpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHJlcywgY3VycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY3Vyci5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPT4gaXRlbS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJyAmJiBpdGVtLmluaXRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICBpZiAoIWRlY2xhcmF0aW9ucyB8fCBkZWNsYXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbVBhcnNpbmdFcnJvcign0KPQt9C10LsgZGVjbGFyYXRpb25zINC90LUg0L3QsNC50LTQtdC9Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB2YXJzID0gW107ICAgIC8vINCc0LDRgdGB0LjQsiDRgNCw0YHQv9C+0LfQvdCw0L3QvdGL0YUg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlYyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkZWMuaW5pdC50eXBlID09PSAnQXJyYXlFeHByZXNzaW9uJyAmJiBkZWMuaW5pdC5lbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVjLmlkLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGVjLmluaXQuZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlLm1hdGNoKC9MaXRlcmFsJC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC50eXBlID09PSAnT2JqZWN0RXhwcmVzc2lvbicgJiZcclxuICAgICAgICAgICAgICAgIGRlYy5pbml0LnByb3BlcnRpZXNcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFycy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZWMuaWQubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC5wcm9wZXJ0aWVzLmZvckVhY2gocHJvcEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wSXRlbS50eXBlLm1hdGNoKC9Qcm9wZXJ0eSQvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtwcm9wSXRlbS5rZXkubmFtZV0gPSBwcm9wSXRlbS52YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhc3NlcnQodmFycy5sZW5ndGggPiAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZhcnM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQutCw0YfQuNCy0LDQtdGCINC40YHRhdC+0LTQvdGL0Lkg0YTQsNC50Lsg0LzQtdGC0LDQtNCw0L3QvdGL0LXRhSAoLmpzKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBkb3dubG9hZCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hDb250ZW50KFxyXG4gICAgICAgICAgICB0aGlzLmZpbmFtVXJsLFxyXG4gICAgICAgICAgICBpY29udi5kZWNvZGVTdHJlYW0oJ3dpbjEyNTEnKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwbG9hZCA9IGFzeW5jICgpID0+IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZU1ldGFkYXRhID0gKG1ldGEpID0+IHtcclxuICAgICAgICBjb25zdCBkaXIgPSAnLi91ZGF0YSc7XHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpe1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMud3JpdGVGaWxlKGAke2Rpcn0vbWV0YWRhdGEuanNgLCBtZXRhLCBlcnIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldGFkYXRhO1xyXG4iLCIvLyNyZWdpb24gIEV4cG9ydCBFcnJvcnNcclxuXHJcbmNsYXNzIEZpbmFtSW1wb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZpbmFtRG93bmxvYWRFcnJvciBleHRlbmRzIEZpbmFtSW1wb3J0RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBGaW5hbVBhcnNpbmdFcnJvciBleHRlbmRzIEZpbmFtSW1wb3J0RXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyNlbmRyZWdpb25cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBGaW5hbUltcG9ydEVycm9yLFxyXG4gICAgRmluYW1Eb3dubG9hZEVycm9yLFxyXG4gICAgRmluYW1QYXJzaW5nRXJyb3IsXHJcbn0iLCJpbXBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IFRpbWVmcmFtZSBmcm9tICcuL3RpbWVmcmFtZSc7XHJcbmltcG9ydCB7VVJMLCBVUkxTZWFyY2hQYXJhbXN9IGZyb20gJ3VybCc7XHJcbmltcG9ydCBNZXRhZGF0YSBmcm9tICcuL01ldGFkYXRhJztcclxuXHJcbmNvbnN0IGFzc2VydCA9IGxvZ2dlci5hc3NlcnQ7XHJcblxyXG5jb25zdCBMb29rdXBDb21wYXJhdG9yID0ge1xyXG4gICAgRVFVQUxTOiAxLFxyXG4gICAgU1RBUlRTV0lUSDogMixcclxuICAgIENPTlRBSU5TOiAzXHJcbn07XHJcblxyXG5jbGFzcyBJbXBvcnRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0ID0gJ2V4cG9ydC5maW5hbS5ydScpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGhvc3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVybF9wYXJhbXMgPSB7XHJcbiAgICAgICAgZDogJ2QnLFxyXG4gICAgICAgIGY6ICd0YWJsZScsXHJcbiAgICAgICAgZTogJy5jc3YnLFxyXG4gICAgICAgIGR0ZjogJzEnLFxyXG4gICAgICAgIHRtZjogJzMnLFxyXG4gICAgICAgIE1TT1I6ICcwJyxcclxuICAgICAgICBtc3RpbWU6ICdvbicsXHJcbiAgICAgICAgbXN0aW1ldmVyOiAnMScsXHJcbiAgICAgICAgc2VwOiAnMycsXHJcbiAgICAgICAgc2VwMjogJzEnLFxyXG4gICAgICAgIGF0OiAnMSdcclxuICAgIH07XHJcblxyXG4gICAgZG93bmxvYWQgPSBhc3luYyAoXHJcbiAgICAgICAgaWQ9MTY4NDIsXHJcbiAgICAgICAgbWFya2V0PTEsXHJcbiAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoMjAwNywgMSwgMSksXHJcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgdGltZWZyYW1lID0gVGltZWZyYW1lLkRBSUxZXHJcbiAgICApID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgY29kZSA9ICdHQVpQJztcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBwOiB0aW1lZnJhbWUudmFsdWUsXHJcbiAgICAgICAgICAgIGVtOiBpZCxcclxuICAgICAgICAgICAgbWFya2V0OiBtYXJrZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRmOiBzdGFydERhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtZjogc3RhcnREYXRlLmdldE1vbnRoKCkgLSAxLFxyXG4gICAgICAgICAgICB5Zjogc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIGR0OiBlbmREYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbXQ6IGVuZERhdGUuZ2V0TW9udGgoKSAtIDEsXHJcbiAgICAgICAgICAgIHl0OiBlbmREYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIGNuOiBjb2RlLFxyXG4gICAgICAgICAgICBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgICBkYXRmOiB0aW1lZnJhbWUgPT09IFRpbWVmcmFtZS5USUNLUyA/IDYgOiA1XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybChwYXJhbXMpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hDb250ZW50KHVybCk7XHJcblxyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ1aWxkVXJsID0gcGFyYW1zID0+IHtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMudXJsX3BhcmFtcyxcclxuICAgICAgICAgICAgLi4ucGFyYW1zXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYXNzZXJ0KHNlYXJjaFBhcmFtcy50b1N0cmluZygpLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHA6Ly8ke3RoaXMuaG9zdH1gKTtcclxuICAgICAgICB1cmwucHJvdG9jb2wgPSAnaHR0cDonLCBcclxuICAgICAgICB1cmwuaG9zdCA9IHRoaXMuaG9zdDtcclxuICAgICAgICB1cmwucGF0aG5hbWUgPSAndGFibGUuY3N2JztcclxuICAgICAgICAvL3VybC5zZWFyY2ggPSBzZWFyY2g7XHJcbiAgICAgICAgdXJsLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG5cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfTtcclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltcG9ydGVyO1xyXG4iLCJleHBvcnQge2RlZmF1bHQgYXMgSW1wb3J0ZXJ9IGZyb20gJy4vaW1wb3J0ZXInO1xyXG5leHBvcnQge2RlZmF1bHQgYXMgTWV0YWRhdGF9IGZyb20gJy4vTWV0YWRhdGEnO1xyXG5cclxuIiwiY29uc3QgdGltZWZyYW1lID0ge1xyXG4gICAgVElDS1M6IDEsXHJcbiAgICBNSU5VVEVTMTogMixcclxuICAgIE1JTlVURVM1OiAzLFxyXG4gICAgTUlOVVRFUzEwOiA0LFxyXG4gICAgTUlOVVRFUzE1OiA1LFxyXG4gICAgTUlOVVRFUzMwOiA2LFxyXG4gICAgSE9VUkxZOiA3LFxyXG4gICAgREFJTFk6IDgsXHJcbiAgICBXRUVLTFk6IDksXHJcbiAgICBNT05USExZOiAxMFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZWZyYW1lOyIsImltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQge0ltcG9ydGVyLCBNZXRhZGF0YSB9IGZyb20gJy4vZmluYW0vaW1wb3J0ZXIvaW5kZXgnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmNvbnN0IHRlc3RNZXRhZGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBNZXRhZGF0YSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcGFyc2VyLmRvd25sb2FkKCk7XHJcbiAgICAgICAgY29uc3QgdmFycyA9IHBhcnNlci5wYXJzZShkYXRhKTtcclxuICAgICAgICBwYXJzZXIuc2F2ZU1ldGFkYXRhKGRhdGEpO1xyXG4gICAgICAgIHZhcnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHRlc3RJbXBvcnRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGltcG9ydGVyID0gbmV3IEltcG9ydGVyKCk7XHJcblxyXG4gICAgaW1wb3J0ZXIuZG93bmxvYWQoKTtcclxufVxyXG5cclxudGVzdE1ldGFkYXRhKCk7XHJcbnRlc3RJbXBvcnRlcigpO1xyXG5cclxuIiwiaW1wb3J0IHsgY29uc29sZUxvZ2dlciBhcyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xyXG5pbXBvcnQgaWNvbnYgZnJvbSAnaWNvbnYtbGl0ZSc7XHJcblxyXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tICdzdHJpbmdfZGVjb2Rlcic7XHJcblxyXG5jb25zdCBmZXRjaENvbnRlbnQgPSAodXJsKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4gcmVzLmJ1ZmZlcigpKS50aGVuKGJ1ZmZlciA9PiBpY29udi5kZWNvZGUoYnVmZmVyLCd3aW4xMjUxJykpLnRoZW4odGV4dCA9PiByZXNvbHZlKHRleHQpKS5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG5jb25zdCBmZXRjaENvbnRlbnRfID0gKHVybCwgY29udmVydGVyU3RyZWFtID0gaWNvbnYuZGVjb2RlU3RyZWFtKCd3aW4xMjUxJykpID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsQnVpbGRlciA9IG5ldyBVUkwodXJsKTtcclxuICAgICAgICBsb2dnZXIuZGVidWcodXJsQnVpbGRlci5ocmVmKTtcclxuICAgICAgICBjb25zdCBsaWIgPVxyXG4gICAgICAgICAgICB1cmxCdWlsZGVyLnByb3RvY29sID09PSAnaHR0cHM6J1xyXG4gICAgICAgICAgICAgICAgPyBodHRwc1xyXG4gICAgICAgICAgICAgICAgOiBodHRwXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcHJvdG9jb2w6IHVybEJ1aWxkZXIucHJvdG9jb2wsXHJcbiAgICAgICAgICAgIGhvc3Q6IHVybEJ1aWxkZXIuaG9zdCxcclxuICAgICAgICAgICAgcGF0aDogdXJsQnVpbGRlci5wYXRobmFtZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAvL2hlYWRlcnM6IHtcclxuICAgICAgICAgICAgLy8gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0J1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaGVhZGVyczogeyBcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82Ny4wLjMzOTYuOTkgU2FmYXJpLzUzNy4zNicsXHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICd0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44JyxcclxuICAgICAgICAgICAgICAgICdBY2NlcHQtRW5jb2RpbmcnOiAnZ3ppcCwgZGVmbGF0ZScsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0LUxhbmd1YWdlJzogJ3J1LVJVLHJ1O3E9MC45LGVuLVVTO3E9MC44LGVuO3E9MC43J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsb2dnZXIuZGVidWcoSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBsaWIuZ2V0KG9wdGlvbnMsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA8IDIwMCB8fCByZXMuc3RhdHVzQ29kZSA+IDI5OSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YssINC60L7QtCDQvtGI0LjQsdC60Lg6ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGVcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBbXTtcclxuICAgICAgICAgICAgY29uc3Qgc3RyZWFtID1cclxuICAgICAgICAgICAgICAgIGNvbnZlcnRlclN0cmVhbSAhPT0gdW5kZWZpbmVkICYmIGNvbnZlcnRlclN0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgID8gY29udmVydGVyU3RyZWFtXHJcbiAgICAgICAgICAgICAgICAgICAgOiByZXM7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0gPT09IGNvbnZlcnRlclN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnBpcGUoY29udmVydGVyU3RyZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJlYW0ub24oJ2RhdGEnLCBjaHVuayA9PiBib2R5LnB1c2goY2h1bmspKTtcclxuICAgICAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYm9keS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zyhg0JTQsNC90L3Ri9C1INC30LDQs9GA0YPQttC10L3Riy4gJHtkYXRhLmxlbmd0aH0g0YHQuNC80LLQvtC70L7QsmApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxdWVzdC5vbignZXJyb3InLCBlcnIgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgZmV0Y2hDb250ZW50IH07XHJcbiIsImltcG9ydCB7IGNvbnNvbGVMb2dnZXIgYXMgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBmZXRjaENvbnRlbnQgfSBmcm9tICcuL2h0dHAnO1xyXG5cclxuZXhwb3J0IHsgbG9nZ2VyLCBmZXRjaENvbnRlbnQgfTtcclxuIiwiLy9pbXBvcnQgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nO1xyXG4vL1xyXG4vL2NvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih7XHJcbi8vICAgIHRyYW5zcG9ydHM6IFtcclxuLy8gICAgICAgIG5ldyB0cmFuc3BvcnRzLkNvbnNvbGUoe1xyXG4vLyAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWVcclxuLy8gICAgICAgIH0pXHJcbi8vICAgIF0sXHJcbi8vICAgIGV4aXRPbkVycm9yOiBmYWxzZVxyXG4vL30pO1xyXG5cclxuY2xhc3MgQ29uc29sZUxvZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBsb2cgPSAobGV2ZWwsIG1lc3NhZ2UsIHRyYWNlPWZhbHNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3MgPSB0cmFjZSA/IGNvbnNvbGUudHJhY2UgOiBjb25zb2xlLmxvZztcclxuICAgICAgICBvcyhgWyR7bGV2ZWx9XTogJHttZXNzYWdlfWApO1xyXG4gICAgfTtcclxuICAgIGluZm8gPSBtZXNzYWdlID0+IHRoaXMubG9nKCdpbmZvJywgbWVzc2FnZSk7XHJcbiAgICB3YXJuID0gbWVzc2FnZSA9PiB0aGlzLmxvZygnd2FybicsIG1lc3NhZ2UpO1xyXG4gICAgZXJyb3IgPSBtZXNzYWdlID0+IHRoaXMubG9nKCdlcnJvcicsIG1lc3NhZ2UpO1xyXG4gICAgYXNzZXJ0ID0gKGNvbmRpdGlvbiwgbWVzc2FnZT1g0JLQndCY0JzQkNCd0JjQlSEg0KLQtdGB0YIg0L3QtSDQv9GA0L7QudC00LXQvSA6ICR7SlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uKX1gKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjb25kaXRpb24pe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdhc3NlcnQnLCBtZXNzYWdlLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGRlYnVnID0gbWVzc2FnZSA9PiB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlYnVnID8gdGhpcy5sb2coJ2RlYnVnJywgbWVzc2FnZSkgOiBudWxsO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnNvbGVMb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcih7IGRlYnVnOiB0cnVlIH0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJ5bG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaWNvbnYtbGl0ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyaW5nX2RlY29kZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=