import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";


function NotesList() {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("http://143.244.178.37:5001/notes");
    setNotes(response.data);
  };


  const deleteNotes = async (noteId) => {
    await axios.delete(`http://143.244.178.37:5001/notes/${noteId}`);
    getNotes();
  };
  const [search, setSearch] = useState("");

  return (
    <div>
      {console.log(notes)}
      <h2 className='title'>My Progress</h2>
      <Link to="/addnotes" className="button is-primary mb-2">
        Add New
      </Link>
        {/* {Search butttons for products} */}
        <div class="dropdown is-active is-pulled-right menu-list">
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
            <th>Company Name</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Date</th>
            {user && user.role === "admin" && (<th>Created By</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.slice() // Create a copy to avoid mutating the original array
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
          .map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.details}</td>
              <td>{product.status}</td>
              <td>{product.date}</td>
              {user && user.role === "admin" && (<td>{product.user.name}</td>)}
           
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
  )
}

export default NotesList