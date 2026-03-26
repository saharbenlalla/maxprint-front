import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoriesAdmin.css";

const API = "https://maxprint-back-1.onrender.com/api/category";

function AdminCategories() {

  const [categories, setCategories] = useState([]);
  const [parents, setParents] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // load categories
  const loadCategories = async () => {
    const res = await axios.get(API);
    setCategories(res.data);
  };

  // load parents
  const loadParents = async () => {
    const res = await axios.get(API + "/parents");
    setParents(res.data);
  };

  useEffect(() => {
    loadCategories();
    loadParents();
  }, []);

  // add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, parent: parent || null };

    if (editId) {
      await axios.put(`${API}/${editId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(API, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setName("");
    setParent("");
    setEditId(null);
    loadCategories();
  };

  // delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete category ?")) {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadCategories();
    }
  };

  // edit
  const handleEdit = (cat) => {
    setName(cat.name);
    setParent(cat.parent?._id || "");
    setEditId(cat._id);
  };

  return (
    <div className="admin-categories">

      <h2 className="admin-title">
        Gestion <span>Categories</span>
      </h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="category-input"
          placeholder="Nom de categorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="category-select"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">Aucun parent</option>
          {parents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button className="btn-primary" type="submit">
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <table className="category-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.parent?.name || "-"}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(cat)}
                >
                  Modifier
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(cat._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminCategories;