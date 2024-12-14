import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navigation: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible((prevState) => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div
          className={`navbar-collapse ${isNavVisible ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="nav-container navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={getLinkClass("/")} data-text="Home">
                <span className="actual-text">&nbsp;Home&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Home&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={getLinkClass("/about")}
                data-text="About"
              >
                <span className="actual-text">&nbsp;About&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;About&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/project"
                className={getLinkClass("/project")}
                data-text="Project"
              >
                <span className="actual-text">&nbsp;Project&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Project&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={getLinkClass("/contact")}
                data-text="Contact"
              >
                <span className="actual-text">&nbsp;Contact&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Contact&nbsp;
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <label className="hamburger navbar-toggler" htmlFor="menuToggle">
        <input
          type="checkbox"
          id="menuToggle"
          checked={isNavVisible}
          onChange={toggleNav}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>
    </nav>
  );
};

export default Navigation;
