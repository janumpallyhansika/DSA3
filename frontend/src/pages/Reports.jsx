import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Reports.css";

function Reports() {

  const saved =
    sessionStorage.getItem(
      "plagiarismResult"
    );

  const result =
    saved
      ? JSON.parse(saved)
      : null;


  return (

    <div className="reports-page">

      <Navbar />

      <main className="reports-container">

        <span>
          REPORTS
        </span>

        <h1>
          Plagiarism Reports
        </h1>

        <p>
          View the latest generated plagiarism analysis.
        </p>


        {!result ? (

          <div className="empty-report">

            <h2>
              No report available
            </h2>

            <p>
              Analyze a research paper to generate a report.
            </p>

            <Link
              to="/analysis"
              className="report-btn"
            >
              Start Analysis
            </Link>

          </div>

        ) : (

          <div className="report-card">

            <div className="report-header">

              <div>

                <strong>
                  PaperCheck
                </strong>

                <small>
                  DSA Research Project
                </small>

              </div>

              <button
                onClick={() => window.print()}
              >
                Print Report
              </button>

            </div>


            <hr />


            <h2>
              {result.uploadedFile}
            </h2>


            <div className="report-stat-grid">

              <div>
                <strong>
                  {result.overallSimilarity}%
                </strong>

                <span>
                  Similarity
                </span>
              </div>

              <div>
                <strong>
                  {result.totalReferencePapers}
                </strong>

                <span>
                  Reference Papers
                </span>
              </div>

              <div>
                <strong>
                  {result.kGramSize}
                </strong>

                <span>
                  K-Gram Size
                </span>
              </div>

            </div>


            <h3>
              Top Matching Papers
            </h3>


            {result.matches.map(
              paper => (

                <div
                  className="report-row"
                  key={paper.filename}
                >

                  <span>
                    {paper.filename}
                  </span>

                  <strong>
                    {paper.similarity}%
                  </strong>

                </div>

              )
            )}

          </div>

        )}

      </main>

    </div>

  );
}

export default Reports;