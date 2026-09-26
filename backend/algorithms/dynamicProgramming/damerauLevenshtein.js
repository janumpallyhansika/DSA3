// Damerau-Levenshtein Distance
//
// Supports:
// insertion
// deletion
// substitution
// transposition

function damerauLevenshteinDistance(a, b) {

  a = String(a);
  b = String(b);

  const rows = a.length + 2;
  const cols = b.length + 2;

  const maxDistance =
    a.length + b.length;

  const dp = Array.from(
    { length: rows },
    () => Array(cols).fill(0)
  );

  dp[0][0] = maxDistance;

  for (let i = 0; i <= a.length; i++) {
    dp[i + 1][0] = maxDistance;
    dp[i + 1][1] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    dp[0][j + 1] = maxDistance;
    dp[1][j + 1] = j;
  }

  const lastOccurrence = new Map();

  for (let i = 1; i <= a.length; i++) {

    let lastMatchColumn = 0;

    for (let j = 1; j <= b.length; j++) {

      const previousRow =
        lastOccurrence.get(
          b[j - 1]
        ) || 0;

      const previousColumn =
        lastMatchColumn;

      const cost =
        a[i - 1] === b[j - 1]
          ? 0
          : 1;

      if (cost === 0) {
        lastMatchColumn = j;
      }

      dp[i + 1][j + 1] =
        Math.min(

          // substitution
          dp[i][j] + cost,

          // insertion
          dp[i + 1][j] + 1,

          // deletion
          dp[i][j + 1] + 1,

          // transposition
          dp[previousRow][previousColumn] +
            (i - previousRow - 1) +
            1 +
            (j - previousColumn - 1)

        );
    }

    lastOccurrence.set(
      a[i - 1],
      i
    );
  }

  return dp[
    a.length + 1
  ][
    b.length + 1
  ];
}


module.exports = {
  damerauLevenshteinDistance
};