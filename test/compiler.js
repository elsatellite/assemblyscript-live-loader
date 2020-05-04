import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.asc$/,
          use: [
            {
              loader: "prettier-loader",
              options: { skipRewritingSource: true },
            },
            path.resolve(__dirname, "../lib/index.js"),
          ],
        },
      ],
    },
  });

  compiler.outputFileSystem = Object.assign(createFsFromVolume(new Volume()), {
    join: path.join.bind(path),
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};
