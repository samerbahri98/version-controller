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
import IFileBlob from "../../Interfaces/IFileBlob";
import { useFetchFileBlob, useFileBlob } from "../../Contexts/FileBlobContext";
import InfoModal from "../../Components/Components/InfoModal";

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
	const fileBlobLayout = useFileBlob();
	const fetchFileBlobLayout = useFetchFileBlob();
	const fetchRepoLayout = useFetchRepo();
	const [folder, setFolder] = useState<ITableCell[]>([]);
	const location = useLocation();
	const repository_id = location.pathname.split("/")[2];
	const [readme, setReadme] = useState<IFileBlob | null>();
	const [hasReadme, setHasReadme] = useState<boolean>(false);

	useEffect(() => {
		if (fetchRepoLayout)
			fetchRepoLayout({
				repository_id,
			});
	}, []);

	useEffect(() => {
		if (repoLayout) {
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
							link: `/repo/${repository_id}/blob/${repoLayout.branches[0]}/${repoLayout.masterHeadCommit.tree.path}/${f}`,
						} as ITableCell)
				),
			]);
			const readmeArray = repoLayout.masterHeadCommit.tree.files.filter(
				(f) => f.toUpperCase() === "README.MD"
			);
			if (fetchFileBlobLayout && readmeArray.length > 0) {
				fetchFileBlobLayout({
					repository_id,
					path: readmeArray[0],
					branch_name: repoLayout.branches[0],
				});
			}
		}
	}, [repoLayout]);

	return (
		<div className="notification">
			<InfoModal />
			<nav className="panel">
				<p className="panel-heading">{repoLayout?.repository_name}</p>
				<RepoSettingsBar repo={repoLayout}/>
				{renderSwitch(dashboardLayout, folder)}
			</nav>
			{hasReadme ? (
				<nav className="panel">
					<p className="panel-heading">Readme.md</p>
					<div className="panel-block">
						<div className="content">
							<ReactMarkdown children={readme?.content || ""} remarkPlugins={[gfm]} />
						</div>
					</div>
				</nav>
			) : (
				<></>
			)}
		</div>
	);
}

export default Repo;
