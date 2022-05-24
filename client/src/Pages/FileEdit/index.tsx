import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BlobSettingsBar from "../../Components/Components/BlobSettingsBar";
import { useFetchFileBlob, useFileBlob } from "../../Contexts/FileBlobContext";
import IFileBlob from "../../Interfaces/IFileBlob";
import { CopyBlock } from "react-code-blocks";
import Editor from "@monaco-editor/react";
import { Field, Form, Formik } from "formik";
import FieldForm from "../../Components/Form/FieldForm";
import { gql, useMutation } from "@apollo/client";
import {
	ICreateCommitFields,
	ICreateCommitResponse,
} from "../../Interfaces/ICommit";

const PUSH_COMMIT_MUTATION = gql`
	mutation (
		$repository_id: String!
		$branch: String!
		$path: String!
		$name: String!
		$content: String!
		$commit_message: String!
	) {
		createCommit(
			createCommitInput: {
				repository_id: $repository_id
				branch: $branch
				path: $path
				name: $name
				content: $content
				commit_message: $commit_message
			}
		) {
			hash
			commitMessage
			tree {
				trees
				branch {
					name
				}
				files
			}
		}
	}
`;

function FileEdit() {
	const fileBlobLayout = useFileBlob();
	const fetchFileBlobLayout = useFetchFileBlob();
	const [fileBlob, setFileBlob] = useState<IFileBlob>();
	const location = useLocation();
	const repository_id = location.pathname.split("/")[2];
	const branch_name = location.pathname.split("/")[4];
	const path = location.pathname.split("/").slice(5).join("/");
	const dir = path.split("/").slice(0, -1).join("/");
	const filename = path.split("/").at(-1) || "";
	const editPath = `/repo/${repository_id}/edit/${branch_name}/${path}`;

	const editorRef = useRef();
	function handleEditorDidMount(editor: any, monaco: any) {
		editorRef.current = editor;
	}

	useEffect(() => {
		if (fetchFileBlobLayout)
			fetchFileBlobLayout({
				repository_id,
				branch_name,
				path,
			});
	}, []);

	const [submitPushCommit, { data, error, loading }] = useMutation<
		ICreateCommitResponse,
		ICreateCommitFields
	>(PUSH_COMMIT_MUTATION, {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	});
	useEffect(() => {
		if (fileBlobLayout) {
			setFileBlob(fileBlobLayout);
		}
	}, [fileBlobLayout]);

	useEffect(() => {
		
	}, [data]);

	return (
		<Formik
			initialValues={{
				branch: branch_name,
				path: dir,
				name: filename,
				commit_message: "",
				repository_id: repository_id,
				content: fileBlob?.content as string,
			}}
			onSubmit={async (values: ICreateCommitFields) => {
				submitPushCommit({ variables: values });
			}}
		>
			{({ values, setFieldValue }) => (
				<Form>
					<div className="notification">
						<nav className="panel">
							<p className="panel-heading">Commit</p>
							<div className="panel-block">
								<FieldForm
									className="input"
									type="text"
									name="name"
									label="File Name"
									placeholder="name"
									value={values.name}
								/>
							</div>
							<div className="panel-block">
								<FieldForm
									className="input"
									type="text"
									name="path"
									label="Path"
									placeholder="path"
									value={values.path}
								/>
							</div>
							<div className="panel-block">
								<Editor
									onMount={handleEditorDidMount}
									height="60vh"
									defaultValue={fileBlob?.content}
									onChange={(value) => setFieldValue("content", value)}
								/>
							</div>
							<div className="panel-block">
								<FieldForm
									className="input"
									type="text"
									name="commit_message"
									label="Commit Message"
									placeholder="Commit Message"
									value={values.commit_message}
								/>
							</div>
							<div className="panel-block">
								<button type="submit" className="button is-primary">
									Push
								</button>
							</div>
						</nav>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default FileEdit;
