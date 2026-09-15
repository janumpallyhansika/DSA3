import "./Login.css";

function Login({ onLogin }) {
  return (
    <div className="login-page">

      <div className="login-left">

        <div className="brand">
          <div className="brand-icon">P</div>

          <div>
            <h2>PaperCheck</h2>
            <span>DSA Research Platform</span>
          </div>
        </div>

        <div className="login-intro">
          <p className="small-title">DSA RESEARCH PROJECT</p>

          <h1>
            Research Paper
            <br />
            <span>Plagiarism Detection</span>
          </h1>

          <p className="intro-text">
            Analyze research papers and detect textual similarity
            using Rolling Hash and the Rabin-Karp algorithm.
          </p>

          <div className="login-features">
            <div>
              <strong>100+</strong>
              <span>Research Papers</span>
            </div>

            <div>
              <strong>Rabin-Karp</strong>
              <span>DSA Algorithm</span>
            </div>

            <div>
              <strong>PDF</strong>
              <span>Paper Analysis</span>
            </div>
          </div>
        </div>

      </div>


      <div className="login-right">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="brand-icon">P</div>
            <h2>PaperCheck</h2>
          </div>

          <p className="welcome-label">WELCOME BACK</p>

          <h2>Sign in to your account</h2>

          <p className="login-description">
            Sign in to continue to the research paper analysis platform.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />

            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-button"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="signin-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <p className="signup-text">
            Don't have an account?
            <button type="button">
              Create Account
            </button>
          </p>

          <div className="security-note">
            🔒 Your research documents are processed securely.
          </div>

        </div>

        <p className="copyright">
          © 2026 PaperCheck • DSA Research Project
        </p>

      </div>

    </div>
  );
}

export default Login;