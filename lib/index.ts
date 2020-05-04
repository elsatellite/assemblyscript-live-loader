import asc = require("assemblyscript/cli/asc.js");
import * as ts from "typescript";
import { compatibleModuleTemplate, wasmModuleTemplate } from "./templates";

/**
 * compile assemblyscript to WebAssembly(wasm)
 * @param {string} source - assemblyscript string
 * @returns {Buffer} wasm stream as a Buffer
 */
function compile(source: string): Buffer {
  const module = asc.compileString(source, {
    optimizeLevel: 3,
    runtime: "none",
    validate: true,
  });

  return Buffer.from(module.binary);
}

/**
 * Create a module using WebAssembly.Module
 * @param {string} source assemblyscript source
 * @param {Buffer} wasm WebAssembly Buffer
 * @returns {string} module string
 */
function createWasmModule(wasm: Buffer): string {
  const {
    length,
  }: {
    length: number;
  } = wasm;
  const buffer: Array<number> = [];
  for (let i = 0; i < length; i += 1) {
    buffer.push(wasm[i]);
  }
  const module = wasmModuleTemplate({ wasm, buffer });

  return module;
}

/**
 * Creates commonjs module for javascript
 * @param {string} source assemblyscript source
 * @returns {string} module string
 */
function createJsModule(source: string): string {
  const compilerOptions = {
    compilerOptions: {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
      alwaysStrict: false,
    },
  };
  const transpiled = ts.transpileModule(source, compilerOptions);

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
function createCompatibleModule(jsModule: string, wasmModule: string): string {
  const module: string = compatibleModuleTemplate({ jsModule, wasmModule });

  return module;
}

/**
 * Webpack loader for assemblyscript to transform wasm and bundle it
 * @param {string} source - assemblyscript source file
 * @returns {string} module string
 */
async function AssemblyScriptLiveLoader(source: string): Promise<string> {
  const callback = this.async();

  if (this.cacheable) {
    this.cacheable();
  }

  await asc.ready;

  const jsModule = createJsModule(source);
  const wasmModule = createWasmModule(compile(source));

  return callback(null, createCompatibleModule(jsModule, wasmModule));
}

export default AssemblyScriptLiveLoader;
