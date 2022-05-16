import { ApolloConsumer, gql, useQuery } from "@apollo/client";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import IFileBlob, {
	IFileBlobQueryFields,
	IFileBlobQueryResponse,
} from "../Interfaces/IFileBlob";

const GET_FILEBLOB_DATA_QUERY = gql`
	query findFileByBranchQuery(
		$repository_id: String!
		$branch_name: String!
		$path: String!
	) {
		findFileByBranch(
			repository_id: $repository_id
			branch_name: $branch_name
			path: $path
		) {
			name
			path
			content
		}
	}
`;

type fetchFileBlobDelegate = (fields: IFileBlobQueryFields) => void;

const FileBlobContext = createContext<IFileBlob | null>(null);
const FetchFileBlobContext = createContext<fetchFileBlobDelegate | null>(null);

export function useFileBlob() {
	return useContext(FileBlobContext);
}

export function useFetchFileBlob() {
	return useContext(FetchFileBlobContext);
}

export function FileBlobLayoutProvider(props: PropsWithChildren<{}>) {
	const [fileBlob, setFileBlob] = useState<IFileBlob | null>(null);
	const { data, loading, error, refetch } = useQuery<
		IFileBlobQueryResponse,
		IFileBlobQueryFields
	>(GET_FILEBLOB_DATA_QUERY, {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	});

	useEffect(() => {
		if (data) {
			setFileBlob(data.findFileByBranch);
		}
	}, [data]);

	const fechFileBlob: fetchFileBlobDelegate = async (
		fields: IFileBlobQueryFields
	) => {
		await refetch(fields);
	};
	return (
		<ApolloConsumer>
			{(client) => (
				<FileBlobContext.Provider value={fileBlob}>
					<FetchFileBlobContext.Provider value={fechFileBlob}>
						{props.children}
					</FetchFileBlobContext.Provider>
				</FileBlobContext.Provider>
			)}
		</ApolloConsumer>
	);
}
