import React from "react";
import { sortingFunction, useReposList, useSortRepoListContext } from "../../../../Contexts/UserContexts";
import Matrix from "./Matrix";
import Row from "./Row";

function Table() {
  const orderParam = useSortRepoListContext()
  
  const reposList = useReposList();
  return (
    <>
      {reposList.sort(sortingFunction(orderParam)).map((repo) => (
        <Row key={repo.repository_id} repo={repo}/>
      ))}
      {/* <Row /> */}
    </>
  );
}

export default Table;
