import { useEffect, useState } from "react";
import axios from "axios";
import "./adminOffer.css";

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: ""
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token"); // ou cookie

  // 🔄 GET ALL OFFERS
  const fetchOffers = () => {
    axios
      .get("https://maxprint-back-1.onrender.com/api/offers")
      .then((res) => setOffers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // ✏️ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // ➕ ADD / ✏️ UPDATE OFFER
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (image) formData.append("image", image);

    if (editingId) {
      // UPDATE
      axios
        .put(`https://maxprint-back-1.onrender.com/api/offers/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          fetchOffers();
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      // ADD
      axios
        .post("https://maxprint-back-1.onrender.com/api/offers", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          fetchOffers();
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  // 🗑️ DELETE OFFER
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette offre ?")) {
      axios
        .delete(`https://maxprint-back-1.onrender.com/api/offers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => fetchOffers())
        .catch((err) => console.log(err));
    }
  };

  // ✏️ EDIT OFFER
  const handleEdit = (offer) => {
    setForm({
      title: offer.title,
      description: offer.description,
      price: offer.price
    });
    setEditingId(offer._id);
  };

  // 🔄 RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: ""
    });
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className="admin-offers-container">
      <h2>Gestion des Offres</h2>

      {/* FORM */}
      <form className="offer-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />

        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        {editingId && <button type="button" onClick={resetForm}>Annuler</button>}
      </form>

      {/* TABLE */}
      <table className="offers-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td>{offer.title}</td>
              <td>{offer.description}</td>
              <td>{offer.price} DT</td>
              <td>
                {offer.image && (
                  <img src={`https://maxprint-back-1.onrender.com${offer.image}`}
                   alt={offer.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                )}
              </td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(offer)}>
                  Modifier
                </button>
                <button className="btn-delete" onClick={() => handleDelete(offer._id)}>
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

export default AdminOffers;