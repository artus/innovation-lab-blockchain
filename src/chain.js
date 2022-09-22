const { Block, GenesisBlock } = require("./block");
const { hashValue } = require("./hash");

class Chain {
  constructor(blocks = [GenesisBlock]) {
    this.blocks = blocks;
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  async validate() {
    for (let i = 1; i < this.blocks.length; i++) {
      const previousBlock = this.blocks[i - 1];
      const currentBlock = this.blocks[i];

      const actualPreviousHash = previousBlock.hash;
      if (actualPreviousHash !== currentBlock.previousHash) {
        console.warn(
          `Reported previous hash of block with index '${i}' is incorrect: was '${currentBlock.previousHash}' but must be '${actualPreviousHash}'.`
        );
        return false;
      }

      const { nonce, value, previousHash, timestamp, hash } = currentBlock;
      const valueToHash = `${nonce} - ${value} - ${previousHash} - ${timestamp}`;
      const actualHash = await hashValue(valueToHash);

      if (actualHash !== hash) {
        console.warn(
          `Reported hash of block with index '${i}' is incorrect: was '${hash}' but must be '${actualHash}'.`
        );
        return false;
      }
    }
  }

  async createRecord(value) {
    const lastBlock = this.getLastBlock();
    const newBlock = await Block.create(value, lastBlock.hash, Date.now());
    this.blocks.push(newBlock);
  }
}

module.exports = {
  Chain,
};
