// Weighted Edit Distance
//
// Different costs can be assigned to:
// insertion
// deletion
// substitution

function weightedEditDistance(
  a,
  b,
  costs = {}
) {

  a = String(a);
  b = String(b);

  const insertion =
    costs.insertion ?? 1;

  const deletion =
    costs.deletion ?? 1;

  const substitution =
    costs.substitution ?? 1;

  const dp = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  // First column
  for (let i = 1; i <= a.length; i++) {

    dp[i][0] =
      i * deletion;
  }

  // First row
  for (let j = 1; j <= b.length; j++) {

    dp[0][j] =
      j * insertion;
  }

  // Fill matrix
  for (let i = 1; i <= a.length; i++) {

    for (let j = 1; j <= b.length; j++) {

      dp[i][j] =
        Math.min(

          // deletion
          dp[i - 1][j] +
            deletion,

          // insertion
          dp[i][j - 1] +
            insertion,

          // substitution
          dp[i - 1][j - 1] +
            (
              a[i - 1] === b[j - 1]
                ? 0
                : substitution
            )

        );
    }
  }

  return dp[a.length][b.length];
}


module.exports = {
  weightedEditDistance
};