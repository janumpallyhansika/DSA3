// --------------------------------------------------
// Clean and tokenize PDF text
// --------------------------------------------------

function preprocessText(
  text
) {

  const cleaned =
    String(text || "")

      // Convert to lowercase
      .toLowerCase()

      // Remove URLs
      .replace(
        /https?:\/\/\S+/g,
        " "
      )

      // Remove email addresses
      .replace(
        /\S+@\S+\.\S+/g,
        " "
      )

      // Keep only letters, numbers and spaces
      .replace(
        /[^a-z0-9\s]/g,
        " "
      )

      // Remove repeated spaces
      .replace(
        /\s+/g,
        " "
      )

      .trim();

  if (!cleaned) {
    return [];
  }

  return cleaned.split(" ");

}

// --------------------------------------------------
// Generate K-grams
// --------------------------------------------------

function makeKGrams(
  words,
  k = 8
) {

  const grams = [];

  for (
    let i = 0;
    i <= words.length - k;
    i++
  ) {

    grams.push(
      words
        .slice(i, i + k)
        .join(" ")
    );

  }

  return grams;

}

module.exports = {

  preprocessText,

  makeKGrams

};