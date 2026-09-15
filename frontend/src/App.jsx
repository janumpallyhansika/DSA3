import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Dataset from "./pages/Dataset";
import Algorithm from "./pages/Algorithm";
import Reports from "./pages/Reports";

import "./App.css";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            LOGIN PAGE
        ========================= */}

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                onLogin={() =>
                  setIsLoggedIn(true)
                }
              />
            )
          }
        />


        {/* =========================
            HOME PAGE
        ========================= */}

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home
                onLogout={() =>
                  setIsLoggedIn(false)
                }
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            ANALYSIS PAGE
        ========================= */}

        <Route
          path="/analysis"
          element={
            isLoggedIn ? (
              <Analysis />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            RESULTS PAGE
        ========================= */}

        <Route
          path="/results"
          element={
            isLoggedIn ? (
              <Results />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            DATASET PAGE
        ========================= */}

        <Route
          path="/dataset"
          element={
            isLoggedIn ? (
              <Dataset />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            ALGORITHM PAGE
        ========================= */}

        <Route
          path="/algorithm"
          element={
            isLoggedIn ? (
              <Algorithm />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            REPORTS PAGE
        ========================= */}

        <Route
          path="/reports"
          element={
            isLoggedIn ? (
              <Reports />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            UNKNOWN URL
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                isLoggedIn
                  ? "/"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;