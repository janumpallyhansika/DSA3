// Levenshtein Distance
// Calculates the minimum number of
// insertions, deletions and substitutions.

function levenshteinDistance(a, b) {
  a = String(a);
  b = String(b);

  const previous = Array.from(
    { length: b.length + 1 },
    (_, i) => i
  );

  for (let i = 1; i <= a.length; i++) {
    const current = [i];

    for (let j = 1; j <= b.length; j++) {

      const insertion =
        current[j - 1] + 1;

      const deletion =
        previous[j] + 1;

      const substitution =
        previous[j - 1] +
        (a[i - 1] === b[j - 1] ? 0 : 1);

      current[j] = Math.min(
        insertion,
        deletion,
        substitution
      );
    }

    for (let j = 0; j < current.length; j++) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
}


// Convert distance into similarity

function normalizedLevenshteinSimilarity(a, b) {

  const maxLength =
    Math.max(
      String(a).length,
      String(b).length
    );

  if (maxLength === 0) {
    return 1;
  }

  return (
    1 -
    levenshteinDistance(a, b) /
      maxLength
  );
}


module.exports = {
  levenshteinDistance,
  normalizedLevenshteinSimilarity
};