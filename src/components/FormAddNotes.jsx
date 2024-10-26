import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddNotes = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate()

  const [msg, setMsg] = useState("");


  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/notes", {
        name: name,
        details: details,
        status: status,
        date: date

      });
      navigate("/notes");

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="title">Notes</h1>
      <h2 className="subtitle">Add New Note</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveNote}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Client Name"
                  />
                </div>
              </div>


              <div className="field">
                <label className="label">Progress</label>
                <textarea className="input" value={details} onChange={(e) => setDetails(e.target.value)}
                  placeholder="What's your Progress ?" cols="30" rows="10"></textarea>
              </div>


              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Quotation">Select an option</option>
                      <option value="Quotation">Quotation</option>
                      <option value="Payment">Payment</option>
                      <option value="Invoice">Invoice</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddNotes;
