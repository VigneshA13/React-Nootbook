import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary "
      data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Add Notes
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={logout}>
            <button className="btn btn-outline-light" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
