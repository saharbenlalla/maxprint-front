import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const API = "https://maxprint-back-1.onrender.com/api/users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles] = useState(["client", "admin"]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    await axios.put(`${API}/${userId}/role`, { role: newRole }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadUsers();
  };

  // Couleurs par rôle pour badge
  const roleColor = (role) => {
    switch(role) {
      case "admin": return "badge-admin";
      case "moderator": return "badge-moderator";
      default: return "badge-user";
    }
  }

  return (
    <div className="admin-users-container">
      <h2>Gestion des Utilisateurs</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>
                {u.name}{" "}
                <span className={`role-badge ${roleColor(u.role)}`}>
                  {u.role}
                </span>
              </td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className={roleColor(u.role)}
                >
                  {roles.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
