import React from "react";
import { useReposList } from "../../../../Contexts/UserContexts";
import Cell from "./Cell";

function Matrix() {
  const reposList = useReposList();
  return (
    <>
      <div className="panel-block">
        <div className="matrix container is-fullhd is-hoverable">
          {reposList.map((repo) => (
            <Cell key={repo.repository_id} repo={repo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Matrix;
