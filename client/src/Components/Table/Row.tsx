import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import { Link } from "react-router-dom";

function Row({ name,link,icon }: ITableCell) {
  return (
    <Link to={link}  style={{ textDecoration: 'none' }}>
    <div
      className="panel-block is-hoverable repository-item"
      role="button"
    >
      <span className="panel-icon">
        <FontAwesomeIcon icon={icon} />
      </span>
      {name}
    </div>
    </Link>
  );
}

export default Row;
