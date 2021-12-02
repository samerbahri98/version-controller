import React from "react";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IRepoRenderInfo } from "../../../../Interfaces/IRepoRenderInfo";

function Row({ repo }: IRepoRenderInfo) {
  return (
    <div className="panel-block is-hoverable repository-item" role="button">
      <span className="panel-icon">
        <FontAwesomeIcon icon={faBook} />
      </span>
      {repo.repository_name}
    </div>
  );
}

export default Row;