import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("http://104.248.160.37:5001/notes");
    setNotes(response.data);
  };


  const deleteNotes = async (noteId) => {
    await axios.delete(`http://104.248.160.37:5001/notes/${noteId}`);
    getNotes();
  };

  return (
    <div>
      {console.log(notes)}
      <h2 className='title'>MY PROGRESS</h2>
      <Link to="/addnotes" className="button is-primary mb-2">
        Add New
      </Link>
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
          {notes.map((product, index) => (
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