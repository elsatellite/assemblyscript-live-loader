/* eslint-disable strict */
const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
  {
    resource: path.resolve(__dirname, "../example/src/asc/Calculator.asc"),
    loaders: [path.resolve(__dirname, "../lib/index.js")],
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => (err ? console.error(err) : console.log(result))
);