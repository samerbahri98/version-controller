import React from "react";
import { useReposList } from "../../../../Contexts/UserContexts";
import Matrix from "./Matrix";
import Row from "./Row";

function Table() {
  const reposList = useReposList();
  return (
    <>
      {reposList.map((repo) => (
        <Row key={repo.repository_id} repo={repo}/>
      ))}
      {/* <Row /> */}
    </>
  );
}

export default Table;
