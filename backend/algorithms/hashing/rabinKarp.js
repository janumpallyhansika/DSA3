const {
  generateRollingHashes
} = require("./rollingHash");

// --------------------------------------------------
// Rabin-Karp matching
// --------------------------------------------------

function rabinKarpMatch(
  sourceWords,
  referenceWords,
  k = 8
) {

  if (
    sourceWords.length < k ||
    referenceWords.length < k
  ) {

    return {

      matchingKGrams: 0,

      matches: []

    };

  }

  // Generate hashes for source
  const sourceHashes =
    generateRollingHashes(
      sourceWords,
      k
    );

  // Generate hashes for reference
  const referenceHashes =
    generateRollingHashes(
      referenceWords,
      k
    );

  // ------------------------------------------------
  // Build hash index for reference document
  // ------------------------------------------------

  const index = new Map();

  for (
    const item of referenceHashes
  ) {

    if (
      !index.has(item.hash)
    ) {

      index.set(
        item.hash,
        new Set()
      );

    }

    index
      .get(item.hash)
      .add(item.text);

  }

  // ------------------------------------------------
  // Search source hashes
  // ------------------------------------------------

  const unique =
    new Set();

  const matches = [];

  for (
    const item of sourceHashes
  ) {

    const candidates =
      index.get(item.hash);

    if (!candidates) {
      continue;
    }

    /*
     * Hash collision protection:
     * verify actual K-gram text.
     */

    if (
      candidates.has(item.text) &&
      !unique.has(item.text)
    ) {

      unique.add(item.text);

      matches.push({

        text: item.text,

        sourceStart:
          item.start

      });

    }

  }

  return {

    matchingKGrams:
      matches.length,

    matches

  };

}

module.exports = {

  rabinKarpMatch

};