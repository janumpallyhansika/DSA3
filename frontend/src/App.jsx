import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import History from "./pages/History";

import "./App.css";

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("paperCheckLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="app">

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED APPLICATION */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>

              <Navbar />

              <main className="main-content">

                <Routes>

                  <Route
                    path="/"
                    element={<Home />}
                  />

                  <Route
                    path="/analyze"
                    element={<Analysis />}
                  />

                  <Route
                    path="/results"
                    element={<Results />}
                  />

                  <Route
                    path="/history"
                    element={<History />}
                  />

                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/"
                        replace
                      />
                    }
                  />

                </Routes>

              </main>

              <footer className="footer">

                <div className="footer-inner">

                  <div className="footer-brand">

                    <div className="footer-logo">
                      P
                    </div>

                    <span>
                      PaperCheck
                    </span>

                  </div>

                  <p>
                    Research Paper Similarity Checker
                  </p>

                  <p className="footer-copy">
                    © 2026 PaperCheck
                  </p>

                </div>

              </footer>

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;