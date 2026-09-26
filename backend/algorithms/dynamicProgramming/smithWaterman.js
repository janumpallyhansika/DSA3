// Smith-Waterman
//
// Local sequence alignment algorithm.

function smithWaterman(
  a,
  b,
  scores = {}
) {

  a = String(a);
  b = String(b);

  const match =
    scores.match ?? 2;

  const mismatch =
    scores.mismatch ?? -1;

  const gap =
    scores.gap ?? -1;

  const dp = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  let bestScore = 0;

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

      const value =
        Math.max(
          0,
          diagonal,
          up,
          left
        );

      dp[i][j] = value;

      bestScore =
        Math.max(
          bestScore,
          value
        );
    }
  }

  return {
    score: bestScore,
    matrix: dp
  };
}


module.exports = {
  smithWaterman
};