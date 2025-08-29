import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div className="container">
        <Link to='/' className="navbar-brand">
          <img src="images/logo.svg" alt="Logo" style={{ width: "120px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to='/signup'>
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/about'>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/product'>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/pricing'>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/support'>
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
