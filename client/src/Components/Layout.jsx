import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
    <Navbar/>
      <div className="container-xxl"><Outlet/></div>
    </>
  );
};

export default Layout;
