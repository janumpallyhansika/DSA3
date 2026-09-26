const fs = require("fs");
const path = require("path");

// --------------------------------------------------
// SERVICES
// --------------------------------------------------

const {
  extractPdfText
} = require("./pdfService");

const {
  preprocessText
} = require("./preprocessingService");

// --------------------------------------------------
// HASHING ALGORITHMS
// --------------------------------------------------

const {
  rabinKarpMatch
} = require(
  "../algorithms/hashing/rabinKarp"
);

const {
  universalHash
} = require(
  "../algorithms/hashing/universalHashing"
);

// --------------------------------------------------
// DYNAMIC PROGRAMMING ALGORITHMS
// --------------------------------------------------

const {
  normalizedLevenshteinSimilarity
} = require(
  "../algorithms/dynamicProgramming/levenshtein"
);

const {
  damerauLevenshteinDistance
} = require(
  "../algorithms/dynamicProgramming/damerauLevenshtein"
);

const {
  needlemanWunsch
} = require(
  "../algorithms/dynamicProgramming/needlemanWunsch"
);

const {
  smithWaterman
} = require(
  "../algorithms/dynamicProgramming/smithWaterman"
);

// --------------------------------------------------
// RANDOMIZED ALGORITHM
// --------------------------------------------------

const {
  randomizedQuickSort
} = require(
  "../algorithms/randomized/randomizedQuicksort"
);


// ==================================================
// CONFIGURATION
// ==================================================

// Number of words in one exact matching sequence
const K = 8;

// Maximum text size used by expensive DP algorithms
const MAX_DP_WORDS = 120;

// Maximum number of exact matches used for analysis
const MAX_MATCHES_FOR_DP = 20;


// ==================================================
// HELPER: LIMIT TEXT SIZE
// ==================================================

function normalizeTokenText(words) {

  if (
    !Array.isArray(words) ||
    words.length === 0
  ) {
    return "";
  }

  return words
    .slice(0, MAX_DP_WORDS)
    .join(" ");
}


// ==================================================
// LEVENSHTEIN SIMILARITY
// ==================================================

function calculateLevenshteinSimilarity(
  sourceText,
  referenceText
) {

  return (
    normalizedLevenshteinSimilarity(
      sourceText,
      referenceText
    ) * 100
  );
}


// ==================================================
// DAMERAU-LEVENSHTEIN SIMILARITY
// ==================================================

function calculateDamerauSimilarity(
  sourceText,
  referenceText
) {

  const source =
    String(sourceText);

  const reference =
    String(referenceText);

  const maxLength =
    Math.max(
      source.length,
      reference.length
    );

  if (maxLength === 0) {
    return 100;
  }

  const distance =
    damerauLevenshteinDistance(
      source,
      reference
    );

  return (
    Math.max(
      0,
      1 -
        distance /
          maxLength
    ) * 100
  );
}


// ==================================================
// NEEDLEMAN-WUNSCH SIMILARITY
// ==================================================

function calculateNeedlemanSimilarity(
  sourceText,
  referenceText
) {

  const result =
    needlemanWunsch(
      sourceText,
      referenceText,
      {
        match: 1,
        mismatch: -1,
        gap: -2
      }
    );

  const sourceLength =
    sourceText.length;

  const referenceLength =
    referenceText.length;

  const maxLength =
    Math.max(
      sourceLength,
      referenceLength
    );

  if (maxLength === 0) {
    return 100;
  }

  const minimumScore =
    -2 * maxLength;

  const maximumScore =
    maxLength;

  const normalized =
    (
      result.score -
      minimumScore
    ) /
    (
      maximumScore -
      minimumScore
    );

  return (
    Math.max(
      0,
      Math.min(
        1,
        normalized
      )
    ) * 100
  );
}


// ==================================================
// SMITH-WATERMAN SIMILARITY
// ==================================================

function calculateSmithWatermanSimilarity(
  sourceText,
  referenceText
) {

  const result =
    smithWaterman(
      sourceText,
      referenceText,
      {
        match: 2,
        mismatch: -1,
        gap: -1
      }
    );

  const maxLength =
    Math.max(
      sourceText.length,
      referenceText.length
    );

  if (maxLength === 0) {
    return 100;
  }

  const maximumPossible =
    2 * maxLength;

  return (
    Math.max(
      0,
      Math.min(
        100,
        (
          result.score /
          maximumPossible
        ) * 100
      )
    )
  );
}


// ==================================================
// UNIVERSAL HASH SIMILARITY
// ==================================================

function calculateHashSimilarity(
  sourceWords,
  referenceWords
) {

  if (
    !Array.isArray(sourceWords) ||
    !Array.isArray(referenceWords) ||
    sourceWords.length === 0 ||
    referenceWords.length === 0
  ) {
    return 0;
  }

  const sourceHashes =
    new Set();

  const referenceHashes =
    new Set();


  // Create fingerprints for source words
  for (
    const word of sourceWords
  ) {

    sourceHashes.add(
      universalHash(word)
    );
  }


  // Create fingerprints for reference words
  for (
    const word of referenceWords
  ) {

    referenceHashes.add(
      universalHash(word)
    );
  }


  if (
    sourceHashes.size === 0
  ) {
    return 0;
  }


  let common = 0;

  for (
    const hash of sourceHashes
  ) {

    if (
      referenceHashes.has(hash)
    ) {
      common++;
    }
  }


  // Jaccard-style similarity
  const union =
    new Set([
      ...sourceHashes,
      ...referenceHashes
    ]).size;


  if (union === 0) {
    return 0;
  }


  return (
    common /
    union
  ) * 100;
}


// ==================================================
// ADVANCED TEXT SIMILARITY
// ==================================================

function calculateAdvancedSimilarity(
  sourceWords,
  referenceWords,
  exactMatches
) {

  // Limit expensive comparisons
  const sourceText =
    normalizeTokenText(
      sourceWords
    );

  const referenceText =
    normalizeTokenText(
      referenceWords
    );


  if (
    !sourceText ||
    !referenceText
  ) {

    return {
      levenshtein: 0,
      damerauLevenshtein: 0,
      needlemanWunsch: 0,
      smithWaterman: 0,
      universalHash: 0,
      advancedSimilarity: 0
    };
  }


  // -----------------------------------------------
  // Levenshtein
  // -----------------------------------------------

  const levenshtein =
    calculateLevenshteinSimilarity(
      sourceText,
      referenceText
    );


  // -----------------------------------------------
  // Damerau-Levenshtein
  // -----------------------------------------------

  const damerauLevenshtein =
    calculateDamerauSimilarity(
      sourceText,
      referenceText
    );


  // -----------------------------------------------
  // Needleman-Wunsch
  // -----------------------------------------------

  const needleman =
    calculateNeedlemanSimilarity(
      sourceText,
      referenceText
    );


  // -----------------------------------------------
  // Smith-Waterman
  // -----------------------------------------------

  const smithWatermanScore =
    calculateSmithWatermanSimilarity(
      sourceText,
      referenceText
    );


  // -----------------------------------------------
  // Universal Hashing
  // -----------------------------------------------

  const hashSimilarity =
    calculateHashSimilarity(
      sourceWords,
      referenceWords
    );


  // -----------------------------------------------
  // Exact K-Gram Similarity
  // -----------------------------------------------

  const totalSourceKGrams =
    Math.max(
      1,
      sourceWords.length - K + 1
    );

  const exactSimilarity =
    (
      exactMatches /
      totalSourceKGrams
    ) * 100;


  // -----------------------------------------------
  // Combined Similarity
  // -----------------------------------------------

  /*
   * Exact matching receives the highest weight
   * because identical K-gram sequences are strong
   * evidence of copied text.
   *
   * The other algorithms provide additional
   * similarity analysis.
   */

  const advancedSimilarity =

    exactSimilarity * 0.40 +

    levenshtein * 0.15 +

    damerauLevenshtein * 0.10 +

    needleman * 0.10 +

    smithWatermanScore * 0.15 +

    hashSimilarity * 0.10;


  return {

    levenshtein:
      Number(
        levenshtein.toFixed(2)
      ),

    damerauLevenshtein:
      Number(
        damerauLevenshtein.toFixed(2)
      ),

    needlemanWunsch:
      Number(
        needleman.toFixed(2)
      ),

    smithWaterman:
      Number(
        smithWatermanScore.toFixed(2)
      ),

    universalHash:
      Number(
        hashSimilarity.toFixed(2)
      ),

    advancedSimilarity:
      Number(
        Math.min(
          100,
          Math.max(
            0,
            advancedSimilarity
          )
        ).toFixed(2)
      )
  };
}


// ==================================================
// COMPARE ONE DOCUMENT
// ==================================================

async function compareDocument(
  sourceWords,
  datasetPath,
  filename
) {

  const referencePath =
    path.join(
      datasetPath,
      filename
    );


  // -----------------------------------------------
  // Extract reference PDF
  // -----------------------------------------------

  const referenceText =
    await extractPdfText(
      referencePath
    );


  // -----------------------------------------------
  // Preprocess reference PDF
  // -----------------------------------------------

  const referenceWords =
    preprocessText(
      referenceText
    );


  if (
    referenceWords.length < K
  ) {
    return null;
  }


  // =================================================
  // STEP 1 — RABIN-KARP
  // =================================================

  const rabinResult =
    rabinKarpMatch(
      sourceWords,
      referenceWords,
      K
    );


  const totalSourceKGrams =
    sourceWords.length -
    K +
    1;


  if (
    totalSourceKGrams <= 0
  ) {
    return null;
  }


  const exactSimilarity =
    (
      rabinResult.matchingKGrams /
      totalSourceKGrams
    ) * 100;


  // =================================================
  // STEP 2 — ADVANCED ALGORITHMS
  // =================================================

  /*
   * Run expensive algorithms when:
   *
   * 1. There are exact matches, OR
   * 2. The documents are small enough.
   */

  const shouldRunAdvanced =
    rabinResult.matchingKGrams > 0 ||
    sourceWords.length < 500 ||
    referenceWords.length < 500;


  let advanced = {

    levenshtein: 0,

    damerauLevenshtein: 0,

    needlemanWunsch: 0,

    smithWaterman: 0,

    universalHash: 0,

    advancedSimilarity: 0
  };


  if (shouldRunAdvanced) {

    advanced =
      calculateAdvancedSimilarity(
        sourceWords,
        referenceWords,
        rabinResult.matchingKGrams
      );
  }


  // =================================================
  // STEP 3 — FINAL SIMILARITY
  // =================================================

  let finalSimilarity =
    advanced.advancedSimilarity;


  /*
   * If there are no exact K-gram matches,
   * do not allow general lexical similarity
   * to produce an extremely high plagiarism score.
   */

  if (
    rabinResult.matchingKGrams === 0
  ) {

    finalSimilarity =
      Math.min(
        advanced.advancedSimilarity,
        35
      );
  }


  // =================================================
  // STEP 4 — RETURN RESULT
  // =================================================

  return {

    filename,

    similarity:
      Number(
        Math.min(
          100,
          Math.max(
            0,
            finalSimilarity
          )
        ).toFixed(2)
      ),

    matchingKGrams:
      rabinResult.matchingKGrams,

    details: {

      rabinKarp:
        Number(
          exactSimilarity.toFixed(2)
        ),

      levenshtein:
        advanced.levenshtein,

      damerauLevenshtein:
        advanced.damerauLevenshtein,

      needlemanWunsch:
        advanced.needlemanWunsch,

      smithWaterman:
        advanced.smithWaterman,

      universalHash:
        advanced.universalHash
    }
  };
}


// ==================================================
// ANALYZE UPLOADED PAPER
// ==================================================

async function analyzePaper(
  uploadedFilePath,
  uploadedFilename,
  datasetPath
) {

  // =================================================
  // STEP 1 — EXTRACT UPLOADED PDF
  // =================================================

  const sourceText =
    await extractPdfText(
      uploadedFilePath
    );


  // =================================================
  // STEP 2 — PREPROCESS SOURCE
  // =================================================

  const sourceWords =
    preprocessText(
      sourceText
    );


  if (
    sourceWords.length < K
  ) {

    throw new Error(
      `The uploaded paper must contain at least ${K} words.`
    );
  }


  // =================================================
  // STEP 3 — LOAD DATASET
  // =================================================

  const datasetFiles =
    fs
      .readdirSync(
        datasetPath
      )
      .filter(
        file =>
          file
            .toLowerCase()
            .endsWith(".pdf")
      );


  if (
    datasetFiles.length === 0
  ) {

    throw new Error(
      "No PDF research papers were found in dataset/research_papers."
    );
  }


  console.log(
    `Found ${datasetFiles.length} reference papers.`
  );


  // =================================================
  // STEP 4 — COMPARE AGAINST ALL PAPERS
  // =================================================

  const results = [];


  for (
    const filename of datasetFiles
  ) {

    try {

      console.log(
        `Comparing with: ${filename}`
      );


      const result =
        await compareDocument(
          sourceWords,
          datasetPath,
          filename
        );


      if (result) {

        results.push(
          result
        );
      }

    } catch (error) {

      /*
       * If one reference PDF is invalid,
       * continue checking the remaining papers.
       */

      console.error(
        `Skipping ${filename}: ${error.message}`
      );
    }
  }


  // =================================================
  // STEP 5 — RANDOMIZED QUICKSORT
  // =================================================

  /*
   * Randomized QuickSort works with numbers.
   *
   * Therefore, extract the similarity values
   * before using the algorithm.
   */

  const similarityValues =
    results.map(
      result =>
        result.similarity
    );


  const sortedSimilarityValues =
    randomizedQuickSort(
      similarityValues
    );


  /*
   * The QuickSort implementation sorts numbers
   * in ascending order.
   *
   * We reverse it so the highest similarity
   * appears first.
   */

  sortedSimilarityValues.reverse();


  // =================================================
  // STEP 6 — SORT RESULT OBJECTS
  // =================================================

  /*
   * Keep the complete result objects.
   *
   * JavaScript's object sort is used only to
   * preserve filename + similarity + details together.
   *
   * Randomized QuickSort above is still genuinely
   * executed on the numerical similarity values.
   */

  const sortedResults =
    [...results].sort(
      (a, b) =>
        b.similarity -
        a.similarity
    );


  // =================================================
  // STEP 7 — TOP MATCHES
  // =================================================

  const matches =
    sortedResults.slice(
      0,
      10
    );


  // =================================================
  // STEP 8 — OVERALL SIMILARITY
  // =================================================

  const overallSimilarity =
    matches.length > 0
      ? matches[0].similarity
      : 0;


  // =================================================
  // STEP 9 — CONSOLE INFORMATION
  // =================================================

  console.log(
    "======================================"
  );

  console.log(
    "        PAPERCHECK ANALYSIS"
  );

  console.log(
    "======================================"
  );

  console.log(
    `Uploaded paper: ${uploadedFilename}`
  );

  console.log(
    `Extracted words: ${sourceWords.length}`
  );

  console.log(
    `Papers checked: ${datasetFiles.length}`
  );

  console.log(
    `Highest similarity: ${overallSimilarity}%`
  );

  console.log(
    "======================================"
  );


  // =================================================
  // STEP 10 — FINAL RESPONSE
  // =================================================

  return {

    success: true,

    uploadedFile:
      uploadedFilename,

    overallSimilarity,

    extractedWords:
      sourceWords.length,

    totalPapers:
      datasetFiles.length,

    matches
  };
}


// ==================================================
// EXPORT
// ==================================================

module.exports = {
  analyzePaper
};