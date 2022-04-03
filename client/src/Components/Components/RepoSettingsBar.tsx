import { faList, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import {
  useDashboardLayout,
  useDashboardLayoutUpdateContext,
  useToggleAddRepoContext,
} from "../../Contexts/DashboardContexts";
import { useSortUpdateRepoListContext } from "../../Contexts/UserContexts";

function RepoSettingsBar() {
  const dashboardLayout = useDashboardLayout();
  const dashboardLayoutUpdate = useDashboardLayoutUpdateContext();
  const toggleAddRepoContext = useToggleAddRepoContext();
  const sortRepoList = useSortUpdateRepoListContext();

  return (
    <>
      <div className="panel-block">
        <div
          className="button is-primary is-small"
          onClick={() => toggleAddRepoContext(true)}
        >
          Download
        </div>
        <div className="control navbar-item">
          <span>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="select sort is-small">
                <select
                  onChange={(e) =>
                    sortRepoList ? sortRepoList(e.target.value) : null
                  }
                >
                  <option value="NO">master</option>
                </select>
              </span>
            </div>
          </span>
          <span>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="select sort is-small">
                <select
                  onChange={(e) =>
                    sortRepoList ? sortRepoList(e.target.value) : null
                  }
                >
                  <option value="NO">f540479</option>
                </select>
              </span>
            </div>
          </span>
        </div>
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
    </>
  );
}

export default RepoSettingsBar;
function useSortUpdateRepoList() {
  throw new Error("Function not implemented.");
}
