import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRepoRenderInfo } from "../../../../Interfaces/IRepoRenderInfo";

function Cell({ repo }: IRepoRenderInfo) {
  return (
    <div className="card repository-item">
      <div className="card-image logo-card has-text-centered">
        {/* <center> */}
        <figure className="image is-128x128 logo-container is-inline-block logoIMG">
          <FontAwesomeIcon icon={faBook} size="5x" />
        </figure>
        {/* </center> */}
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{repo.repository_name}</p>
            {/* <p className="subtitle is-6">
              {this.props.elem.Username || this.props.elem.Email}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cell;
