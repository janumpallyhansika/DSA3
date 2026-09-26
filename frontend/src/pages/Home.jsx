import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const user =
    localStorage.getItem(
      "paperCheckUser"
    );

  const displayName =
    user
      ? user.split("@")[0]
      : "there";

  return (

    <div className="home-page">

      <section className="hero">

        <div className="hero-glow glow-one"></div>

        <div className="hero-glow glow-two"></div>

        <div className="hero-content">

          <div className="status-pill">

            <span className="status-dot"></span>

            Research paper analysis

          </div>


          <p className="welcome-text">
            Welcome back, {displayName}
          </p>


          <h1>

            Check your research paper

            <span>
              with confidence.
            </span>

          </h1>


          <p className="hero-description">

            Upload your research paper and
            receive a clear similarity report
            against your reference collection.

          </p>


          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() =>
                navigate("/analyze")
              }
            >
              Check Your Paper
              <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                navigate("/history")
              }
            >
              View History
            </button>

          </div>


          <div className="hero-note">

            PDF files • Secure processing • Fast results

          </div>

        </div>

      </section>


      <section className="features-section">

        <div className="section-heading">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            From paper to result
          </h2>

          <p>
            A straightforward way to review
            content similarity in your research
            documents.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <div className="feature-icon">
              ↑
            </div>

            <h3>
              Upload
            </h3>

            <p>
              Select your research paper in
              PDF format and start the analysis.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <div className="feature-icon">
              ◌
            </div>

            <h3>
              Analyze
            </h3>

            <p>
              Your document is compared with
              the available reference collection.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Review
            </h3>

            <p>
              View the similarity score and
              documents with the closest matches.
            </p>

          </div>

        </div>

      </section>


      <section className="cta-section">

        <div className="cta-card">

          <div>

            <span className="cta-label">
              READY TO CHECK?
            </span>

            <h2>
              Analyze your research paper.
            </h2>

            <p>
              Upload a PDF and get your report.
            </p>

          </div>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/analyze")
            }
          >
            Upload Paper
            <span>→</span>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;