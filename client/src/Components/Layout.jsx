import React from "react";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
    <Navbar/>
      <div className="container-xxl">{children}</div>
    </>
  );
};

export default Layout;
