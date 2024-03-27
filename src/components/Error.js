import React from "react";

const Error = () => {
  const errStyle = {
    fontSitze:"30px",
    marginTop:"30%",
    textAlign:"Center",
    fontWeight : "600"
  }
  return (
    <div style={errStyle}>
      Unable to fetch the data . Please check your connection or try again
      later.
    </div>
  );
};

export default Error;
