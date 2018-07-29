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

var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

        assert(ast && (0, _typeof3.default)(ast.program) !== undefined && (0, _typeof3.default)(ast.program.body) !== undefined, 'Узел body не найден', _exception.FinamParsingError);

        var body = ast.program.body;

        var variableDeclarations = body.filter(function (node) {
            return node.type === 'VariableDeclaration' && node.kind.match('let|const|var');
        });

        assert((typeof variableDeclarations === 'undefined' ? 'undefined' : (0, _typeof3.default)(variableDeclarations)) !== undefined && variableDeclarations.length > 0, 'Узел VariableDeclaration не найден', _exception.FinamParsingError);

        var declarations = variableDeclarations.map(function (varDec) {
            return varDec.declarations;
        }).reduce(function (res, curr) {
            res.push.apply(res, (0, _toConsumableArray3.default)(curr.filter(function (item) {
                return item.type === 'VariableDeclarator' && item.init;
            })));
            return res;
        }, []);

        assert(typeof declarations !== null && declarations.length > 0, 'Узел declarations не найден', _exception.FinamParsingError);

        var vars = {}; // Массив распознанных объектов
        declarations.forEach(function (dec) {
            if (dec.init.type === 'ArrayExpression' && dec.init.elements) {
                var value = [];
                vars[dec.id.name] = value;

                dec.init.elements.forEach(function (item) {
                    if (item.type.match(/Literal$/)) {
                        value.push(item.value);
                    }
                });
            } else if (dec.init.type === 'ObjectExpression' && dec.init.properties) {
                var _value = {};
                vars[dec.id.name] = _value;

                dec.init.properties.forEach(function (propItem) {
                    if (propItem.type.match(/Property$/)) {
                        var key = (0, _typeof3.default)(propItem.key.nam) == undefined ? propItem.key.name : propItem.key.value;
                        _value[key] = propItem.value.value;
                    }
                });
            }
        });

        _this.validateMeta(vars);

        _this.meta = vars;
        return vars;
    };

    this.validateMeta = function (meta) {
        var testNames = ['aEmitentIds', 'aEmitentNames', 'aEmitentCodes', 'aEmitentMarkets', 'aEmitentDecp', 'aDataFormatStrs', 'aEmitentChild', 'aEmitentUrls'];
        var names = (0, _keys2.default)(meta);
        assert(names.length > 0, 'Исходный файл митаданных не содержит переменных', _exception.FinamParsingError);
        testNames.forEach(function (test) {
            assert(names.findIndex(function (name) {
                return name === test;
            }) >= 0, '\u0412 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0435\u0442 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 ' + test, _exception.FinamParsingError);
        });
    };

    this.download = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.fetchContent)(_this.finamUrl, 'win1251');

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
    this.saveMetadata = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var meta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.meta;
        var dir, str;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        assert(meta && (typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) !== undefined);
                        dir = './udata';

                        if (!_fs2.default.existsSync(dir)) {
                            _fs2.default.mkdirSync(dir);
                        }
                        str = (0, _stringify2.default)(meta);
                        _context3.prev = 4;
                        _context3.next = 7;
                        return _utils.fsp.writeFile(dir + '/metadata.json', str);

                    case 7:
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](4);

                        _utils.logger.error(_context3.t0);

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this, [[4, 9]]);
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

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

                        parser.saveMetadata();
                        (0, _keys2.default)(vars).forEach(function (item) {
                            _utils.logger.debug(item);
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
//testImporter();

/***/ }),

/***/ "./src/utils/fsp.js":
/*!**************************!*\
  !*** ./src/utils/fsp.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = function readFile(path) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
    return new _promise2.default(function (res, rej) {
        _fs2.default.readFile(path, opts, function (err, data) {
            if (err) rej(err);else res(data);
        });
    });
};

var writeFile = function writeFile(path, data) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';
    return new _promise2.default(function (res, rej) {
        _fs2.default.writeFile(path, data, opts, function (err) {
            if (err) rej(err);else res();
        });
    });
};

exports.default = {
    readFile: readFile,
    writeFile: writeFile
};

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

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _iconvLite = __webpack_require__(/*! iconv-lite */ "iconv-lite");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _nodeFetch = __webpack_require__(/*! node-fetch */ "node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchContent = function fetchContent(url) {
    var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'win1251';

    return new _promise2.default(function (resolve, reject) {
        (0, _nodeFetch2.default)(url).then(function (res) {
            return res.buffer();
        }).then(function (buffer) {
            return _iconvLite2.default.decode(buffer, enc);
        }).then(function (text) {
            return resolve(text);
        }).catch(function (err) {
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
exports.fsp = exports.fetchContent = exports.logger = undefined;

var _fsp = __webpack_require__(/*! ./fsp */ "./src/utils/fsp.js");

Object.defineProperty(exports, 'fsp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fsp).default;
  }
});

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _http = __webpack_require__(/*! ./http */ "./src/utils/http.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.levels = {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    };

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
        var CustomError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;

        if (!condition) {
            if (_this.options.debug) {
                _this.log('assert', message, true);
            } else {
                throw new CustomError(message);
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

/***/ "babel-runtime/core-js/object/keys":
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

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

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL01ldGFkYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpbmFtL2ltcG9ydGVyL2ltcG9ydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9maW5hbS9pbXBvcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmluYW0vaW1wb3J0ZXIvdGltZWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZnNwLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9odHRwLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYnlsb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImljb252LWxpdGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWZldGNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIl0sIm5hbWVzIjpbImFzc2VydCIsImxvZ2dlciIsIk1ldGFkYXRhIiwiZmluYW1VcmwiLCJwYXJzZSIsInRleHRDb2RlIiwibGVuZ3RoIiwiRmluYW1JbXBvcnRFcnJvciIsImFzdCIsImVyciIsIkZpbmFtUGFyc2luZ0Vycm9yIiwibWVzc2FnZSIsInByb2dyYW0iLCJ1bmRlZmluZWQiLCJib2R5IiwidmFyaWFibGVEZWNsYXJhdGlvbnMiLCJmaWx0ZXIiLCJub2RlIiwidHlwZSIsImtpbmQiLCJtYXRjaCIsImRlY2xhcmF0aW9ucyIsIm1hcCIsInZhckRlYyIsInJlZHVjZSIsInJlcyIsImN1cnIiLCJwdXNoIiwiaXRlbSIsImluaXQiLCJ2YXJzIiwiZm9yRWFjaCIsImRlYyIsImVsZW1lbnRzIiwidmFsdWUiLCJpZCIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwicHJvcEl0ZW0iLCJrZXkiLCJuYW0iLCJ2YWxpZGF0ZU1ldGEiLCJtZXRhIiwidGVzdE5hbWVzIiwibmFtZXMiLCJmaW5kSW5kZXgiLCJ0ZXN0IiwiZG93bmxvYWQiLCJkYXRhIiwidXBsb2FkIiwic2F2ZU1ldGFkYXRhIiwiZGlyIiwiZnMiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwic3RyIiwiZnNwIiwid3JpdGVGaWxlIiwiZXJyb3IiLCJFcnJvciIsIkZpbmFtRG93bmxvYWRFcnJvciIsIkxvb2t1cENvbXBhcmF0b3IiLCJFUVVBTFMiLCJTVEFSVFNXSVRIIiwiQ09OVEFJTlMiLCJJbXBvcnRlciIsImhvc3QiLCJ1cmxfcGFyYW1zIiwiZCIsImYiLCJlIiwiZHRmIiwidG1mIiwiTVNPUiIsIm1zdGltZSIsIm1zdGltZXZlciIsInNlcCIsInNlcDIiLCJhdCIsIm1hcmtldCIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJlbmREYXRlIiwidGltZWZyYW1lIiwiVGltZWZyYW1lIiwiREFJTFkiLCJjb2RlIiwicGFyYW1zIiwicCIsImVtIiwiZGYiLCJnZXREYXRlIiwibWYiLCJnZXRNb250aCIsInlmIiwiZ2V0RnVsbFllYXIiLCJkdCIsIm10IiwieXQiLCJjbiIsImRhdGYiLCJUSUNLUyIsInVybCIsImJ1aWxkVXJsIiwiZGVidWciLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ0b1N0cmluZyIsIlVSTCIsInByb3RvY29sIiwicGF0aG5hbWUiLCJzZWFyY2giLCJkZWZhdWx0IiwiTUlOVVRFUzEiLCJNSU5VVEVTNSIsIk1JTlVURVMxMCIsIk1JTlVURVMxNSIsIk1JTlVURVMzMCIsIkhPVVJMWSIsIldFRUtMWSIsIk1PTlRITFkiLCJ0ZXN0TWV0YWRhdGEiLCJwYXJzZXIiLCJ0ZXN0SW1wb3J0ZXIiLCJpbXBvcnRlciIsInJlYWRGaWxlIiwicGF0aCIsIm9wdHMiLCJyZWoiLCJmZXRjaENvbnRlbnQiLCJlbmMiLCJyZXNvbHZlIiwicmVqZWN0IiwidGhlbiIsImJ1ZmZlciIsImljb252IiwiZGVjb2RlIiwidGV4dCIsImNhdGNoIiwiQ29uc29sZUxvZ2dlciIsIm9wdGlvbnMiLCJsZXZlbHMiLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJzaWxseSIsImxvZyIsImxldmVsIiwidHJhY2UiLCJvcyIsImNvbnNvbGUiLCJjb25kaXRpb24iLCJDdXN0b21FcnJvciIsImNvbnNvbGVMb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBUUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLGNBQU9ELE1BQXRCOztBQUVBOzs7Ozs7Ozs7Ozs7OztJQWFNRSxROzs7O1NBQ0ZDLFEsR0FBVywrQzs7U0FTWEMsSyxHQUFRLG9CQUFZO0FBQ2hCLFlBQ0ksQ0FBQ0MsUUFBRCxJQUNBLE9BQU9BLFFBQVAsS0FBb0IsUUFEcEIsSUFFQUEsU0FBU0MsTUFB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QixzQkFBSzBDLEdBQUwsQ0FBUyxRQUFULEVBQW1CdkksT0FBbkIsRUFBNEIsSUFBNUI7QUFDSCxhQUZELE1BR0s7QUFDRCxzQkFBTSxJQUFJNkksV0FBSixDQUFnQjdJLE9BQWhCLENBQU47QUFDSDtBQUNKO0FBQ0osS0E3Qm9COztBQUFBLFNBOEJyQjZGLEtBOUJxQixHQThCYixtQkFBVztBQUNmLGNBQUtvQyxPQUFMLENBQWFwQyxLQUFiLEdBQXFCLE1BQUswQyxHQUFMLENBQVMsT0FBVCxFQUFrQnZJLE9BQWxCLENBQXJCLEdBQWtELElBQWxEO0FBQ0gsS0FoQ29COztBQUNqQixTQUFLaUksT0FBTCxHQUFlQSxPQUFmO0FBQ0gsQzs7QUFpQ0UsSUFBTWEsd0NBQWdCLElBQUlkLGFBQUosQ0FBa0IsRUFBRW5DLE9BQU8sSUFBVCxFQUFsQixDQUF0QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ1AsMkM7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEsMEU7Ozs7Ozs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsbUU7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7Ozs7O0FDQUEsNEU7Ozs7Ozs7Ozs7O0FDQUEsb0U7Ozs7Ozs7Ozs7O0FDQUEseUQ7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7IGxvZ2dlciwgZmV0Y2hDb250ZW50LCBmc3AgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCBpY29udiBmcm9tICdpY29udi1saXRlJztcclxuaW1wb3J0IHsgcGFyc2UgYXMgX3BhcnNlIH0gZnJvbSAnYmFieWxvbic7XHJcbmltcG9ydCB7XHJcbiAgICBGaW5hbUltcG9ydEVycm9yLFxyXG4gICAgRmluYW1Eb3dubG9hZEVycm9yLFxyXG4gICAgRmluYW1UaHJvdHRsaW5nRXJyb3IsXHJcbiAgICBGaW5hbVBhcnNpbmdFcnJvcixcclxuICAgIEZpbmFtT2JqZWN0Tm90Rm91bmRFcnJvcixcclxuICAgIEZpbmFtVG9vTG9uZ1RpbWVmcmFtZUVycm9yXHJcbn0gZnJvbSAnLi9leGNlcHRpb24nO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5cclxuY29uc3QgYXNzZXJ0ID0gbG9nZ2VyLmFzc2VydDtcclxuXHJcbi8qKlxyXG4gKiDQntCx0LXRgdC/0LXRh9C40LLQsNC10YIg0L/QvtC70YPRh9C10L3QuNC1INC80LXRgtCw0LTQsNC90L3Ri9GFINGBINGB0LDQudGC0LAg0YTQuNC90LDQvC4gW1xyXG4gKiBhRW1pdGVudElkc1xyXG4gKiBhRW1pdGVudE5hbWVzXHJcbiAqIGFFbWl0ZW50Q29kZXNcclxuICogYUVtaXRlbnRNYXJrZXRzXHJcbiAqIGFFbWl0ZW50RGVjcFxyXG4gKiBhRGF0YUZvcm1hdFN0cnNcclxuICogYUVtaXRlbnRDaGlsZFxyXG4gKiBhRW1pdGVudFVybHNdXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRhZGF0YVxyXG4gKi9cclxuY2xhc3MgTWV0YWRhdGEge1xyXG4gICAgZmluYW1VcmwgPSAnaHR0cHM6Ly93d3cuZmluYW0ucnUvY2FjaGUvaWNoYXJ0cy9pY2hhcnRzLmpzJztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0LDRgNGB0LjRgiDQuNGB0YXQvtC00L3Ri9C5INC60L7QtCBqcyDQvdCw0YXQvtC00LjRgiDQstGB0LUg0L7QsdGP0LLQu9C10L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRiyDRgtC40L/QsDogW9C80LDRgdGB0LjQsiB8INC+0LHRitC10LrRgl1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dENvZGUg0JjRgdGF0L7QtNC90YvQuSDQutC+0LQg0L3QsCBqc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PG9iamVjdD59INCc0LDRgdGB0LjQsiDQsNC70LXQvNC10L3RgtC+0LIge25hbWUsIHZhbHVlfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIHBhcnNlID0gdGV4dENvZGUgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIXRleHRDb2RlIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiB0ZXh0Q29kZSAhPT0gJ3N0cmluZycgfHxcclxuICAgICAgICAgICAgdGV4dENvZGUubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGaW5hbUltcG9ydEVycm9yKCfQndC10YIg0LTQsNC90L3Ri9GFJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXN0ID0gX3BhcnNlKHRleHRDb2RlKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEZpbmFtUGFyc2luZ0Vycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzc2VydChhc3QgJiYgdHlwZW9mIGFzdC5wcm9ncmFtICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFzdC5wcm9ncmFtLmJvZHkgIT09IHVuZGVmaW5lZCwgJ9Cj0LfQtdC7IGJvZHkg0L3QtSDQvdCw0LnQtNC10L0nLCBGaW5hbVBhcnNpbmdFcnJvcilcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IGFzdC5wcm9ncmFtLmJvZHk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlRGVjbGFyYXRpb25zID0gYm9keS5maWx0ZXIoXHJcbiAgICAgICAgICAgIG5vZGUgPT5cclxuICAgICAgICAgICAgICAgIG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmtpbmQubWF0Y2goJ2xldHxjb25zdHx2YXInKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFyaWFibGVEZWNsYXJhdGlvbnMgIT09IHVuZGVmaW5lZCAmJiB2YXJpYWJsZURlY2xhcmF0aW9ucy5sZW5ndGggPiAwLCAn0KPQt9C10LsgVmFyaWFibGVEZWNsYXJhdGlvbiDQvdC1INC90LDQudC00LXQvScsIEZpbmFtUGFyc2luZ0Vycm9yKVxyXG5cclxuICAgICAgICBjb25zdCBkZWNsYXJhdGlvbnMgPSB2YXJpYWJsZURlY2xhcmF0aW9uc1xyXG4gICAgICAgICAgICAubWFwKHZhckRlYyA9PiB2YXJEZWMuZGVjbGFyYXRpb25zKVxyXG4gICAgICAgICAgICAucmVkdWNlKChyZXMsIGN1cnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmN1cnIuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0udHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgJiYgaXRlbS5pbml0XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBkZWNsYXJhdGlvbnMgIT09IG51bGwgJiYgZGVjbGFyYXRpb25zLmxlbmd0aCA+IDAsICfQo9C30LXQuyBkZWNsYXJhdGlvbnMg0L3QtSDQvdCw0LnQtNC10L0nLCBGaW5hbVBhcnNpbmdFcnJvcilcclxuXHJcbiAgICAgICAgY29uc3QgdmFycyA9IHt9IC8vINCc0LDRgdGB0LjQsiDRgNCw0YHQv9C+0LfQvdCw0L3QvdGL0YUg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlYyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkZWMuaW5pdC50eXBlID09PSAnQXJyYXlFeHByZXNzaW9uJyAmJiBkZWMuaW5pdC5lbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhcnNbZGVjLmlkLm5hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVjLmluaXQuZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlLm1hdGNoKC9MaXRlcmFsJC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgZGVjLmluaXQudHlwZSA9PT0gJ09iamVjdEV4cHJlc3Npb24nICYmXHJcbiAgICAgICAgICAgICAgICBkZWMuaW5pdC5wcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZhcnNbZGVjLmlkLm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlYy5pbml0LnByb3BlcnRpZXMuZm9yRWFjaChwcm9wSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BJdGVtLnR5cGUubWF0Y2goL1Byb3BlcnR5JC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBwcm9wSXRlbS5rZXkubmFtID09IHVuZGVmaW5lZCA/IHByb3BJdGVtLmtleS5uYW1lIDogcHJvcEl0ZW0ua2V5LnZhbHVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrZXldID0gcHJvcEl0ZW0udmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZU1ldGEodmFycyk7XHJcblxyXG4gICAgICAgIHRoaXMubWV0YSA9IHZhcnM7XHJcbiAgICAgICAgcmV0dXJuIHZhcnM7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkYXRlTWV0YSA9IChtZXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGVzdE5hbWVzID0gW1xyXG4gICAgICAgICAgICAnYUVtaXRlbnRJZHMnLFxyXG4gICAgICAgICAgICAnYUVtaXRlbnROYW1lcycsXHJcbiAgICAgICAgICAgICdhRW1pdGVudENvZGVzJyxcclxuICAgICAgICAgICAgJ2FFbWl0ZW50TWFya2V0cycsXHJcbiAgICAgICAgICAgICdhRW1pdGVudERlY3AnLFxyXG4gICAgICAgICAgICAnYURhdGFGb3JtYXRTdHJzJyxcclxuICAgICAgICAgICAgJ2FFbWl0ZW50Q2hpbGQnLFxyXG4gICAgICAgICAgICAnYUVtaXRlbnRVcmxzJ1xyXG4gICAgICAgIF1cclxuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKG1ldGEpO1xyXG4gICAgICAgIGFzc2VydChuYW1lcy5sZW5ndGggPiAwLCAn0JjRgdGF0L7QtNC90YvQuSDRhNCw0LnQuyDQvNC40YLQsNC00LDQvdC90YvRhSDQvdC1INGB0L7QtNC10YDQttC40YIg0L/QtdGA0LXQvNC10L3QvdGL0YUnLCBGaW5hbVBhcnNpbmdFcnJvcik7XHJcbiAgICAgICAgdGVzdE5hbWVzLmZvckVhY2godGVzdCA9PiB7XHJcbiAgICAgICAgICAgIGFzc2VydChuYW1lcy5maW5kSW5kZXgobmFtZSA9PiBuYW1lID09PSB0ZXN0KSA+PSAwLCBg0JIg0LjRgdGF0L7QtNC90L7QvCDRhNCw0LnQu9C1INC80LXRgtCw0LTQsNC90L3Ri9GFINC90LXRgiDQv9C10YDQtdC80LXQvdC90L7QuSAke3Rlc3R9YCwgRmluYW1QYXJzaW5nRXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0LrQsNGH0LjQstCw0LXRgiDQuNGB0YXQvtC00L3Ri9C5INGE0LDQudC7INC80LXRgtCw0LTQsNC90L3Ri9C10YUgKC5qcylcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0YWRhdGFcclxuICAgICAqL1xyXG4gICAgZG93bmxvYWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoQ29udGVudCh0aGlzLmZpbmFtVXJsLCAnd2luMTI1MScpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGxvYWQgPSBhc3luYyAoKSA9PiB7fTtcclxuXHJcbiAgICBzYXZlTWV0YWRhdGEgPSBhc3luYyAobWV0YSA9IHRoaXMubWV0YSkgPT4ge1xyXG4gICAgICAgIGFzc2VydChtZXRhICYmIHR5cGVvZiBtZXRhICE9PSB1bmRlZmluZWQpO1xyXG4gICAgICAgIGNvbnN0IGRpciA9ICcuL3VkYXRhJztcclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkobWV0YSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgZnNwLndyaXRlRmlsZShgJHtkaXJ9L21ldGFkYXRhLmpzb25gLCBzdHIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXRhZGF0YTtcclxuIiwiLy8jcmVnaW9uICBFeHBvcnQgRXJyb3JzXHJcblxyXG5jbGFzcyBGaW5hbUltcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBGaW5hbURvd25sb2FkRXJyb3IgZXh0ZW5kcyBGaW5hbUltcG9ydEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmluYW1QYXJzaW5nRXJyb3IgZXh0ZW5kcyBGaW5hbUltcG9ydEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5leHBvcnQge1xyXG4gICAgRmluYW1JbXBvcnRFcnJvcixcclxuICAgIEZpbmFtRG93bmxvYWRFcnJvcixcclxuICAgIEZpbmFtUGFyc2luZ0Vycm9yLFxyXG59IiwiaW1wb3J0IHsgbG9nZ2VyLCBmZXRjaENvbnRlbnQgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCBUaW1lZnJhbWUgZnJvbSAnLi90aW1lZnJhbWUnO1xyXG5pbXBvcnQge1VSTCwgVVJMU2VhcmNoUGFyYW1zfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgTWV0YWRhdGEgZnJvbSAnLi9NZXRhZGF0YSc7XHJcblxyXG5jb25zdCBhc3NlcnQgPSBsb2dnZXIuYXNzZXJ0O1xyXG5cclxuY29uc3QgTG9va3VwQ29tcGFyYXRvciA9IHtcclxuICAgIEVRVUFMUzogMSxcclxuICAgIFNUQVJUU1dJVEg6IDIsXHJcbiAgICBDT05UQUlOUzogM1xyXG59O1xyXG5cclxuY2xhc3MgSW1wb3J0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoaG9zdCA9ICdleHBvcnQuZmluYW0ucnUnKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBob3N0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cmxfcGFyYW1zID0ge1xyXG4gICAgICAgIGQ6ICdkJyxcclxuICAgICAgICBmOiAndGFibGUnLFxyXG4gICAgICAgIGU6ICcuY3N2JyxcclxuICAgICAgICBkdGY6ICcxJyxcclxuICAgICAgICB0bWY6ICczJyxcclxuICAgICAgICBNU09SOiAnMCcsXHJcbiAgICAgICAgbXN0aW1lOiAnb24nLFxyXG4gICAgICAgIG1zdGltZXZlcjogJzEnLFxyXG4gICAgICAgIHNlcDogJzMnLFxyXG4gICAgICAgIHNlcDI6ICcxJyxcclxuICAgICAgICBhdDogJzEnXHJcbiAgICB9O1xyXG5cclxuICAgIGRvd25sb2FkID0gYXN5bmMgKFxyXG4gICAgICAgIGlkPTE2ODQyLFxyXG4gICAgICAgIG1hcmtldD0xLFxyXG4gICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKDIwMDcsIDEsIDEpLFxyXG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIHRpbWVmcmFtZSA9IFRpbWVmcmFtZS5EQUlMWVxyXG4gICAgKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAnR0FaUCc7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgcDogdGltZWZyYW1lLnZhbHVlLFxyXG4gICAgICAgICAgICBlbTogaWQsXHJcbiAgICAgICAgICAgIG1hcmtldDogbWFya2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkZjogc3RhcnREYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbWY6IHN0YXJ0RGF0ZS5nZXRNb250aCgpIC0gMSxcclxuICAgICAgICAgICAgeWY6IHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBkdDogZW5kRGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgICAgIG10OiBlbmREYXRlLmdldE1vbnRoKCkgLSAxLFxyXG4gICAgICAgICAgICB5dDogZW5kRGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBjbjogY29kZSxcclxuICAgICAgICAgICAgY29kZTogY29kZSxcclxuICAgICAgICAgICAgZGF0ZjogdGltZWZyYW1lID09PSBUaW1lZnJhbWUuVElDS1MgPyA2IDogNVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRVcmwocGFyYW1zKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoQ29udGVudCh1cmwpO1xyXG5cclxuICAgICAgICBsb2dnZXIuZGVidWcoZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBidWlsZFVybCA9IHBhcmFtcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgICAuLi50aGlzLnVybF9wYXJhbXMsXHJcbiAgICAgICAgICAgIC4uLnBhcmFtc1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGFzc2VydChzZWFyY2hQYXJhbXMudG9TdHJpbmcoKS5sZW5ndGggPiAwKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGBodHRwOi8vJHt0aGlzLmhvc3R9YCk7XHJcbiAgICAgICAgdXJsLnByb3RvY29sID0gJ2h0dHA6JywgXHJcbiAgICAgICAgdXJsLmhvc3QgPSB0aGlzLmhvc3Q7XHJcbiAgICAgICAgdXJsLnBhdGhuYW1lID0gJ3RhYmxlLmNzdic7XHJcbiAgICAgICAgLy91cmwuc2VhcmNoID0gc2VhcmNoO1xyXG4gICAgICAgIHVybC5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH07XHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbXBvcnRlcjtcclxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIEltcG9ydGVyfSBmcm9tICcuL2ltcG9ydGVyJztcclxuZXhwb3J0IHtkZWZhdWx0IGFzIE1ldGFkYXRhfSBmcm9tICcuL01ldGFkYXRhJztcclxuXHJcbiIsImNvbnN0IHRpbWVmcmFtZSA9IHtcclxuICAgIFRJQ0tTOiAxLFxyXG4gICAgTUlOVVRFUzE6IDIsXHJcbiAgICBNSU5VVEVTNTogMyxcclxuICAgIE1JTlVURVMxMDogNCxcclxuICAgIE1JTlVURVMxNTogNSxcclxuICAgIE1JTlVURVMzMDogNixcclxuICAgIEhPVVJMWTogNyxcclxuICAgIERBSUxZOiA4LFxyXG4gICAgV0VFS0xZOiA5LFxyXG4gICAgTU9OVEhMWTogMTBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbWVmcmFtZTsiLCJpbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHtJbXBvcnRlciwgTWV0YWRhdGEgfSBmcm9tICcuL2ZpbmFtL2ltcG9ydGVyL2luZGV4JztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCB0ZXN0TWV0YWRhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgTWV0YWRhdGEoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHBhcnNlci5kb3dubG9hZCgpO1xyXG4gICAgICAgIGNvbnN0IHZhcnMgPSBwYXJzZXIucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgcGFyc2VyLnNhdmVNZXRhZGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHZhcnMpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgdGVzdEltcG9ydGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgSW1wb3J0ZXIoKTtcclxuXHJcbiAgICBpbXBvcnRlci5kb3dubG9hZCgpO1xyXG59XHJcblxyXG50ZXN0TWV0YWRhdGEoKTtcclxuLy90ZXN0SW1wb3J0ZXIoKTtcclxuXHJcbiIsImltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG5jb25zdCByZWFkRmlsZSA9IChwYXRoLCBvcHRzID0gJ3V0ZjgnKSA9PlxyXG4gICAgbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgZnMucmVhZEZpbGUocGF0aCwgb3B0cywgKGVyciwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSByZWooZXJyKTtcclxuICAgICAgICAgICAgZWxzZSByZXMoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbmNvbnN0IHdyaXRlRmlsZSA9IChwYXRoLCBkYXRhLCBvcHRzID0gJ3V0ZjgnKSA9PlxyXG4gICAgbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlKHBhdGgsIGRhdGEsIG9wdHMsIGVyciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHJlaihlcnIpO1xyXG4gICAgICAgICAgICBlbHNlIHJlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICByZWFkRmlsZSxcclxuICAgIHdyaXRlRmlsZVxyXG59IiwiaW1wb3J0IHsgY29uc29sZUxvZ2dlciBhcyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCBpY29udiBmcm9tICdpY29udi1saXRlJztcclxuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xyXG5cclxuY29uc3QgZmV0Y2hDb250ZW50ID0gKHVybCwgZW5jID0gJ3dpbjEyNTEnKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4gcmVzLmJ1ZmZlcigpKS50aGVuKGJ1ZmZlciA9PiBpY29udi5kZWNvZGUoYnVmZmVyLGVuYykpLnRoZW4odGV4dCA9PiByZXNvbHZlKHRleHQpKS5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpO1xyXG4gICAgfSlcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgeyBmZXRjaENvbnRlbnQgfTtcclxuIiwiaW1wb3J0IHsgY29uc29sZUxvZ2dlciBhcyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IGZldGNoQ29udGVudCB9IGZyb20gJy4vaHR0cCc7XHJcblxyXG5leHBvcnQgeyBsb2dnZXIsIGZldGNoQ29udGVudCB9O1xyXG5leHBvcnQge2RlZmF1bHQgYXMgZnNwfSBmcm9tICcuL2ZzcCc7XHJcbiIsIi8vaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCBmb3JtYXQsIHRyYW5zcG9ydHMgfSBmcm9tICd3aW5zdG9uJztcclxuLy9cclxuLy9jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xyXG4vLyAgICB0cmFuc3BvcnRzOiBbXHJcbi8vICAgICAgICBuZXcgdHJhbnNwb3J0cy5Db25zb2xlKHtcclxuLy8gICAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlXHJcbi8vICAgICAgICB9KVxyXG4vLyAgICBdLFxyXG4vLyAgICBleGl0T25FcnJvcjogZmFsc2VcclxuLy99KTtcclxuXHJcbmNsYXNzIENvbnNvbGVMb2dnZXIge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgbGV2ZWxzID0geyBcclxuICAgICAgICBlcnJvcjogMCwgXHJcbiAgICAgICAgd2FybjogMSwgXHJcbiAgICAgICAgaW5mbzogMiwgXHJcbiAgICAgICAgdmVyYm9zZTogMywgXHJcbiAgICAgICAgZGVidWc6IDQsIFxyXG4gICAgICAgIHNpbGx5OiA1IFxyXG4gICAgICB9O1xyXG5cclxuICAgIGxvZyA9IChsZXZlbCwgbWVzc2FnZSwgdHJhY2U9ZmFsc2UpID0+IHtcclxuICAgICAgICBjb25zdCBvcyA9IHRyYWNlID8gY29uc29sZS50cmFjZSA6IGNvbnNvbGUubG9nO1xyXG4gICAgICAgIG9zKGBbJHtsZXZlbH1dOiAke21lc3NhZ2V9YCk7XHJcbiAgICB9O1xyXG4gICAgaW5mbyA9IG1lc3NhZ2UgPT4gdGhpcy5sb2coJ2luZm8nLCBtZXNzYWdlKTtcclxuICAgIHdhcm4gPSBtZXNzYWdlID0+IHRoaXMubG9nKCd3YXJuJywgbWVzc2FnZSk7XHJcbiAgICBlcnJvciA9IG1lc3NhZ2UgPT4gdGhpcy5sb2coJ2Vycm9yJywgbWVzc2FnZSk7XHJcbiAgICBhc3NlcnQgPSAoY29uZGl0aW9uLCBtZXNzYWdlPWDQktCd0JjQnNCQ0J3QmNCVISDQotC10YHRgiDQvdC1INC/0YDQvtC50LTQtdC9IDogJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb24pfWAsIEN1c3RvbUVycm9yID0gRXJyb3IpID0+IHtcclxuICAgICAgICBpZiAoIWNvbmRpdGlvbil7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2Fzc2VydCcsIG1lc3NhZ2UsIHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ3VzdG9tRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGVidWcgPSBtZXNzYWdlID0+IHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZGVidWcgPyB0aGlzLmxvZygnZGVidWcnLCBtZXNzYWdlKSA6IG51bGw7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uc29sZUxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKHsgZGVidWc6IHRydWUgfSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJ5bG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImljb252LWxpdGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiXSwic291cmNlUm9vdCI6IiJ9