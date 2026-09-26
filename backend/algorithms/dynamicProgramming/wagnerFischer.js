// Wagner-Fischer Algorithm
// Dynamic programming implementation
// for edit distance.

function wagnerFischer(a, b) {

  a = String(a);
  b = String(b);

  const dp = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  // First column
  for (let i = 0; i <= a.length; i++) {
    dp[i][0] = i;
  }

  // First row
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= a.length; i++) {

    for (let j = 1; j <= b.length; j++) {

      const cost =
        a[i - 1] === b[j - 1]
          ? 0
          : 1;

      dp[i][j] = Math.min(

        // deletion
        dp[i - 1][j] + 1,

        // insertion
        dp[i][j - 1] + 1,

        // substitution
        dp[i - 1][j - 1] + cost

      );
    }
  }

  return {
    distance: dp[a.length][b.length],
    matrix: dp
  };
}


module.exports = {
  wagnerFischer
};