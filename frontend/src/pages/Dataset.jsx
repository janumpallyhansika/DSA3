import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Dataset.css";

function Dataset() {

  const [papers, setPapers] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/dataset")
      .then(response => response.json())
      .then(data => {

        setPapers(
          data.papers || []
        );

      })
      .catch(() => {

        setPapers([]);

      });

  }, []);


  return (

    <div className="dataset-page">

      <Navbar />

      <main className="dataset-container">

        <span>
          REFERENCE DATASET
        </span>

        <h1>
          Research Paper Dataset
        </h1>

        <p>
          These papers are used as the reference corpus
          for plagiarism comparison.
        </p>


        <div className="dataset-count">

          {papers.length}

          <small>
            papers currently loaded
          </small>

        </div>


        <div className="paper-list">

          {papers.map(
            (paper, index) => (

              <div
                className="paper-item"
                key={paper}
              >

                <span>
                  {String(index + 1).padStart(3, "0")}
                </span>

                <strong>
                  {paper}
                </strong>

                <small>
                  DSA Research Paper
                </small>

              </div>

            )
          )}

          {papers.length === 0 && (

            <div className="empty-dataset">

              No PDF papers found.

              <br />

              Add your research papers to:

              <code>
                dataset/research_papers
              </code>

            </div>

          )}

        </div>

      </main>

    </div>

  );
}

export default Dataset;