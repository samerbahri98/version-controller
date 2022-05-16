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
function Repo() {
	const dashboardLayout = useDashboardLayout();
	const repoLayout = useRepo();
	const fetchRepoLayout = useFetchRepo();
	const [folder, setFolder] = useState<ITableCell[]>([]);
	const location = useLocation();
	const repository_id = location.pathname.split("/")[2];
	useEffect(() => {
		if (fetchRepoLayout)
			fetchRepoLayout({
				repository_id,
			});
	}, []);

	useEffect(() => {
		if (repoLayout)
			setFolder([
				...repoLayout.masterHeadCommit.tree.trees.map(
					(f) =>
						({
							id: f,
							name: f,
							icon: faFolder,
							link: `/repo/${repository_id}/tree/${repoLayout.branches[0]}/${repoLayout.masterHeadCommit.tree.path}/${f}`,
						} as ITableCell)
				),
				...repoLayout.masterHeadCommit.tree.files.map(
					(f) =>
						({
							id: f,
							name: f,
							icon: faFile,
							link: `/repo/${repository_id}/blob/${f}`,
						} as ITableCell)
				),
			]);
	}, [repoLayout]);

	return (
		<div className="notification">
			{/* <InfoModal /> */}
			<nav className="panel">
				<p className="panel-heading">{repoLayout?.repository_name}</p>
				<RepoSettingsBar />
				{renderSwitch(dashboardLayout, folder)}
			</nav>

			{/* <nav className="panel">
				<p className="panel-heading">Readme.md</p>
				<div className="panel-block">
					<div className="content">
						<ReactMarkdown children={md} remarkPlugins={[gfm]} />
					</div>
				</div>
			</nav> */}
		</div>
	);
}

export default Repo;
