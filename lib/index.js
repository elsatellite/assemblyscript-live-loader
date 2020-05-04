"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var asc = require("assemblyscript/cli/asc.js");
var ts = require("typescript");
var templates_1 = require("./templates");
/**
 * compile assemblyscript to WebAssembly(wasm)
 * @param {string} source - assemblyscript string
 * @returns {Buffer} wasm stream as a Buffer
 */
function compile(source) {
    var module = asc.compileString(source, {
        optimizeLevel: 3,
        runtime: "none",
        validate: true
    });
    return Buffer.from(module.binary);
}
/**
 * Create a module using WebAssembly.Module
 * @param {string} source assemblyscript source
 * @param {Buffer} wasm WebAssembly Buffer
 * @returns {string} module string
 */
function createWasmModule(wasm) {
    var length = wasm.length;
    var buffer = [];
    for (var i = 0; i < length; i += 1) {
        buffer.push(wasm[i]);
    }
    var module = templates_1.wasmModuleTemplate({ wasm: wasm, buffer: buffer });
    return module;
}
/**
 * Creates commonjs module for javascript
 * @param {string} source assemblyscript source
 * @returns {string} module string
 */
function createJsModule(source) {
    var compilerOptions = {
        compilerOptions: {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            alwaysStrict: false
        }
    };
    var transpiled = ts.transpileModule(source, compilerOptions);
    return transpiled.outputText;
}
/**
 * Creates compatible module with Javascript, WebAssembly both
 * @param {string} jsModule - javascript module
 * @param {string} wasmModule - WebAssembly module
 * @example
 * var compatibleModule;
 * if (typeof WebAssembly !== 'undefined') {
 *     // ... wasmModule ...
 *     compatibleModule = WebAssemblyModule;
 * }
 * else {
 *     // .. jsModule ...
 *     compatibleModule = function() {};
 *     compatibleModule.prototype.exports = exports;
 * }
 * module.exports = comptaibleModule;
 * @returns {string} module string
 */
function createCompatibleModule(jsModule, wasmModule) {
    var module = templates_1.compatibleModuleTemplate({ jsModule: jsModule, wasmModule: wasmModule });
    return module;
}
/**
 * Webpack loader for assemblyscript to transform wasm and bundle it
 * @param {string} source - assemblyscript source file
 * @returns {string} module string
 */
function AssemblyScriptLiveLoader(source) {
    return __awaiter(this, void 0, void 0, function () {
        var callback, jsModule, wasmModule;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callback = this.async();
                    if (this.cacheable) {
                        this.cacheable();
                    }
                    return [4 /*yield*/, asc.ready];
                case 1:
                    _a.sent();
                    jsModule = createJsModule(source);
                    wasmModule = createWasmModule(compile(source));
                    return [2 /*return*/, callback(null, createCompatibleModule(jsModule, wasmModule))];
            }
        });
    });
}
exports["default"] = AssemblyScriptLiveLoader;
