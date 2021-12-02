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
const AddRepoContext = createContext<RepoUpdateOneDelegate | null>(null);
const AddPublicKeyContext = createContext<PublicKeyUpdateOneDelegate | null>(
  null
);
const RevokePublicKeyContext = createContext<PublicKeyUpdateOneDelegate | null>(
  null
);

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

export function UserProvider(props: PropsWithChildren<{}>) {
  const [username, setUsername] = useState<string>("");
  const [attributionTag, setAttributionTag] = useState<string>("");
  const [reposList, setReposList] = useState<IRepo[]>([]);
  const [publicKeysList, setPublicKeysList] = useState<IPublicKey[]>([]);
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
  console.log(data);

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
                {props.children}
              </LogoutContext.Provider>
            </PublicKeyListContext.Provider>
          </ReposListContext.Provider>
        </UsernameContext.Provider>
      )}
    </ApolloConsumer>
  );
}
