"use strict";
exports.__esModule = true;
var wasmFooter = "var WebAssemblyModule = function(deps) {\n  var defaultDeps = {\n      'global': { },\n      'env': {\n          'memory': new WebAssembly.Memory({\n              initial: 10,\n              limit: 100}),\n          'table': new WebAssembly.Table({\n              initial: 0,\n              element: 'anyfunc'})\n      }\n  };\n\n  return new WebAssembly.Instance(new WebAssembly.Module(buffer), deps || defaultDeps);\n};";
exports.wasmModuleTemplate = function (_a) {
    var wasm = _a.wasm, buffer = _a.buffer;
    return "var buffer = new ArrayBuffer(" + wasm.length + ");\nvar uint8 = new Uint8Array(buffer);\nuint8.set([" + buffer.join(",") + "]);\n\n" + wasmFooter;
};
exports.compatibleModuleTemplate = function (_a) {
    var jsModule = _a.jsModule, wasmModule = _a.wasmModule;
    return "exports.__esModule = true;\nvar compatibleModule;\nif (typeof WebAssembly !== \"undefined\") {\n  " + wasmModule + "\n\n  compatibleModule = Object.assign({module: WebAssemblyModule}, new WebAssemblyModule().exports);\n} else {\n  " + jsModule + "\n\n  compatibleModule = function () {};\n  compatibleModule.prototype.exports = exports;\n}\n\nmodule.exports = compatibleModule;\n";
};
