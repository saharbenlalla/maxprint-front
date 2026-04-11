import React, { useEffect, useState } from "react";
import axios from "axios";
import "./messagesAdmin.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://maxprint-back-1.onrender.com/api/contacts",
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur chargement messages", err);
    }
  };


  return (
    <div className="admin-messages-container">
      <h2>Gestion des Messages</h2>

      <table className="messages-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id} className={msg.read ? "read" : "unread"}>
              <td data-label="Nom">{msg.name}</td>
              <td data-label="Email">{msg.email}</td>
              <td data-label="Message">{msg.message}</td>
              <td data-label="Date">
                {new Date(msg.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMessages;