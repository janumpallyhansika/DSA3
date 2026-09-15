// ============================================
// SIMILARITY CALCULATION
// PaperCheck Plagiarism Detection System
// ============================================

const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const {
  rabinKarp
} = require("./rabinKarp");


/*
  Clean PDF text before comparison.
*/
function cleanText(text) {

  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}


/*
  Convert text into words.
*/
function getWords(text) {

  return cleanText(text)
    .split(/\s+/)
    .filter(Boolean);

}


/*
  Compare uploaded paper with
  every paper in the dataset.
*/
async function analyzeDocument(
  uploadedText,
  datasetPath
) {

  const sourceWords =
    getWords(uploadedText);


  // Number of words in each k-gram
  const K = 8;


  // Get all PDF files
  const files =
    fs.readdirSync(datasetPath)
      .filter(
        file =>
          file
            .toLowerCase()
            .endsWith(".pdf")
      );


  const results = [];


  /*
    Compare against every research paper.
  */
  for (const file of files) {

    try {

      const filePath =
        path.join(
          datasetPath,
          file
        );


      const pdfBuffer =
        fs.readFileSync(filePath);


      // Extract text from reference PDF
      const pdf =
        await pdfParse(pdfBuffer);


      const referenceWords =
        getWords(pdf.text);


      // Run Rabin-Karp
      const matches =
        rabinKarp(
          sourceWords,
          referenceWords,
          K
        );


      /*
        Number of possible k-grams
        in uploaded paper.
      */
      const totalWindows =
        Math.max(
          sourceWords.length - K + 1,
          1
        );


      /*
        Calculate similarity.
      */
      const similarity =
        Math.min(
          100,
          (
            matches.length /
            totalWindows
          ) * 100
        );


      results.push({

        filename: file,

        similarity:
          Number(
            similarity.toFixed(2)
          ),

        matchingKGrams:
          matches.length

      });

    } catch (error) {

      console.error(
        `Error processing ${file}:`,
        error.message
      );

    }

  }


  /*
    Highest similarity first.
  */
  results.sort(
    (a, b) =>
      b.similarity -
      a.similarity
  );


  /*
    Return top 10 matching papers.
  */
  return {

    algorithm:
      "Rolling Hash + Rabin-Karp",

    kGramSize:
      K,

    totalPapers:
      files.length,

    overallSimilarity:
      results.length > 0
        ? results[0].similarity
        : 0,

    matches:
      results.slice(0, 10)

  };

}


module.exports = {
  cleanText,
  getWords,
  analyzeDocument
};