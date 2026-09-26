// ==================================================
// PAPERCHECK DSA ALGORITHM INDEX
// ==================================================

module.exports = {

  // ------------------------------------------------
  // HASHING
  // ------------------------------------------------

  hashing: {

    ...require(
      "./hashing/rollingHash"
    ),

    ...require(
      "./hashing/rabinKarp"
    ),

    ...require(
      "./hashing/universalHashing"
    ),

    ...require(
      "./hashing/perfectHashing"
    )

  },


  // ------------------------------------------------
  // DYNAMIC PROGRAMMING
  // ------------------------------------------------

  dynamicProgramming: {

    ...require(
      "./dynamicProgramming/levenshtein"
    ),

    ...require(
      "./dynamicProgramming/wagnerFischer"
    ),

    ...require(
      "./dynamicProgramming/damerauLevenshtein"
    ),

    ...require(
      "./dynamicProgramming/weightedEditDistance"
    ),

    ...require(
      "./dynamicProgramming/needlemanWunsch"
    ),

    ...require(
      "./dynamicProgramming/smithWaterman"
    )

  },


  // ------------------------------------------------
  // GRAPH ALGORITHMS
  // ------------------------------------------------

  graph: {

    ...require(
      "./graph/fordFulkerson"
    ),

    ...require(
      "./graph/edmondsKarp"
    ),

    ...require(
      "./graph/dinic"
    ),

    ...require(
      "./graph/minCut"
    ),

    ...require(
      "./graph/minCostFlow"
    )

  },


  // ------------------------------------------------
  // OPTIMIZATION
  // ------------------------------------------------

  optimization: {

    ...require(
      "./optimization/knapsack"
    ),

    ...require(
      "./optimization/subsetSum"
    ),

    ...require(
      "./optimization/vertexCover"
    ),

    ...require(
      "./optimization/clique"
    ),

    ...require(
      "./optimization/tsp"
    )

  },


  // ------------------------------------------------
  // RANDOMIZED ALGORITHMS
  // ------------------------------------------------

  randomized: {

    ...require(
      "./randomized/randomizedQuicksort"
    ),

    ...require(
      "./randomized/millerRabin"
    ),

    ...require(
      "./randomized/reservoirSampling"
    )

  }

};