import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="loader">
        <div className="loader-small"></div>
        <div className="loader-large"></div>
      </div>
    </div>
  );
};

export default loading;
