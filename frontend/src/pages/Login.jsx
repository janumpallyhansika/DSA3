import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleLogin = (event) => {

    event.preventDefault();

    setError("");

    if (!email.trim()) {

      setError(
        "Please enter your email address."
      );

      return;
    }

    if (!password.trim()) {

      setError(
        "Please enter your password."
      );

      return;
    }

    /*
     * Temporary frontend authentication.
     *
     * Real authentication will be connected
     * to the backend later.
     */

    localStorage.setItem(
      "paperCheckLoggedIn",
      "true"
    );

    localStorage.setItem(
      "paperCheckUser",
      email.trim()
    );

    navigate(
      "/",
      { replace: true }
    );
  };


  return (

    <div className="login-page">

      <div className="login-background">

        <div
          className="login-glow login-glow-one"
        ></div>

        <div
          className="login-glow login-glow-two"
        ></div>

      </div>


      <div className="login-wrapper">

        <div className="login-brand">

          <div className="login-logo">
            P
          </div>

          <span>
            PaperCheck
          </span>

        </div>


        <div className="login-card">

          <div className="login-heading">

            <span className="login-label">
              WELCOME BACK
            </span>

            <h1>
              Sign in to PaperCheck
            </h1>

            <p>
              Access your research paper
              similarity workspace.
            </p>

          </div>


          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <div className="input-group">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="input-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    setError(
                      "Password recovery will be added with backend authentication."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>


              <div className="password-input">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {error && (

              <div className="login-error">

                <span>
                  !
                </span>

                {error}

              </div>

            )}


            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          <div className="login-divider">

            <span></span>

            <p>
              Secure document workspace
            </p>

            <span></span>

          </div>


          <div className="login-footer-text">

            Your research documents are
            processed for similarity analysis.

          </div>

        </div>


        <p className="login-copyright">
          PaperCheck • Research Paper Similarity Checker
        </p>

      </div>

    </div>
  );
}

export default Login;