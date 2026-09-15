import Navbar from "../components/Navbar";
import "./Algorithm.css";

function Algorithm() {
  return (
    <div className="algorithm-page">

      <Navbar />

      <main className="algorithm-container">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="algorithm-header">

          <span>
            DSA IMPLEMENTATION
          </span>

          <h1>
            Rolling Hash & Rabin-Karp
          </h1>

          <p className="algorithm-intro">
            PaperCheck uses Rolling Hash and Rabin-Karp string
            matching techniques to efficiently detect repeated
            text patterns between an uploaded research paper
            and the reference-paper dataset.
          </p>

        </div>


        {/* =====================================
            ALGORITHM FLOW
        ====================================== */}

        <section className="algorithm-flow">

          <div className="flow-item">

            <b>01</b>

            <h3>
              PDF Text
            </h3>

            <p>
              Extract text
            </p>

          </div>


          <div className="arrow">
            →
          </div>


          <div className="flow-item">

            <b>02</b>

            <h3>
              Preprocessing
            </h3>

            <p>
              Normalize words
            </p>

          </div>


          <div className="arrow">
            →
          </div>


          <div className="flow-item">

            <b>03</b>

            <h3>
              K-Grams
            </h3>

            <p>
              Create word windows
            </p>

          </div>


          <div className="arrow">
            →
          </div>


          <div className="flow-item">

            <b>04</b>

            <h3>
              Rolling Hash
            </h3>

            <p>
              Generate hashes
            </p>

          </div>


          <div className="arrow">
            →
          </div>


          <div className="flow-item">

            <b>05</b>

            <h3>
              Rabin-Karp
            </h3>

            <p>
              Find matches
            </p>

          </div>

        </section>


        {/* =====================================
            ROLLING HASH FORMULA
        ====================================== */}

        <section className="formula">

          <span>
            ROLLING HASH
          </span>

          <h2>
            H = (H × B + sᵢ) mod M
          </h2>

          <p>
            PaperCheck calculates a hash value for every
            overlapping k-word window. When the window moves,
            the rolling hash updates the value efficiently
            instead of calculating the complete hash again.
          </p>

          <div className="formula-details">

            <div>
              <strong>
                B
              </strong>

              <span>
                Hash base
              </span>
            </div>


            <div>
              <strong>
                M
              </strong>

              <span>
                Large prime modulus
              </span>
            </div>


            <div>
              <strong>
                K
              </strong>

              <span>
                K-gram size
              </span>
            </div>

          </div>

        </section>


        {/* =====================================
            ALGORITHM STEPS
        ====================================== */}

        <section className="algorithm-section">

          <div className="section-heading">

            <span>
              PROCESS
            </span>

            <h2>
              How the detection works
            </h2>

          </div>


          {/* STEP 1 */}

          <div className="algorithm-step">

            <div className="step-number">
              01
            </div>

            <div>

              <h3>
                PDF Text Extraction
              </h3>

              <p>
                The uploaded research paper is received by
                the Node.js backend. The PDF content is
                extracted using PDF text extraction before
                the plagiarism analysis begins.
              </p>

            </div>

          </div>


          {/* STEP 2 */}

          <div className="algorithm-step">

            <div className="step-number">
              02
            </div>

            <div>

              <h3>
                Text Preprocessing
              </h3>

              <p>
                Extracted text is converted to lowercase,
                unnecessary symbols are removed, spaces are
                normalized, and the text is divided into
                individual words.
              </p>

            </div>

          </div>


          {/* STEP 3 */}

          <div className="algorithm-step">

            <div className="step-number">
              03
            </div>

            <div>

              <h3>
                K-Gram Generation
              </h3>

              <p>
                The words are divided into overlapping
                groups of k words. PaperCheck currently
                uses a k-gram size of 8.
              </p>

              <div className="code-example">
                <code>
                  words[i ... i + k - 1]
                </code>
              </div>

            </div>

          </div>


          {/* STEP 4 */}

          <div className="algorithm-step">

            <div className="step-number">
              04
            </div>

            <div>

              <h3>
                Rolling Hash Calculation
              </h3>

              <p>
                Each k-word window is converted into a
                numerical hash value. When the window moves
                by one word, the hash is updated using the
                previous hash value.
              </p>

              <div className="code-example">
                <code>
                  currentHash = (currentHash * BASE + wordHash) % MOD
                </code>
              </div>

            </div>

          </div>


          {/* STEP 5 */}

          <div className="algorithm-step">

            <div className="step-number">
              05
            </div>

            <div>

              <h3>
                Rabin-Karp Matching
              </h3>

              <p>
                Hash values from the uploaded paper are
                compared with hash values generated from
                every reference paper. Matching hash values
                identify candidate matching text patterns.
              </p>

            </div>

          </div>


          {/* STEP 6 */}

          <div className="algorithm-step">

            <div className="step-number">
              06
            </div>

            <div>

              <h3>
                Similarity Calculation
              </h3>

              <p>
                The number of matching k-gram windows is
                compared with the total number of windows
                in the uploaded paper. The reference papers
                are then ranked according to their similarity.
              </p>

              <div className="code-example">
                <code>
                  Similarity = Matching Windows / Total Windows × 100
                </code>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            COMPLEXITY
        ====================================== */}

        <section className="complexity-section">

          <div className="section-heading">

            <span>
              COMPLEXITY ANALYSIS
            </span>

            <h2>
              Algorithm Performance
            </h2>

          </div>


          <div className="complexity">

            <div className="complexity-card">

              <span>
                ROLLING HASH
              </span>

              <strong>
                O(n)
              </strong>

              <p>
                Hash values are generated in linear time
                for the word sequence.
              </p>

            </div>


            <div className="complexity-card">

              <span>
                RABIN-KARP
              </span>

              <strong>
                O(n + m)
              </strong>

              <p>
                Expected time when hash values are stored
                and compared using a hash set.
              </p>

            </div>


            <div className="complexity-card">

              <span>
                HASH SPACE
              </span>

              <strong>
                O(n + m)
              </strong>

              <p>
                Space is required to store the rolling hash
                values used during comparison.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            IMPLEMENTATION DETAILS
        ====================================== */}

        <section className="implementation-card">

          <span>
            IMPLEMENTATION
          </span>

          <h2>
            PaperCheck DSA Configuration
          </h2>

          <div className="implementation-grid">

            <div>

              <small>
                ALGORITHM
              </small>

              <strong>
                Rolling Hash + Rabin-Karp
              </strong>

            </div>


            <div>

              <small>
                K-GRAM SIZE
              </small>

              <strong>
                8 Words
              </strong>

            </div>


            <div>

              <small>
                HASH BASE
              </small>

              <strong>
                257
              </strong>

            </div>


            <div>

              <small>
                MODULUS
              </small>

              <strong>
                1,000,000,007
              </strong>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Algorithm;