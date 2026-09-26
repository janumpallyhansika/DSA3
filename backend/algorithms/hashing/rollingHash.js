/**
 * Rolling Hash
 *
 * Generates hashes for consecutive K-word windows.
 *
 * The hash is used as a fast filter.
 * Actual text verification is performed later
 * to avoid treating hash collisions as matches.
 */

const BASE = 257;
const MOD = 1000000007;

// --------------------------------------------------
// Convert a word into a numeric value
// --------------------------------------------------

function wordValue(word) {

  let hash = 0;

  for (const ch of word) {

    hash =
      (hash * 31 +
        ch.charCodeAt(0)) %
      MOD;

  }

  return hash;
}

// --------------------------------------------------
// Generate rolling hashes
// --------------------------------------------------

function generateRollingHashes(
  words,
  k = 8
) {

  if (
    !Array.isArray(words) ||
    words.length < k
  ) {

    return [];

  }

  const hashes = [];

  // BASE^(k-1)
  let highPower = 1;

  for (
    let i = 1;
    i < k;
    i++
  ) {

    highPower =
      (highPower * BASE) %
      MOD;

  }

  // First window
  let hash = 0;

  for (
    let i = 0;
    i < k;
    i++
  ) {

    hash =
      (
        hash * BASE +
        wordValue(words[i])
      ) % MOD;

  }

  hashes.push({

    hash,

    start: 0,

    end: k,

    text:
      words
        .slice(0, k)
        .join(" ")

  });

  // Remaining windows
  for (
    let i = k;
    i < words.length;
    i++
  ) {

    const outgoing =
      wordValue(
        words[i - k]
      );

    const incoming =
      wordValue(
        words[i]
      );

    // Remove outgoing word
    hash =
      (
        hash -
        (
          outgoing *
          highPower
        ) % MOD +
        MOD
      ) % MOD;

    // Add incoming word
    hash =
      (
        hash * BASE +
        incoming
      ) % MOD;

    hashes.push({

      hash,

      start:
        i - k + 1,

      end:
        i + 1,

      text:
        words
          .slice(
            i - k + 1,
            i + 1
          )
          .join(" ")

    });

  }

  return hashes;
}

module.exports = {

  BASE,

  MOD,

  wordValue,

  generateRollingHashes

};