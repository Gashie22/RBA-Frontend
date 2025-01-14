import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://143.244.178.37:5001/products");
    setProducts(response.data);
  };

  return (
    <React.Fragment>
      <Navbar />
      {user && user.role === "user" && (
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column is-2">
            <Sidebar />
          </div>
          <div className="column has-background-light">
            <main>{children}</main>
          </div>
        </div>
      )}
      {user && user.role === "admin" && (
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column has-background-light mt-6">
            <main>{children}</main>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Layout;
