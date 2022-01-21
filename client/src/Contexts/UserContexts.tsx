import {
  useContext,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";
import { IRepo } from "../Interfaces/IRepo";

import { useQuery, gql, ApolloConsumer } from "@apollo/client";
import { IPublicKey } from "../Interfaces/IPublicKey";
import { IUser } from "../Interfaces/IUser";
import { IUserQueryReponse } from "../Interfaces/IUserQueryResponse";

type RepoUpdateOneDelegate = (repo: IRepo | string) => void;
type PublicKeyUpdateOneDelegate = (publicKey: IPublicKey | string) => void;
type SortDelegate = (param: string) => void;
type UpdateDelegate = () => void;

const GET_USER_DATA_QUERY = gql`
  query {
    currentUser {
      username
      attribution_tag
      public_keys {
        public_key_id
        public_key_hash
        public_key_encryption_type
        created_at
      }
      repositories {
        repository_id
        repository_name
        download {
          ssh
          http
        }
        created_at
      }
    }
  }
`;

const ReposListContext = createContext<IRepo[]>([]);
const PublicKeyListContext = createContext<IPublicKey[]>([]);
const UsernameContext = createContext<string>("");
const LogoutContext = createContext<UpdateDelegate | null>(null);
const LoginContext = createContext<UpdateDelegate | null>(null);
const AddRepoContext = createContext<RepoUpdateOneDelegate | null>(null);
const AddPublicKeyContext = createContext<PublicKeyUpdateOneDelegate | null>(
  null
);
const RevokePublicKeyContext = createContext<PublicKeyUpdateOneDelegate | null>(
  null
);
const SortUpdateRepoListContext = createContext<SortDelegate | null>(null);
const SortRepoListContext = createContext<string>("NO");

export function useUsername() {
  return useContext(UsernameContext);
}

export function useReposList() {
  return useContext(ReposListContext);
}

export function usePublicKeysList() {
  return useContext(PublicKeyListContext);
}

export function useLogoutContext() {
  return useContext(LogoutContext);
}

export function useAppendRepoListContext() {
  return useContext(AddRepoContext);
}

export function useSortUpdateRepoListContext() {
  return useContext(SortUpdateRepoListContext);
}

export function useSortRepoListContext() {
  return useContext(SortRepoListContext);
}

export function useAddPublicKey() {
  return useContext(AddPublicKeyContext);
}

export function useRevokePublicKey() {
  return useContext(RevokePublicKeyContext);
}

export const sortingFunction: (
  param: string
) => (a: IRepo, b: IRepo) => number = (param: string) => {
  switch (param) {
    case "ON":
      return (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    case "NO":
      return (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    case "AZ":
      return (a, b) => a.repository_name.localeCompare(b.repository_name);
    case "ZA":
      return (a, b) => b.repository_name.localeCompare(a.repository_name);
    default:
      return (a, b) => 0;
  }
};

export function UserProvider(props: PropsWithChildren<{}>) {
  const [username, setUsername] = useState<string>("");
  const [reposList, setReposList] = useState<IRepo[]>([]);
  const [publicKeysList, setPublicKeysList] = useState<IPublicKey[]>([]);
  const [orderParam, setOrderParam] = useState<string>("NO");
  const { data, loading, error, refetch } = useQuery<IUserQueryReponse>(
    GET_USER_DATA_QUERY,
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  );
  useEffect(() => {
    if (data) {
      setUsername(data.currentUser.username);
      data.currentUser.repositories
        ? setReposList(data.currentUser.repositories)
        : setReposList([]);
      data.currentUser.public_keys
        ? setPublicKeysList(data.currentUser.public_keys)
        : setPublicKeysList([]);
    }
  }, [data]);

  const appendRepoList: RepoUpdateOneDelegate = (repo) => {
    setReposList([repo as IRepo, ...reposList]);
    // sortRepoList(orderParam);
  };

  const sortRepoList: SortDelegate = (param) => {
    setOrderParam(param);
  };

  const addPublicKey: PublicKeyUpdateOneDelegate = (key) => {
    setPublicKeysList([...publicKeysList, key as IPublicKey]);
  };

  const revokePublicKey: PublicKeyUpdateOneDelegate = (key) => {
    const cKey = key as IPublicKey;
    setPublicKeysList(
      [...publicKeysList].filter(
        (a) => a.public_key_hash !== cKey.public_key_hash
      )
    );
  };
  const logout = () => {
    setUsername("");
    setReposList([]);
    setPublicKeysList([]);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <ApolloConsumer>
      {(client) => (
        <UsernameContext.Provider value={username}>
          <ReposListContext.Provider value={reposList}>
            <PublicKeyListContext.Provider value={publicKeysList}>
              <LogoutContext.Provider value={logout}>
                <AddRepoContext.Provider value={appendRepoList}>
                  <SortUpdateRepoListContext.Provider value={sortRepoList}>
                    <SortRepoListContext.Provider value={orderParam}>
                      <AddPublicKeyContext.Provider value={addPublicKey}>
                        <RevokePublicKeyContext.Provider
                          value={revokePublicKey}
                        >
                          {props.children}
                        </RevokePublicKeyContext.Provider>
                      </AddPublicKeyContext.Provider>
                    </SortRepoListContext.Provider>
                  </SortUpdateRepoListContext.Provider>
                </AddRepoContext.Provider>
              </LogoutContext.Provider>
            </PublicKeyListContext.Provider>
          </ReposListContext.Provider>
        </UsernameContext.Provider>
      )}
    </ApolloConsumer>
  );
}
