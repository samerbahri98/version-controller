import { faList, faSearch, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
	useDashboardLayout,
	useDashboardLayoutUpdateContext,
	useToggleAddRepoContext,
} from "../../Contexts/DashboardContexts";
import { useSortUpdateRepoListContext } from "../../Contexts/UserContexts";

function BlobSettingsBar() {
	const dashboardLayout = useDashboardLayout();
	const dashboardLayoutUpdate = useDashboardLayoutUpdateContext();
	const toggleAddRepoContext = useToggleAddRepoContext();
	const sortRepoList = useSortUpdateRepoListContext();

	return (
		<>
			<div className="panel-block">
				<Link to="" style={{ textDecoration: "none" }}><p className="button is-primary is-small">Edit</p></Link>
			</div>
		</>
	);
}

export default BlobSettingsBar;
function useSortUpdateRepoList() {
	throw new Error("Function not implemented.");
}
