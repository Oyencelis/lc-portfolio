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

  const closeNav = () => {
    setIsNavVisible(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNav}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div
          className={`navbar-collapse ${isNavVisible ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="nav-container navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={getLinkClass("/")} onClick={closeNav} data-text="Home">
                <span className="actual-text">&nbsp;Home&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Home&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/projects"
                className={getLinkClass("/projects")}
                onClick={closeNav}
                data-text="Projects"
              >
                <span className="actual-text">&nbsp;Projects&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Projects&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/testimonial"
                className={getLinkClass("/testimonial")}
                onClick={closeNav}
                data-text="Testimonials"
              >
                <span className="actual-text">&nbsp;Testimonials&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Testimonials&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={getLinkClass("/contact")}
                onClick={closeNav}
                data-text="Contact"
              >
                <span className="actual-text">&nbsp;Contacts&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Contacts&nbsp;
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/resource"
                className={getLinkClass("/resource")}
                onClick={closeNav}
                data-text="Resource"
              >
                <span className="actual-text">&nbsp;Resources&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Resources&nbsp;
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
