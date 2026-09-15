// ============================================
// RABIN-KARP ALGORITHM
// PaperCheck Plagiarism Detection System
// ============================================

const {
  calculateRollingHashes
} = require("./rollingHash");


/*
  Rabin-Karp compares the hash values of
  k-word sequences between two documents.

  sourceWords:
  Words from the uploaded research paper.

  referenceWords:
  Words from one paper in the dataset.

  k:
  Number of words in each comparison window.
*/
function rabinKarp(
  sourceWords,
  referenceWords,
  k = 8
) {

  // Not enough words to create a k-gram
  if (
    sourceWords.length < k ||
    referenceWords.length < k
  ) {
    return [];
  }


  // ------------------------------------------
  // Calculate hashes for reference paper
  // ------------------------------------------

  const referenceHashes =
    calculateRollingHashes(
      referenceWords,
      k
    );


  // ------------------------------------------
  // Calculate hashes for uploaded paper
  // ------------------------------------------

  const sourceHashes =
    calculateRollingHashes(
      sourceWords,
      k
    );


  // ------------------------------------------
  // Store reference hashes
  // ------------------------------------------

  const referenceSet =
    new Set(
      referenceHashes.map(
        hash => hash.toString()
      )
    );


  // ------------------------------------------
  // Find matching hash positions
  // ------------------------------------------

  const matches = [];


  for (
    let i = 0;
    i < sourceHashes.length;
    i++
  ) {

    const currentHash =
      sourceHashes[i].toString();


    if (
      referenceSet.has(currentHash)
    ) {

      matches.push(i);

    }

  }


  return matches;
}


// Export the algorithm
module.exports = {
  rabinKarp
};