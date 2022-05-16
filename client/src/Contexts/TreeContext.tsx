import { ApolloConsumer, gql, useQuery } from "@apollo/client";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import ITree, {
	ITreeQueryFields,
	ITreeQueryResponse,
} from "../Interfaces/ITree";

const GET_TREE_DATA_QUERY = gql`
    query findTreeByBranchQuery($repository_id:String!,$branch_name:String!,$path:String!){
        findTreeByBranch(
            repository_id:$repository_id,
            branch_name:$branch_name,
            path:$path
        ){
            files
            trees
            path
            branch{
                name
            }
        }
    }
`;

type fetchTreeDelegate = (fields: ITreeQueryFields) => void;

const TreeContext = createContext<ITree | null>(null);
const FetchTreeContext = createContext<fetchTreeDelegate | null>(null);

export function useTree() {
	return useContext(TreeContext);
}

export function useFetchTree() {
	return useContext(FetchTreeContext);
}

export function TreeLayoutProvider(props: PropsWithChildren<{}>) {
	const [tree, setTree] = useState<ITree | null>(null);
	const { data, loading, error, refetch } = useQuery<
		ITreeQueryResponse,
		ITreeQueryFields
	>(GET_TREE_DATA_QUERY, {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	});

	useEffect(() => {
		if (data) {
			setTree(data.findTreeByBranch);
		}
	}, [data]);

	const fetchTree: fetchTreeDelegate = async (fields: ITreeQueryFields) => {
		console.log(fields)
		await refetch(fields);
	};
	return (
		<ApolloConsumer>
			{(client) => (
				<TreeContext.Provider value={tree}>
					<FetchTreeContext.Provider value={fetchTree}>
						{props.children}
					</FetchTreeContext.Provider>
				</TreeContext.Provider>
			)}
		</ApolloConsumer>
	);
}
