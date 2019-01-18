import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="error">
      <h2>Sorry!</h2>
      <h5>
        You need to be <Link to="/login">logged in</Link> to see this page.
      </h5>
    </div>
  );
};

export default Unauthorized;
