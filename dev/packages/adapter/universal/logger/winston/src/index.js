"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerAdapter = void 0;
var winston_1 = require("winston");
var logger_global_1 = require("./logger-global");
var winston = require("winston");
var LOG_LEVEL_TO_WINSTON = (_a = {},
    _a[logger_global_1.LogLevel.Fatal] = 'error',
    _a[logger_global_1.LogLevel.Error] = 'error',
    _a[logger_global_1.LogLevel.Warn] = 'warn',
    _a[logger_global_1.LogLevel.Info] = 'info',
    _a[logger_global_1.LogLevel.Debug] = 'debug',
    _a[logger_global_1.LogLevel.Trace] = 'silly',
    _a);
var WINSTON_TO_LOG_LEVEL = {
    error: logger_global_1.LogLevel.Error,
    warn: logger_global_1.LogLevel.Warn,
    info: logger_global_1.LogLevel.Info,
    debug: logger_global_1.LogLevel.Debug,
    silly: logger_global_1.LogLevel.Trace
};
/**
 * A Winston-backed logger adapter.
 */
var WinstonLoggerAdapter = /** @class */ (function () {
    function WinstonLoggerAdapter(prefix) {
        this.currentLevel = logger_global_1.LogLevel.Info;
        this.transportsList = [];
        this.formattersList = [];
        this.prefix = prefix;
        this.winstonLogger = this.createLogger();
    }
    WinstonLoggerAdapter.prototype.createLogger = function () {
        var _this = this;
        var allFormats = [
            // Prefix format if needed
            (0, winston_1.format)(function (info) {
                if (_this.prefix) {
                    info.message = "[".concat(_this.prefix, "] ").concat(info.message);
                }
                return info;
            })(),
            // Apply our formatters
            (0, winston_1.format)(function (info) {
                var entry = { level: _this.mapWinstonToOurLevel(info.level), message: info.message };
                for (var _i = 0, _a = _this.formattersList; _i < _a.length; _i++) {
                    var f = _a[_i];
                    entry = f.format(entry);
                }
                info.level = LOG_LEVEL_TO_WINSTON[entry.level];
                info.message = entry.message;
                return info;
            })(),
            winston_1.format.json()
        ];
        var logger = winston.createLogger({
            level: LOG_LEVEL_TO_WINSTON[this.currentLevel],
            transports: this.transportsList.map(function (t) { return t.winstonTransport; }),
            format: winston_1.format.combine.apply(winston_1.format, allFormats)
        });
        // Attach error listeners to transports
        for (var _i = 0, _a = this.transportsList; _i < _a.length; _i++) {
            var _b = _a[_i], original = _b.original, winstonTransport = _b.winstonTransport;
            winstonTransport.on('error', function (err) {
                if (_this.errorHandler) {
                    var entry = { level: logger_global_1.LogLevel.Error, message: "Transport error: ".concat(err.message) };
                    _this.errorHandler(err, entry);
                }
            });
        }
        return logger;
    };
    WinstonLoggerAdapter.prototype.rebuildLogger = function () {
        this.winstonLogger = this.createLogger();
    };
    WinstonLoggerAdapter.prototype.mapWinstonToOurLevel = function (winstonLevel) {
        var _a;
        return (_a = WINSTON_TO_LOG_LEVEL[winstonLevel]) !== null && _a !== void 0 ? _a : logger_global_1.LogLevel.Info; // Default to info if unknown
    };
    WinstonLoggerAdapter.prototype.log = function (level, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.winstonLogger.log({ level: LOG_LEVEL_TO_WINSTON[level], message: message });
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    WinstonLoggerAdapter.prototype.fatal = function (message) {
        return this.log(logger_global_1.LogLevel.Fatal, message);
    };
    WinstonLoggerAdapter.prototype.error = function (message) {
        return this.log(logger_global_1.LogLevel.Error, message);
    };
    WinstonLoggerAdapter.prototype.warn = function (message) {
        return this.log(logger_global_1.LogLevel.Warn, message);
    };
    WinstonLoggerAdapter.prototype.info = function (message) {
        return this.log(logger_global_1.LogLevel.Info, message);
    };
    WinstonLoggerAdapter.prototype.debug = function (message) {
        return this.log(logger_global_1.LogLevel.Debug, message);
    };
    WinstonLoggerAdapter.prototype.trace = function (message) {
        return this.log(logger_global_1.LogLevel.Trace, message);
    };
    WinstonLoggerAdapter.prototype.isLevelEnabled = function (level) {
        return this.winstonLogger.isLevelEnabled(LOG_LEVEL_TO_WINSTON[level]);
    };
    WinstonLoggerAdapter.prototype.getLevel = function () {
        return this.currentLevel;
    };
    WinstonLoggerAdapter.prototype.setLevel = function (level) {
        this.currentLevel = level;
        this.winstonLogger.level = LOG_LEVEL_TO_WINSTON[level];
    };
    WinstonLoggerAdapter.prototype.child = function (prefix) {
        var childLogger = new WinstonLoggerAdapter(prefix);
        childLogger.currentLevel = this.currentLevel;
        childLogger.transportsList = __spreadArray([], this.transportsList, true);
        childLogger.formattersList = __spreadArray([], this.formattersList, true);
        childLogger.errorHandler = this.errorHandler;
        childLogger.rebuildLogger();
        return childLogger;
    };
    WinstonLoggerAdapter.prototype.addTransport = function (transport) {
        var wTransport = this.createWinstonTransport(transport);
        this.transportsList.push({ original: transport, winstonTransport: wTransport });
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.removeTransport = function (transport) {
        this.transportsList = this.transportsList.filter(function (t) { return t.original !== transport; });
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.clearTransports = function () {
        this.transportsList = [];
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.addFormatter = function (formatter) {
        this.formattersList.push(formatter);
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.removeFormatter = function (formatter) {
        this.formattersList = this.formattersList.filter(function (f) { return f !== formatter; });
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.clearFormatters = function () {
        this.formattersList = [];
        this.rebuildLogger();
    };
    WinstonLoggerAdapter.prototype.onError = function (handler) {
        this.errorHandler = handler;
    };
    WinstonLoggerAdapter.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    WinstonLoggerAdapter.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Close all transports that have a close method.
                    return [4 /*yield*/, Promise.all(this.transportsList.map(function (t) { var _a, _b; return (_b = (_a = t.winstonTransport).close) === null || _b === void 0 ? void 0 : _b.call(_a); })
                            .filter(function (p) { return p instanceof Promise; }))];
                    case 1:
                        // Close all transports that have a close method.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WinstonLoggerAdapter.prototype.createWinstonTransport = function (transport) {
        var CustomWinstonTransport = /** @class */ (function (_super) {
            __extends(CustomWinstonTransport, _super);
            function CustomWinstonTransport(customTransport) {
                var _this = _super.call(this, { silent: false }) || this;
                _this.customTransport = customTransport;
                return _this;
            }
            CustomWinstonTransport.prototype.log = function (info, next) {
                var _a;
                var level = info.level, message = info.message;
                var entry = {
                    level: (_a = WINSTON_TO_LOG_LEVEL[level]) !== null && _a !== void 0 ? _a : logger_global_1.LogLevel.Info,
                    message: message
                };
                this.customTransport.write(entry).finally(next);
            };
            CustomWinstonTransport.prototype.close = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.customTransport.close) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.customTransport.close()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
            return CustomWinstonTransport;
        }(winston.Transport));
        return new CustomWinstonTransport(transport);
    };
    return WinstonLoggerAdapter;
}());
exports.WinstonLoggerAdapter = WinstonLoggerAdapter;
