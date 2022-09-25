# Innovation Lab - Blockchain code example

In this repository you can take a look at a very simplified example of Proof of Work.
We have a hashing function (using `aws-crypto` SHA256) that hashes our input. We want to have a specific difficulty, so we state that the hash needs to satisfy a specific constraint.
In our case, we state that the last N characters must be `1`.

```js
async function generateNonceAndHash(value, difficulty = 5) {
  let diff = "";

  for (let i = 0; i < difficulty; i++) { // Generate the constraint (last N characters must be 1, where N = difficulty)
    diff += "1";
  }

  let nonce = -1;
  let currentHash = "not-hashed-yet";
  do {
    nonce += 1; // Increment the NONCE
    const valueToHash = `${nonce} - ${value}`; // Add NONCE to the value to hash
    currentHash = await hashValue(valueToHash); // Execute hashing algorithm
  } while (currentHash.substring(currentHash.length - difficulty) !== diff); // Check whether our hash satisifes the constraint.

  return [nonce, currentHash];
}
```

You can run a small script that showcases increasing difficulties by running the `./proof-of-work.sh` file.

There is also a code example of for a `block`, and a `chain` that has a list of these blocks, and can be validated.