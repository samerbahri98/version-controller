import { faList, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import {
  DashboardLayoutContext,
  DashboardLayoutProvider,
  useDashboardLayout,
  useDashboardLayoutUpdateContext,
} from "../../../Contexts/DashboardContexts";

function SettingsBar() {
  const dashboardLayout = useDashboardLayout();
  const dashboardLayoutUpdate = useDashboardLayoutUpdateContext();

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
            className={`button is-small ${
              dashboardLayout === "Table" ? "is-primary" : ""
            }`}
            onClick={() =>
              dashboardLayoutUpdate ? dashboardLayoutUpdate("Table") : null
            }
          >
            <span className="icon">
              <FontAwesomeIcon icon={faList} />
            </span>
          </div>
          <div
            className={`button is-small ${
              dashboardLayout === "Matrix" ? "is-primary" : ""
            }`}
            onClick={() =>
              dashboardLayoutUpdate ? dashboardLayoutUpdate("Matrix") : null
            }
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
