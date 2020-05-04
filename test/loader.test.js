const fs = require("fs");
import compiler from "./compiler.js";

test("Can create module", async () => {
  const stats = await compiler("source.asc");
  const output = stats.toJson().modules[0].source;

  fs.readFile("test/expected.js", "utf8", (err, data) => {
    expect(output).toBe(data);
  });
});
