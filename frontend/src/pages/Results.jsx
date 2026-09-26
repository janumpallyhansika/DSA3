import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import "./Results.css";

function Results() {

  const navigate = useNavigate();

  const [result, setResult] =
    useState(null);


  useEffect(() => {

    const stored =
      sessionStorage.getItem(
        "plagiarismResult"
      );

    if (!stored) {
      return;
    }

    try {

      setResult(
        JSON.parse(stored)
      );

    } catch {

      setResult(null);
    }

  }, []);


  if (!result) {

    return (

      <div className="empty-results">

        <div className="empty-icon">
          —
        </div>

        <h1>
          No report available
        </h1>

        <p>
          Upload a research paper to generate
          your similarity report.
        </p>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/analyze")
          }
        >
          Check a Paper →
        </button>

      </div>

    );
  }


  const similarity =
    Number(
      result.overallSimilarity || 0
    );


  const matches =
    Array.isArray(result.matches)
      ? result.matches
      : [];


  const totalMatchingSegments =
    matches.reduce(
      (total, item) =>
        total +
        Number(
          item.matchingKGrams || 0
        ),
      0
    );


  return (

    <div className="results-page">

      <div className="results-container">

        <div className="results-header">

          <div>

            <span className="page-label">
              ANALYSIS REPORT
            </span>

            <h1>
              Analysis complete
            </h1>

            <p>
              {result.uploadedFile ||
                "Research paper"}
            </p>

          </div>

          <button
            className="new-check-button"
            onClick={() =>
              navigate("/analyze")
            }
          >
            New Check
            <span>+</span>
          </button>

        </div>


        <section className="score-card">

          <div
            className="score-ring"
            style={{
              "--score":
                `${Math.min(
                  100,
                  similarity
                )}%`
            }}
          >

            <div className="score-inner">

              <strong>
                {similarity.toFixed(2)}%
              </strong>

              <span>
                similarity
              </span>

            </div>

          </div>


          <div className="score-content">

            <span className="score-label">
              OVERALL SIMILARITY
            </span>

            <h2>
              Similarity report generated
            </h2>

            <p>
              Your paper has been compared
              with the available reference
              collection.
            </p>

          </div>

        </section>


        <section className="stats-grid">

          <div className="stat-card">

            <span>
              WORDS ANALYZED
            </span>

            <strong>
              {Number(
                result.extractedWords || 0
              ).toLocaleString()}
            </strong>

          </div>


          <div className="stat-card">

            <span>
              DOCUMENTS CHECKED
            </span>

            <strong>
              {result.totalPapers || 0}
            </strong>

          </div>


          <div className="stat-card">

            <span>
              MATCHING SEGMENTS
            </span>

            <strong>
              {totalMatchingSegments.toLocaleString()}
            </strong>

          </div>

        </section>


        <section className="matches-section">

          <div className="matches-heading">

            <div>

              <span className="page-label">
                REFERENCE DOCUMENTS
              </span>

              <h2>
                Similar documents
              </h2>

            </div>

            <span className="match-count">
              {matches.length}
            </span>

          </div>


          {matches.length > 0 ? (

            <div className="matches-list">

              {matches.map(
                (match, index) => {

                  const matchSimilarity =
                    Number(
                      match.similarity || 0
                    );

                  return (

                    <div
                      className="match-row"
                      key={
                        `${match.filename}-${index}`
                      }
                    >

                      <div className="rank">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>


                      <div className="match-document">

                        <div className="document-icon">
                          PDF
                        </div>

                        <div>

                          <strong>
                            {match.filename}
                          </strong>

                          <span>
                            {match.matchingKGrams || 0}
                            {" "}
                            matching segments
                          </span>

                        </div>

                      </div>


                      <div className="match-score">

                        <strong>
                          {matchSimilarity.toFixed(2)}%
                        </strong>

                        <div className="score-bar">

                          <span
                            style={{
                              width:
                                `${Math.min(
                                  100,
                                  matchSimilarity
                                )}%`
                            }}
                          ></span>

                        </div>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          ) : (

            <div className="no-matches">
              No matching documents found.
            </div>

          )}

        </section>


        <div className="result-note">

          <span>
            i
          </span>

          <p>
            The similarity percentage represents
            matching content identified during
            document comparison.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Results;