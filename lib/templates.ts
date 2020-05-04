const wasmFooter = `var WebAssemblyModule = function(deps) {
  var defaultDeps = {
      'global': { },
      'env': {
          'memory': new WebAssembly.Memory({
              initial: 10,
              limit: 100}),
          'table': new WebAssembly.Table({
              initial: 0,
              element: 'anyfunc'})
      }
  };

  return new WebAssembly.Instance(new WebAssembly.Module(buffer), deps || defaultDeps);
};`;

export const wasmModuleTemplate = ({
  wasm,
  buffer,
}) => `var buffer = new ArrayBuffer(${wasm.length});
var uint8 = new Uint8Array(buffer);
uint8.set([${buffer.join(",")}]);

${wasmFooter}`;

export const compatibleModuleTemplate = ({
  jsModule,
  wasmModule,
}) => `exports.__esModule = true;
var compatibleModule;
if (typeof WebAssembly !== "undefined") {
  ${wasmModule}

  compatibleModule = Object.assign({module: WebAssemblyModule}, new WebAssemblyModule().exports);
} else {
  ${jsModule}

  compatibleModule = function () {};
  compatibleModule.prototype.exports = exports;
}

module.exports = compatibleModule;
`;
