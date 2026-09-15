// ============================================
// ROLLING HASH
// PaperCheck Plagiarism Detection System
// ============================================

const BASE = 257n;
const MOD = 1000000007n;

/*
  Convert a word into a numeric hash.
*/
function hashWord(word) {
  let hash = 0n;

  for (let i = 0; i < word.length; i++) {
    hash =
      (hash * BASE + BigInt(word.charCodeAt(i))) % MOD;
  }

  return hash;
}


/*
  Calculate rolling hash values for
  k-word sequences.
*/
function calculateRollingHashes(words, k = 8) {

  if (words.length < k) {
    return [];
  }

  const wordHashes = words.map(hashWord);

  let currentHash = 0n;

  // BASE^(k-1)
  let highestPower = 1n;

  for (let i = 0; i < k - 1; i++) {
    highestPower =
      (highestPower * BASE) % MOD;
  }


  // First window
  for (let i = 0; i < k; i++) {

    currentHash =
      (
        currentHash * BASE +
        wordHashes[i]
      ) % MOD;

  }


  const hashes = [currentHash];


  // Remaining windows
  for (
    let i = k;
    i < wordHashes.length;
    i++
  ) {

    // Remove the word leaving the window
    const outgoing =
      (
        wordHashes[i - k] *
        highestPower
      ) % MOD;


    currentHash =
      (
        currentHash -
        outgoing +
        MOD
      ) % MOD;


    // Add the new word
    currentHash =
      (
        currentHash * BASE +
        wordHashes[i]
      ) % MOD;


    hashes.push(currentHash);
  }


  return hashes;
}


module.exports = {
  hashWord,
  calculateRollingHashes
};