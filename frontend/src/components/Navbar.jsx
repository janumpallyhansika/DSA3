import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    if (onLogout) {
      onLogout();
    }

    navigate("/login");
  };

  return (
    <header className="navbar">

      <Link to="/" className="navbar-brand">

        <div className="brand-icon">
          P
        </div>

        <div>
          <h2>PaperCheck</h2>
          <span>DSA Research Platform</span>
        </div>

      </Link>

      <nav className="navbar-links">

        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/analysis"
          className={location.pathname === "/analysis" ? "active" : ""}
        >
          Analyze
        </Link>

        <Link
          to="/dataset"
          className={location.pathname === "/dataset" ? "active" : ""}
        >
          Dataset
        </Link>

        <Link
          to="/algorithm"
          className={location.pathname === "/algorithm" ? "active" : ""}
        >
          Algorithm
        </Link>

        <Link
          to="/reports"
          className={location.pathname === "/reports" ? "active" : ""}
        >
          Reports
        </Link>

      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </header>
  );
}

export default Navbar;