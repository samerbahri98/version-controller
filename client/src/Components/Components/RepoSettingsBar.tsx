import { faList, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import {
	useDashboardLayout,
	useDashboardLayoutUpdateContext,
	useToggleAddRepoContext,
  useToggleInfoRepoContext,
} from "../../Contexts/DashboardContexts";
import { useSortUpdateRepoListContext } from "../../Contexts/UserContexts";
import { IRepo } from "../../Interfaces/IRepo";

interface IRepoSettingsBarInput{
  repo: IRepo | null | undefined
}

function RepoSettingsBar({repo}:IRepoSettingsBarInput) {
	const dashboardLayout = useDashboardLayout();
	const dashboardLayoutUpdate = useDashboardLayoutUpdateContext();
	const toggleInfoRepo = useToggleInfoRepoContext();
	const sortRepoList = useSortUpdateRepoListContext();

	return (
		<>
			<div className="panel-block">
				<div className="control navbar-item">
					<span>
						<div
							className="button is-primary is-small"
							onClick={() => toggleInfoRepo(repo || false)}
						>
							Download
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
        <span>
						<div
							className="button is-primary is-small"
							onClick={() => toggleInfoRepo(true)}
						>
							New File
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
