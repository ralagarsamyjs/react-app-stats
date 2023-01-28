import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          WEALTH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/starwars">
              Startwars
            </NavLink>
            <NavLink className="nav-item nav-link" to="/cats">
              Cats
            </NavLink>
            <NavLink className="nav-item nav-link" to="/covid">
              Covid
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
