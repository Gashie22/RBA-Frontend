import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("http://localhost:5001/notes");
    setNotes(response.data);
  };

  const deleteNotes = async (noteId) => {
    await axios.delete(`http://localhost:5001/notes/${noteId}`);
    getNotes();
  };
  const [search, setSearch] = useState("");
  const [block, setBlock] = useState("LAMECK");
  const blockNames = [
    {
      name: "RUTENDO",
      color: "card has-background-success",
      grid: "flexx",
      style_1: "column is-one-third",
      style_2: "card-content",
      style_3: "column is-half",
    },
    {
      name: "SHARLEEN",
      color: "card has-background-danger",
      grid: "flexx",
      style_1: "column is-one-third",
      style_2: "card-content",
      style_3: "column ",
    },
    {
      name: "ARMSTRONG",
      color: "card has-background-warning",
      grid: "flexx",
      style_1: "column is-one-third",
      style_2: "card-content",
      style_3: "column is-half",
    },

    {
      name: "KUNDAI",
      color: "card has-background-info",
      grid: "flexx",
      style_1: "coumn is-one-third",
      style_2: "card-content",
      style_3: "column is-half",
    },
    {
      name: "TAWONA",
      color: "card has-background-link",
      grid: "flexx",
      style_1: "coumn is-one-third",
      style_2: "card-content",
      style_3: "column is-half",
    },
  ];

  return (
    <div className="p-6 py-3">
      <h2 className="title">My Progress</h2>
      <Link to="/addnotes" className="button is-primary mb-2">
        Add New
      </Link>
      {/* {Search butttons for products} */}
      {user && user.role === "user" && (
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
      )}
      {user && user.role === "admin" && (
        <div class="flexx is-one-third card-content">
          {blockNames.map((category) => (
            <div
              class=""
              key={category.name}
              // {console.log(category.name)}
              className={`btn  ${block === category.name && "category-active"}`}
              onClick={() => setBlock(category.name)}
            >
              <div class={category.color}>
                <div class={category}>
                  <div class={category.color}>
                    <div class={category.style_2}>
                      <div class="columns">
                        <div class={category.style_3}>
                          <h5 class="has-text-weight-bold ">{category.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Date</th>
            {user && user.role === "admin" && <th>Created By</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.role === "admin" &&
            notes
              // .slice() // Create a copy to avoid mutating the original array
              .sort((a, b) => {
                // Sort by dateModified (assuming it exists)
                const dateA = new Date(a.dateModified || a.date); // Handle potential missing dateModified
                const dateB = new Date(b.dateModified || b.date);
                return dateB - dateA; // Descending order (latest first)
              })

              // .filter((product) => {
              //   return search.toLowerCase() === ""
              //     ? product
              //     : product.name.toLowerCase().includes(search) ||
              //         product.user.name.toLowerCase().includes(search);
              // })

              .filter((i) => i.user.name === block)
              .map((product, index) => (
                <tr key={product.uuid}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.details}</td>
                  <td>{product.status}</td>
                  <td>{product.date}</td>
                  {user && user.role === "admin" && (
                    <td>{product.user.name}</td>
                  )}

                  <td>
                    <Link
                      to={`edit/${product.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    {user && user.role === "admin" && (
                      <button
                        onClick={() => deleteNotes(product.uuid)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          {user &&
            user.role === "user" &&
            notes
              // .slice() // Create a copy to avoid mutating the original array
              .sort((a, b) => {
                // Sort by dateModified (assuming it exists)
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

              // .filter((i) => i.user.name === block)
              .map((product, index) => (
                <tr key={product.uuid}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.details}</td>
                  <td>{product.status}</td>
                  <td>{product.date}</td>
                  {user && user.role === "admin" && (
                    <td>{product.user.name}</td>
                  )}

                  <td>
                    <Link
                      to={`edit/${product.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    {user && user.role === "admin" && (
                      <button
                        onClick={() => deleteNotes(product.uuid)}
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
}

export default NotesList;
