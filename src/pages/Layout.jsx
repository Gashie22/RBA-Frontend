import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-12" style={{ minHeight: "100vh" }}>
        
        <div className="column py-6 mt-6 has-background-light">
          <main className="mt-6 p-4">{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
