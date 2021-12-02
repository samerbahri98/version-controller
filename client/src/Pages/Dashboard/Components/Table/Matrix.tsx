import React from "react";
import { sortingFunction, useReposList, useSortRepoListContext } from "../../../../Contexts/UserContexts";
import Cell from "./Cell";

function Matrix() {
  const reposList = useReposList();
  const orderParam = useSortRepoListContext()

  return (
    <>
      <div className="panel-block">
        <div className="matrix container is-fullhd is-hoverable">
          {reposList.sort(sortingFunction(orderParam)).map((repo) => (
            <Cell key={repo.repository_id} repo={repo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Matrix;
