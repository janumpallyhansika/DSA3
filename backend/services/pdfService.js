const fs = require("fs");
const pdfParse = require("pdf-parse");

// --------------------------------------------------
// Extract text from PDF
// --------------------------------------------------

async function extractPdfText(
  filePath
) {

  const buffer =
    fs.readFileSync(
      filePath
    );

  const data =
    await pdfParse(
      buffer
    );

  if (
    !data.text ||
    !data.text.trim()
  ) {

    throw new Error(
      "Could not extract text from this PDF. The PDF may be scanned or image-based."
    );

  }

  return data.text;

}

module.exports = {

  extractPdfText

};