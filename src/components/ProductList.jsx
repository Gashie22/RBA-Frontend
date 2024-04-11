import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5001/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5001/products/${productId}`);
    getProducts();
  };

  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="title">Clients</h1>
      <h2 className="subtitle">List of Clients</h2>

      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      {/* {Search butttons for products} */}
      <div class="dropdown is-active is-pulled-right">
        <div class="dropdown-trigger">
          <div class="field">
            <p class="control is-expanded has-icons-right ">
              <input
                class="input"
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <span class="icon is-small is-right">
                <i class="fas fa-search">
                  <IoSearch />
                </i>
              </span>
            </p>
          </div>
        </div>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Client Name</th>
            <th>Representative</th>
            <th>Address</th>
            <th>Channel</th>
            <th>Cell Number</th>
            <th>Status</th>
            <th>Date</th>
            {user && user.role === "admin" && <th>Created By</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.slice() // Create a copy to avoid mutating the original array
          .sort((a, b) => { // Sort by dateModified (assuming it exists)
            const dateA = new Date(a.dateModified || a.date); // Handle potential missing dateModified
            const dateB = new Date(b.dateModified || b.date);
            return dateB - dateA; // Descending order (latest first)
          })
    
            .filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search) ||
                    product.user.name.toLowerCase().includes(search);
            })
            .map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.representative}</td>
                <td>{product.details}</td>
                <td>{product.isCall}</td>
                <td>{product.telephone}</td>
                <td>{product.status}</td>
                <td>{product.date}</td>
                {user && user.role === "admin" && <td>{product.user.name}</td>}
                <td>
                  <Link
                    to={`/products/edit/${product.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  {user && user.role === "admin" && (
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
