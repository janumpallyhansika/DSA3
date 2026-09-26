function buildReport(
  result
) {

  return {

    success: true,

    uploadedFile:
      result.uploadedFile,

    overallSimilarity:
      result.overallSimilarity,

    extractedWords:
      result.extractedWords,

    totalPapers:
      result.totalPapers,

    matches:
      result.matches

  };

}

module.exports = {

  buildReport

};