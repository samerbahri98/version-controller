import React from "react";
import { sortingFunction, useReposList, useSortRepoListContext } from "../../Contexts/UserContexts";
import { ITableProps } from "../../Interfaces/Table/ITableProps";
import Cell from "./Cell";

function Matrix(props: ITableProps) {

  return (
    <>
      <div className="panel-block">
        <div className="matrix container is-fullhd is-hoverable">
          {props.records.map((record) => (
            <Cell key={`cell_${record.id}`} {...record} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Matrix;
