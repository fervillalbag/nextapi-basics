import React from "react";
import Navbar from "./Navbar";

interface LayoutIprops {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutIprops> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div style={{ padding: "24px 0" }}>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
