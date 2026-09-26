// Needleman-Wunsch
//
// Global sequence alignment algorithm.

function needlemanWunsch(
  a,
  b,
  scores = {}
) {

  a = String(a);
  b = String(b);

  const match =
    scores.match ?? 1;

  const mismatch =
    scores.mismatch ?? -1;

  const gap =
    scores.gap ?? -2;

  const dp = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  // Initialize first column
  for (let i = 1; i <= a.length; i++) {

    dp[i][0] =
      i * gap;

  }

  // Initialize first row
  for (let j = 1; j <= b.length; j++) {

    dp[0][j] =
      j * gap;

  }

  // Fill matrix
  for (let i = 1; i <= a.length; i++) {

    for (let j = 1; j <= b.length; j++) {

      const diagonal =
        dp[i - 1][j - 1] +
        (
          a[i - 1] === b[j - 1]
            ? match
            : mismatch
        );

      const up =
        dp[i - 1][j] +
        gap;

      const left =
        dp[i][j - 1] +
        gap;

      dp[i][j] =
        Math.max(
          diagonal,
          up,
          left
        );
    }
  }

  return {
    score:
      dp[a.length][b.length],

    matrix: dp
  };
}


module.exports = {
  needlemanWunsch
};