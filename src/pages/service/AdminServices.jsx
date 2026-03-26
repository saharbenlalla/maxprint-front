import React, { useEffect, useState } from "react";
import axios from "axios";
import "../products/AdminProducts.css"; // tu peux réutiliser le même style

const API = "https://maxprint-back-1.onrender.com/api/service";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Charger services
  const loadServices = async () => {
    const res = await axios.get(API);
    setServices(res.data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Ajouter / Modifier
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < images.length; i++) formData.append("images", images[i]);

    if (editId) {
      await axios.put(`${API}/${editId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
    } else {
      await axios.post(API, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
    }

    setName(""); setDescription(""); setPrice(""); setImages([]); setEditId(null);
    loadServices();
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce service ?")) {
      await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      loadServices();
    }
  };

  // Modifier
  const handleEdit = (s) => {
    setName(s.name); setDescription(s.description || ""); setPrice(s.price); setEditId(s._id);
  };

  return (
    <div className="admin-products-container">
      <h2>Gestion des Services</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" placeholder="Nom du service" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <hr />

      <table className="products-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Images</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>
                {s.images?.map((img, index) => (
                  <img key={index} src={`https://maxprint-back-1.onrender.com/uploads/${img}`} alt="" width="50" style={{ marginRight: "5px", borderRadius: "4px" }} />
                ))}
              </td>
              <td>{s.description}</td>
              <td>{s.price} DT</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(s)}>Modifier</button>
                <button className="btn-delete" onClick={() => handleDelete(s._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminServices;
