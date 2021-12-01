import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <FontAwesomeIcon icon={faCodeBranch} size="2x" />
          <p style={{ fontSize: "24px" }}>&nbsp;Version Controller</p>
        </a>

        <button
          role="button"
          className={!active ? "navbar-burger" : "navbar-burger is-active"}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setActive(!active)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={!active ? "navbar-menu" : "navbar-menu is-active"}
      >
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Samer Bahri</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Ssh</a>
              <a className="navbar-item">Help</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
