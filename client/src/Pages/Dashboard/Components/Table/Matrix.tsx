import React from "react";
import Cell from "./Cell";

function Matrix() {
  return (
    <>
      <div className="panel-block">
        <div className="matrix container is-fullhd is-hoverable">
          {/* {typeof this.props.list === "undefined" ? (
            <></>
          ) : (
            this.props.list
              .filter(
                (elem) =>
                  elem.WebsiteName.indexOf(this.props.searchValue) >= 0 ||
                  elem.WebsiteUrl.indexOf(this.props.searchValue) >= 0 ||
                  elem.Username.indexOf(this.props.searchValue) >= 0 ||
                  elem.Email.indexOf(this.props.searchValue) >= 0 ||
                  elem.Notes.indexOf(this.props.searchValue) >= 0
              )
              .sort((a, b) => this.sorting(a, b))
              .map((elem, index) => (
                <Cell
                  key={index}
                  elem={elem}
                  notify={this.notify}
                  modify={this.modify}
                  delete={this.delete}
                />
              ))
          )} */}
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </div>
      </div>
    </>
  );
}

export default Matrix;
