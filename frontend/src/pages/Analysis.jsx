import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Analysis.css";

function Analysis() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE FILE SELECTION
  // ==========================================

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    // Check PDF
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      setFile(null);
      return;
    }

    // Maximum file size: 50 MB
    const maxSize = 50 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("PDF file must be smaller than 50 MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  // ==========================================
  // ANALYZE PAPER
  // ==========================================

  const analyzePaper = async () => {
    if (!file) {
      setError("Please upload a research paper first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create form data
      const formData = new FormData();

      formData.append("paper", file);

      // Send PDF to Node.js backend
      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          body: formData
        }
      );

      // Read response safely
      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned an invalid response. Response: ${responseText.substring(
            0,
            200
          )}`
        );
      }

      // Backend returned an error
      if (!response.ok) {
        throw new Error(
          data.error || "Analysis failed."
        );
      }

      // Save result
      sessionStorage.setItem(
        "plagiarismResult",
        JSON.stringify(data)
      );

      // Go to results page
      navigate("/results");

    } catch (err) {
      console.error("Analysis Error:", err);

      setError(
        err.message ||
          "Unable to analyze the paper. Make sure the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="analysis-page">

      <Navbar />

      <main className="analysis-container">

        {/* ================================
            HEADING
        ================================= */}

        <div className="analysis-heading">

          <span>
            RESEARCH PAPER ANALYSIS
          </span>

          <h1>
            Analyze Your Research Paper
          </h1>

          <p>
            Upload your research paper and compare it
            with the reference dataset using Rolling Hash
            and Rabin-Karp string matching.
          </p>

        </div>


        <div className="analysis-grid">

          {/* ================================
              UPLOAD CARD
          ================================= */}

          <div className="upload-card">

            <div className="upload-icon">
              ↑
            </div>

            <h2>
              Upload Research Paper
            </h2>

            <p>
              Select a PDF research paper to begin analysis.
            </p>


            {/* FILE SELECT */}

            <label className="file-label">

              Choose PDF

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFile}
              />

            </label>


            {/* SELECTED FILE */}

            {file && (

              <div className="selected-file">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="error-message">
                {error}
              </div>

            )}


            {/* ANALYZE BUTTON */}

            <button
              className="analyze-button"
              onClick={analyzePaper}
              disabled={loading || !file}
            >

              {loading
                ? "Running Rabin-Karp..."
                : "Analyze Paper →"
              }

            </button>

          </div>


          {/* ================================
              DSA PIPELINE
          ================================= */}

          <div className="method-card">

            <span>
              DSA PIPELINE
            </span>

            <h2>
              How your paper is analyzed
            </h2>


            {/* STEP 1 */}

            <div className="method-step">

              <b>01</b>

              <div>

                <h3>
                  PDF Text Extraction
                </h3>

                <p>
                  Text is extracted from the uploaded PDF.
                </p>

              </div>

            </div>


            {/* STEP 2 */}

            <div className="method-step">

              <b>02</b>

              <div>

                <h3>
                  Text Preprocessing
                </h3>

                <p>
                  Text is normalized and divided into words.
                </p>

              </div>

            </div>


            {/* STEP 3 */}

            <div className="method-step">

              <b>03</b>

              <div>

                <h3>
                  Rolling Hash
                </h3>

                <p>
                  Hash values are calculated for overlapping
                  k-word windows.
                </p>

              </div>

            </div>


            {/* STEP 4 */}

            <div className="method-step">

              <b>04</b>

              <div>

                <h3>
                  Rabin-Karp Matching
                </h3>

                <p>
                  Hashes are compared to identify matching
                  text patterns.
                </p>

              </div>

            </div>


            {/* STEP 5 */}

            <div className="method-step">

              <b>05</b>

              <div>

                <h3>
                  Similarity Report
                </h3>

                <p>
                  Matching papers and similarity percentage
                  are displayed.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Analysis;