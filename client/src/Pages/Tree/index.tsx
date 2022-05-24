import {
	faFile,
	faFolder,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import RepoSettingsBar from "../../Components/Components/RepoSettingsBar";
import SettingsBar from "../../Components/Components/SettingsBar";
import Matrix from "../../Components/Table/Matrix";
import Table from "../../Components/Table/Table";
import { useDashboardLayout } from "../../Contexts/DashboardContexts";
import { useReposList } from "../../Contexts/UserContexts";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
	RepoLayoutProvider,
	useFetchRepo,
	useRepo,
} from "../../Contexts/RepoContext";
import { useLocation } from "react-router";
import { useFetchTree, useTree } from "../../Contexts/TreeContext";
import { Link } from "react-router-dom";

const renderSwitch = (param: string | null, records: ITableCell[]) => {
	switch (param) {
		case "Table":
			return <Table records={records} />;
		case "Matrix":
			return <Matrix records={records} />;
		default:
			return <> </>;
	}
};

function Tree() {
	const dashboardLayout = useDashboardLayout();
	const treeLayout = useTree();
	const fetchTreeLayout = useFetchTree();
	const [folder, setFolder] = useState<ITableCell[]>([]);
	const location = useLocation();
	const repository_id = location.pathname.split("/")[2];
	const branch_name = location.pathname.split("/")[4];
	const path = location.pathname.split("/").slice(5).join("/") + "/";


	useEffect(() => {
		if (fetchTreeLayout)
			fetchTreeLayout({
				repository_id,
				branch_name,
				path,
			});
	}, []);

	useEffect(() => {
		if (treeLayout)
			setFolder([
				...treeLayout.files.map(
					(f) =>
						({
							id: f,
							name: f,
							icon: faFile,
							link: `/repo/${repository_id}/blob/${branch_name}/${treeLayout.path}${f}`,
						} as ITableCell)
				),
				...treeLayout.trees.map(
					(f) =>
						({
							id: f,
							name: f,
							icon: faFolder,
							link: `/repo/${repository_id}/tree/${treeLayout.path}/${f}`,
						} as ITableCell)
				),
			]);
	}, [treeLayout]);

	return (
		<div className="notification">
			{/* <InfoModal /> */}
			<nav className="panel">
				<Link to={`/repo/${repository_id}`} style={{ textDecoration: "none" }}>
					<p className="panel-heading">{treeLayout?.path}</p>
				</Link>
				{/* <RepoSettingsBar /> */}
				{renderSwitch(dashboardLayout, folder)}
			</nav>
		</div>
	);
}

export default Tree;
