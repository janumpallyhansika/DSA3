import {
  useRef,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import "./Analysis.css";

function Analysis() {

  const navigate = useNavigate();

  const fileInputRef =
    useRef(null);

  const [file, setFile] =
    useState(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleFile = (selectedFile) => {

    setError("");

    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.name
        .toLowerCase()
        .endsWith(".pdf")
    ) {

      setError(
        "Please select a PDF file."
      );

      setFile(null);

      return;
    }

    const maxSize =
      50 * 1024 * 1024;

    if (
      selectedFile.size > maxSize
    ) {

      setError(
        "The PDF must be smaller than 50 MB."
      );

      setFile(null);

      return;
    }

    setFile(selectedFile);
  };


  const handleInputChange = (event) => {

    const selectedFile =
      event.target.files?.[0];

    handleFile(selectedFile);
  };


  const handleDrop = (event) => {

    event.preventDefault();

    const droppedFile =
      event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };


  const removeFile = () => {

    setFile(null);

    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const analyzePaper = async () => {

    if (!file) {

      setError(
        "Please select a research paper first."
      );

      return;
    }

    setLoading(true);

    setError("");

    try {

      const formData =
        new FormData();

      formData.append(
        "paper",
        file
      );


      const response =
        await fetch(
          "http://localhost:5000/api/analyze",
          {
            method: "POST",
            body: formData
          }
        );


      const responseText =
        await response.text();


      let data;

      try {

        data =
          JSON.parse(
            responseText
          );

      } catch {

        throw new Error(
          "The server returned an invalid response."
        );
      }


      if (!response.ok) {

        throw new Error(
          data.details ||
          data.error ||
          "Analysis failed."
        );
      }


      sessionStorage.setItem(
        "plagiarismResult",
        JSON.stringify(data)
      );


      saveToHistory(data);


      navigate(
        "/results"
      );

    } catch (error) {

      console.error(
        "Analysis Error:",
        error
      );

      setError(
        error.message ||
        "Unable to connect to the analysis server."
      );

    } finally {

      setLoading(false);
    }
  };


  const saveToHistory = (data) => {

    const existing =
      localStorage.getItem(
        "paperCheckHistory"
      );

    let history = [];

    try {

      history =
        existing
          ? JSON.parse(existing)
          : [];

    } catch {

      history = [];
    }


    const historyItem = {

      fileName:
        data.uploadedFile ||
        file.name,

      similarity:
        Number(
          data.overallSimilarity || 0
        ).toFixed(2),

      date:
        new Date().toLocaleString()

    };


    history.unshift(
      historyItem
    );


    localStorage.setItem(
      "paperCheckHistory",
      JSON.stringify(
        history.slice(0, 20)
      )
    );
  };


  return (

    <div className="analysis-page">

      <div className="analysis-container">

        <div className="analysis-heading">

          <span className="page-label">
            DOCUMENT CHECK
          </span>

          <h1>
            Check your paper
          </h1>

          <p>
            Upload a research paper in PDF format
            to begin the analysis.
          </p>

        </div>


        <div
          className={
            file
              ? "upload-card has-file"
              : "upload-card"
          }

          onDrop={handleDrop}

          onDragOver={handleDragOver}

          onClick={() =>
            !file &&
            fileInputRef.current?.click()
          }
        >

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInputChange}
            hidden
          />


          {!file ? (

            <>

              <div className="upload-icon">
                ↑
              </div>

              <h2>
                Drop your PDF here
              </h2>

              <p>
                or click to browse your files
              </p>

              <button
                type="button"
                className="browse-button"

                onClick={(event) => {

                  event.stopPropagation();

                  fileInputRef.current?.click();

                }}
              >
                Choose PDF
              </button>

              <span className="upload-limit">
                PDF only • Maximum 50 MB
              </span>

            </>

          ) : (

            <div className="selected-file">

              <div className="file-icon">
                PDF
              </div>

              <div className="file-details">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {(
                    file.size /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </span>

              </div>

              <button
                type="button"
                className="remove-file"

                onClick={(event) => {

                  event.stopPropagation();

                  removeFile();

                }}
              >
                ×
              </button>

            </div>

          )}

        </div>


        {error && (

          <div className="error-message">

            <span>
              !
            </span>

            {error}

          </div>

        )}


        <button
          className="analyze-button"

          disabled={
            !file ||
            loading
          }

          onClick={analyzePaper}
        >

          {loading ? (

            <>
              <span className="spinner"></span>
              Analyzing...
            </>

          ) : (

            <>
              Check Paper
              <span>→</span>
            </>

          )}

        </button>


        {loading && (

          <div className="processing-card">

            <div className="processing-spinner"></div>

            <div>

              <strong>
                Analyzing your paper
              </strong>

              <p>
                Preparing your similarity report...
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Analysis;