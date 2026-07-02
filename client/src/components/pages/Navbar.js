import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          Library Tracker
        </Link>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;