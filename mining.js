const { generateNonceAndHash } = require("./src/hash");

const input = process.argv[2];
const difficulty = process.argv[3] || 1;
const print = process.argv[4] || 1000000;

(async () => {
  const nonceAndHash = await generateNonceAndHash(input, difficulty, print);
  console.log(`${input} - ${nonceAndHash[0]} - ${nonceAndHash[1]}`);
})();