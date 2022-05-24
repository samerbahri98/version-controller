import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BlobSettingsBar from "../../Components/Components/BlobSettingsBar";
import { useFetchFileBlob, useFileBlob } from "../../Contexts/FileBlobContext";
import IFileBlob from "../../Interfaces/IFileBlob";
import Editor from "@monaco-editor/react";

function FileBlob() {
	const fileBlobLayout = useFileBlob();
	const fetchFileBlobLayout = useFetchFileBlob();
	const [fileBlob, setFileBlob] = useState<IFileBlob>();
	const location = useLocation();
	const repository_id = location.pathname.split("/")[2];
	const branch_name = location.pathname.split("/")[4];
	const path = location.pathname.split("/").slice(5).join("/");

	const editPath = `/repo/${repository_id}/edit/${branch_name}/${path}`;

	useEffect(() => {
		if (fetchFileBlobLayout)
			fetchFileBlobLayout({
				repository_id,
				branch_name,
				path,
			});
	}, []);

	useEffect(() => {
		if (fileBlobLayout) {
			setFileBlob(fileBlobLayout);
		}
	}, [fileBlobLayout]);

	return (
		<div className="notification">
			{/* <InfoModal /> */}
			<nav className="panel">
				<Link to={`/repo/${repository_id}`} style={{ textDecoration: "none" }}>
				<p className="panel-heading">{fileBlob?.path}</p>
				</Link>
				<div className="panel-block">
					<Link to={editPath} style={{ textDecoration: "none" }}>
						<p className="button is-primary is-small">Edit</p>
					</Link>
				</div>
				<div className="panel-block">
					<Editor
						height="70vh"
						options={{ readOnly: true }}
						value={fileBlob?.content}
					/>
				</div>
			</nav>
		</div>
	);
}

export default FileBlob;
