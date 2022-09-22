const { generateNonceAndHash } = require("./hash");

class Block {
  constructor(value, previousHash, nonce, hash, timestamp = Date.now()) {
    this.value = value;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.hash = hash;
  }

  static async create(value, previousHash, timestamp = Date.now()) {
    const valueToHash = `${value} - ${previousHash} - ${timestamp}`;
    const [nonce, hash] = await generateNonceAndHash(valueToHash);
    return new Block(value, previousHash, nonce, hash, timestamp);
  }
}

const GenesisBlock = {
  value: "Genesis",
  timestamp: new Date(0),
  hash: "000"
}

module.exports = {
  Block,
  GenesisBlock
}