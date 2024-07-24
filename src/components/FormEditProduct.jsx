import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [representative, setRep] = useState("");
  const [details, setDetails] = useState("");
  const [telephone, setTel] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://143.244.178.37:5001/products/${id}`
        );
        setName(response.data.name);
        setRep(response.data.representative);
        setDetails(response.data.details);
        setTel(response.data.telephone);
        setStatus(response.data.status)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://143.244.178.37:5001/products/${id}`, { 
        name: name,
        representative: representative,
        details: details,
        telephone: telephone,
        status: status
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Clients</h1>
      <h2 className="subtitle">Edit Clients</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Client Name</label>
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
                    placeholder="Rep Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Address</label>
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
                      <option value="Quotation">Select an Option</option>
                      <option value="Quotation">Quotation</option>
                      <option value="Payment">Payment</option>
                      <option value="Invoice">Invoice</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditProduct;
