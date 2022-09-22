const { Sha256 } = require("@aws-crypto/sha256-js");

async function hashValue(value) {
  const hash = new Sha256(value);
  return (await hash.digest()).join("");
}

async function generateNonceAndHash(value, difficulty = 5, print = 10000000000) {
  let diff = "";

  for (let i = 0; i < difficulty; i++) {
    diff += "1";
  }

  let nonce = -1;
  let currentHash = "not-hashed-yet";
  do {
    nonce += 1;
    const valueToHash = `${nonce} - ${value}`;
    currentHash = await hashValue(valueToHash);
    if (nonce % print === 0) {
      console.log(`${valueToHash} - ${currentHash}`);
    }
  } while (currentHash.substring(currentHash.length - difficulty) !== diff);

  return [nonce, currentHash];
}

module.exports = {
  generateNonceAndHash,
  hashValue
};
