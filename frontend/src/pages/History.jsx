import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import "./History.css";

function History() {

  const navigate = useNavigate();

  const [history, setHistory] =
    useState([]);


  useEffect(() => {

    loadHistory();

  }, []);


  const loadHistory = () => {

    const stored =
      localStorage.getItem(
        "paperCheckHistory"
      );

    if (!stored) {

      setHistory([]);

      return;
    }

    try {

      setHistory(
        JSON.parse(stored)
      );

    } catch {

      setHistory([]);
    }
  };


  const clearHistory = () => {

    localStorage.removeItem(
      "paperCheckHistory"
    );

    setHistory([]);
  };


  return (

    <div className="history-page">

      <div className="history-container">

        <div className="history-header">

          <div>

            <span className="page-label">
              ACTIVITY
            </span>

            <h1>
              Your history
            </h1>

            <p>
              Review your previous paper checks.
            </p>

          </div>


          <div className="history-actions">

            {history.length > 0 && (

              <button
                className="clear-history"
                onClick={clearHistory}
              >
                Clear History
              </button>

            )}

            <button
              className="history-button"
              onClick={() =>
                navigate("/analyze")
              }
            >
              Check New Paper
              <span>→</span>
            </button>

          </div>

        </div>


        {history.length === 0 ? (

          <div className="history-empty">

            <div className="history-empty-icon">
              ◷
            </div>

            <h2>
              No checks yet
            </h2>

            <p>
              Your completed paper analyses
              will appear here.
            </p>

            <button
              className="history-button"
              onClick={() =>
                navigate("/analyze")
              }
            >
              Check Your First Paper
            </button>

          </div>

        ) : (

          <div className="history-list">

            {history.map(
              (item, index) => (

                <div
                  className="history-item"
                  key={index}
                >

                  <div className="history-file-icon">
                    PDF
                  </div>


                  <div className="history-file">

                    <strong>
                      {item.fileName}
                    </strong>

                    <span>
                      {item.date}
                    </span>

                  </div>


                  <div className="history-score">

                    <strong>
                      {item.similarity}%
                    </strong>

                    <span>
                      similarity
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default History;