import { faList, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SettingsBar() {
  return (
    <>
      <div className="panel-block">
        <div
          className="button is-primary is-small"
          // onClick={this.add}
        >
          Add Repository
        </div>
        <p className="control navbar-item">
          <span>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="select sort is-small">
                <select
                //   onChange={(e) => {
                //     this.props.select(e.target.value);
                //   }}
                >
                  <option value="NO">Date (Newest)</option>
                  <option value="ON">Date (Oldest)</option>
                  <option value="AZ">Name (A-Z)</option>
                  <option value="ZA">Name (Z-A)</option>
                </select>
              </span>
            </div>
          </span>
        </p>
        <span className="navbar-item">
          <div
            className="button is-small"
            //   className={this.state.listBtn}  onClick={this.setList}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faList} />
            </span>
          </div>
          <div
            className="button is-small"
            //   className={this.state.matrixBtn} onClick={this.setMatrix}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faTh} />
            </span>
          </div>
        </span>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
      </div>
    </>
  );
}

export default SettingsBar;
