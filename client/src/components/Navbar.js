function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="/">
          Library Tracker
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <a className="nav-link active" href="/">
                Profile
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/library">
                Login
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/games">
                Register
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;