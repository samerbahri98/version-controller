import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Dashboard() {
  return (
    <div className="notification">
      <nav className="panel">
        <p className="panel-heading">Repositories</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Search" />
            <span className="icon is-left">
              {/* <i className="fas fa-search" aria-hidden="true"></i> */}
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </p>
        </div>
        <p className="panel-tabs">
          <a className="is-active">All</a>
          <a>Public</a>
          <a>Private</a>
          <a>Sources</a>
          <a>Forks</a>
        </p>
        <a className="panel-block">
          <span className="panel-icon">
            <FontAwesomeIcon icon={faBook} />
          </span>
          bulma
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <FontAwesomeIcon icon={faBook} />
          </span>
          marksheet
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <FontAwesomeIcon icon={faBook} />
          </span>
          minireset.css
        </a>
        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </nav>
    </div>
  );
}
