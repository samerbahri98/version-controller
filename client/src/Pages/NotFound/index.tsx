import React from "react";
import img from "./undraw_page_not_found_su7k.svg";

function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={img} alt="Image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="container">
            <h2 className="subtitle">Whooooops! Nothing to see here</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
