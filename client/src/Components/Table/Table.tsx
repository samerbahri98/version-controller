import React from "react";
import {
  sortingFunction,
  useReposList,
  useSortRepoListContext,
} from "../../Contexts/UserContexts";
import { IRepo } from "../../Interfaces/IRepo";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import Matrix from "./Matrix";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";

import Row from "./Row";
import { ITableProps } from "../../Interfaces/Table/ITableProps";

function Table(props: ITableProps) {
  return (
    <>
      {props.records
        .map((record) => (
          <Row key={`row_${record.id}`} {...record} />
        ))}
    </>
  );
}

export default Table;
