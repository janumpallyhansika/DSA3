import {
  NavLink,
  useNavigate
} from "react-router-dom";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "paperCheckLoggedIn"
    );

    localStorage.removeItem(
      "paperCheckUser"
    );

    navigate(
      "/login",
      { replace: true }
    );
  };

  return (

    <header className="navbar">

      <div className="navbar-inner">

        <button
          className="brand"
          onClick={() =>
            navigate("/")
          }
        >

          <span className="brand-icon">
            P
          </span>

          <span className="brand-name">
            PaperCheck
          </span>

        </button>


        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/analyze"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Check Paper
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            History
          </NavLink>

        </nav>


        <div className="nav-actions">

          <button
            className="nav-action"
            onClick={() =>
              navigate("/analyze")
            }
          >
            Check Paper
            <span>→</span>
          </button>

          <button
            className="logout-button"
            onClick={logout}
            title="Sign out"
          >
            ↪
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;