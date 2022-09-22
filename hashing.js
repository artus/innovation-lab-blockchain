const { hashValue } = require("./src/hash");

const input = process.argv[2];

(async () => {
  const hash = await hashValue(input);
  console.log(`${input} - ${hash}`);
})();