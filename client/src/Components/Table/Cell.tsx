import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import { Link } from "react-router-dom";

function Cell({ name,link,icon }: ITableCell) {

  return (
    <Link to={link}  style={{ textDecoration: 'none' }}>
      <div
      className="card repository-item"
      role="button"
      // onClick={() => toggleInfoRepo(repo)}
    >
      <div className="card-image logo-card has-text-centered">
        <figure className="image is-128x128 logo-container is-inline-block logoIMG">
          <FontAwesomeIcon icon={icon} size="5x" />
        </figure>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
    
  );
}

export default Cell;
