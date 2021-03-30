"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.configure = exports.levels = exports.Logger = exports.using = exports.Disposable = exports.XLog = void 0;
const xlog_1 = require("./xlog");
Object.defineProperty(exports, "XLog", { enumerable: true, get: function () { return xlog_1.XLog; } });
const disposable_1 = require("./disposable");
Object.defineProperty(exports, "Disposable", { enumerable: true, get: function () { return disposable_1.Disposable; } });
Object.defineProperty(exports, "using", { enumerable: true, get: function () { return disposable_1.using; } });
const log4js_1 = require("log4js");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return log4js_1.Logger; } });
Object.defineProperty(exports, "levels", { enumerable: true, get: function () { return log4js_1.levels; } });
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return log4js_1.configure; } });
Object.defineProperty(exports, "getLogger", { enumerable: true, get: function () { return log4js_1.getLogger; } });
//# sourceMappingURL=index.js.map