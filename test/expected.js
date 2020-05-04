var compatibleModule;
if (typeof WebAssembly !== "undefined") {
  var buffer = new ArrayBuffer(75);
  var uint8 = new Uint8Array(buffer);
  uint8.set([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    7,
    1,
    96,
    2,
    127,
    127,
    1,
    127,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    0,
    7,
    27,
    3,
    6,
    109,
    101,
    109,
    111,
    114,
    121,
    2,
    0,
    3,
    97,
    100,
    100,
    0,
    0,
    8,
    115,
    117,
    98,
    116,
    114,
    97,
    99,
    116,
    0,
    1,
    10,
    17,
    2,
    7,
    0,
    32,
    0,
    32,
    1,
    106,
    11,
    7,
    0,
    32,
    0,
    32,
    1,
    107,
    11,
  ]);

  var WebAssemblyModule = function (deps) {
    var defaultDeps = {
      global: {},
      env: {
        memory: new WebAssembly.Memory({
          initial: 10,
          limit: 100,
        }),
        table: new WebAssembly.Table({
          initial: 0,
          element: "anyfunc",
        }),
      },
    };

    return new WebAssembly.Instance(
      new WebAssembly.Module(buffer),
      deps || defaultDeps
    );
  };

  compatibleModule = WebAssemblyModule;
} else {
  ("use strict");
  Object.defineProperty(exports, "__esModule", { value: true });
  function add(a, b) {
    return a + b;
  }
  exports.add = add;
  function subtract(a, b) {
    return a - b;
  }
  exports.subtract = subtract;

  compatibleModule = function () {};
  compatibleModule.prototype.exports = exports;
}
module.exports = compatibleModule;
