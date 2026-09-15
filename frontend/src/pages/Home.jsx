import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home({ onLogout }) {

  return (
    <div className="home-page">

      <Navbar onLogout={onLogout} />

      {/* HERO */}

      <section className="home-hero">

        <div className="home-container">

          <div className="hero-content">

            <span className="small-title">
              DSA RESEARCH PROJECT
            </span>

            <h1>
              Research Paper
              <br />
              <span>Plagiarism Detection</span>
            </h1>

            <p>
              Detect textual similarity between research papers using
              the Rabin-Karp algorithm and Rolling Hash techniques.
            </p>

            <div className="hero-buttons">

              <Link to="/analysis" className="primary-btn">
                Start Analysis →
              </Link>

              <Link to="/algorithm" className="secondary-btn">
                Learn How It Works
              </Link>

            </div>

          </div>


          {/* PAPER ILLUSTRATION */}

          <div className="paper-area">

            <div className="paper paper-back"></div>

            <div className="paper paper-main">

              <div className="paper-title">
                Research Paper
              </div>

              <div className="paper-line big"></div>
              <div className="paper-line"></div>
              <div className="paper-line"></div>

              <h5>ABSTRACT</h5>

              <div className="paper-line big"></div>
              <div className="paper-line"></div>
              <div className="paper-line"></div>

              <h5>METHODOLOGY</h5>

              <div className="paper-line"></div>
              <div className="paper-line big"></div>

            </div>

            <div className="search-circle">
              ⌕
            </div>

          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="stats">

        <div className="stat">
          <strong>100</strong>
          <span>Reference Papers</span>
        </div>

        <div className="stat">
          <strong>R-K</strong>
          <span>Rabin-Karp Algorithm</span>
        </div>

        <div className="stat">
          <strong>PDF</strong>
          <span>Paper Analysis</span>
        </div>

        <div className="stat">
          <strong>DSA</strong>
          <span>Core Algorithm</span>
        </div>

      </section>


      {/* PROJECT DESCRIPTION */}

      <section className="project-section">

        <div className="home-container">

          <div className="section-heading">

            <span className="small-title">
              ABOUT THE PROJECT
            </span>

            <h2>
              Efficient plagiarism detection using DSA
            </h2>

            <p>
              The system compares an uploaded research paper with
              a collection of reference research papers. It extracts
              text, creates k-grams, generates rolling hash values,
              and uses Rabin-Karp string matching to identify
              similar passages.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Upload Paper</h3>
              <p>
                Upload your research paper in PDF format.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Rolling Hash</h3>
              <p>
                Generate efficient hash values for text windows.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Rabin-Karp</h3>
              <p>
                Search matching text patterns efficiently.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Similarity Report</h3>
              <p>
                Display percentage and matching research papers.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;