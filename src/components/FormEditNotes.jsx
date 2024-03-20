import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditNote = () => {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(
                    `http://104.248.160.37:3000/notes/${id}`
                );
                setName(response.data.name);
                setDetails(response.data.details);
                setStatus(response.data.status)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getProductById();
    }, [id]);

    const updateNotes = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://104.248.160.37:3000/notes/${id}`, { 
                name: name,
                details: details,
                status: status
            });
            navigate("/notes");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Progress</h1>
            <h2 className="subtitle">Edit Progress</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateNotes}>
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
                                <label className="label">Progress</label>
                                <div className="control">
                                    <textarea className="input" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="What's your Progress ?" cols="30" rows="10"></textarea>
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

export default FormEditNote;
