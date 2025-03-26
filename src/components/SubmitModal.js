// components/SubmitModal.js
import React, { useState } from "react";
import "../styles/submitmodal.css";

const SubmitModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Submit Your Design</h2>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message or notes"
          value={form.message}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
