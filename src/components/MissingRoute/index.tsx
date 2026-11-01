import React from "react";
import "./index.scss";

function index() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>{"OOPS"}!</h1>
        </div>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
      </div>
    </div>
  );
}

export default index;
