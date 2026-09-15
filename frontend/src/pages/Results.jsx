import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Results.css";

function Results() {

  const saved =
    sessionStorage.getItem(
      "plagiarismResult"
    );

  const result =
    saved
      ? JSON.parse(saved)
      : null;


  if (!result) {

    return (
      <div>

        <Navbar />

        <div className="no-result">

          <h1>
            No Analysis Found
          </h1>

          <p>
            Please upload a research paper first.
          </p>

          <Link
            to="/analysis"
            className="result-button"
          >
            Analyze Paper
          </Link>

        </div>

      </div>
    );

  }


  return (

    <div className="results-page">

      <Navbar />

      <main className="results-container">

        <span>
          ANALYSIS RESULT
        </span>

        <h1>
          Plagiarism Analysis Report
        </h1>

        <p className="result-file">
          {result.uploadedFile}
        </p>


        <div className="score-card">

          <div className="score">

            <strong>
              {result.overallSimilarity}%
            </strong>

            <small>
              Similarity
            </small>

          </div>


          <div>

            <h2>
              Overall Textual Similarity
            </h2>

            <p>
              Compared against{" "}
              {result.totalReferencePapers}{" "}
              reference research papers.
            </p>

            <small>
              Algorithm:{" "}
              {result.algorithm}
            </small>

          </div>

        </div>


        <section className="matches">

          <h2>
            Top Matching Research Papers
          </h2>


          {result.matches.map(
            (paper, index) => (

              <div
                className="match"
                key={paper.filename}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>

                  <strong>
                    {paper.filename}
                  </strong>

                  <small>
                    {paper.matches} matching
                    k-gram windows
                  </small>

                </div>

                <b>
                  {paper.similarity}%
                </b>

              </div>

            )
          )}

        </section>


        <Link
          to="/analysis"
          className="result-button"
        >
          Analyze Another Paper
        </Link>

      </main>

    </div>

  );
}

export default Results;