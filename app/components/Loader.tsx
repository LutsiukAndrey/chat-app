import React from "react";

import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="48"
      width="48"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper mx-auto"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
};

export default Loader;
