import { ApolloConsumer, gql, useQuery } from "@apollo/client";
import {
	useContext,
	useState,
	useEffect,
	createContext,
	PropsWithChildren,
} from "react";

import {
	IRepo,
	IRepoQueryFields,
	IRepoQueryResponse,
} from "../Interfaces/IRepo";

const GET_REPO_DATA_QUERY = gql`
	query findRepoQuery($repository_id: String!) {
		findRepo(repository_id: $repository_id) {
			repository_name
			branches
			masterCommits {
				hash
				hashAbbv
			}
			masterHeadCommit {
				hash
				hashAbbv
				commitMessage
				tree {
					path
					files
					trees
				}
			}
		}
	}
`;

type fetchRepoDelegate = (fields: IRepoQueryFields) => void;

const RepoContext = createContext<IRepo | null>(null);
const FetchRepoContext = createContext<fetchRepoDelegate | null>(null);

export function useRepo() {
	return useContext(RepoContext);
}
export function useFetchRepo() {
	return useContext(FetchRepoContext);
}

export function RepoLayoutProvider(props: PropsWithChildren<{}>) {
	const [repo, setRepo] = useState<IRepo | null>(null);
	const { data, loading, error, refetch } = useQuery<
		IRepoQueryResponse,
		IRepoQueryFields
	>(GET_REPO_DATA_QUERY, {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	});

	useEffect(() => {
		if (data) {
			setRepo(data.findRepo);
		}
	}, [data]);

	const fetchRepo: fetchRepoDelegate = async (fields: IRepoQueryFields) => {
		await refetch(fields);
	};
	return (
		<ApolloConsumer>
			{(client) => (
				<RepoContext.Provider value={repo}>
					<FetchRepoContext.Provider value={fetchRepo}>
						{props.children}
					</FetchRepoContext.Provider>
				</RepoContext.Provider>
			)}
		</ApolloConsumer>
	);
}
