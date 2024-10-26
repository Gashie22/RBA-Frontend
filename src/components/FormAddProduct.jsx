import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [representative, setRep] = useState("");
  const [details, setDetails] = useState("");
  const [telephone, setTel] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [isCall, setIsCall] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://143.244.178.37:5001/products", {
        name: name,
        representative: representative,
        details:details,
        isCall:isCall,
        telephone:telephone,
        status:status,
        date:date

      });
      navigate("/clients");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Clients</h1>
      <h2 className="subtitle">Add New Client</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
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
                <label className="label">Representative</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={representative}
                    onChange={(e) => setRep(e.target.value)}
                    placeholder="Company Rep"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Adress</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Company Details"
                  />
                </div>
              </div> 
              
              <div className="field">
                <label className="label">Channel</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={isCall}
                      onChange={(e) => setIsCall(e.target.value)}
                    >
                      <option value="Call">Select an option</option>
                      <option value="Call">Call</option>
                      <option value="Meeting">Meeting</option>
                    </select>
                  </div>
                </div>
              </div> 
              <div className="field">
                <label className="label">Cell Number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={telephone}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="Company Cell"
                  />
                </div>
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
                    placeholder="Date"
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

export default FormAddProduct;
