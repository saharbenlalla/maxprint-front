import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";

const API = "https://maxprint-back-1.onrender.com/api/product";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // sous catégories
  const [parents, setParents] = useState([]); // catégories parents
  const [parentId, setParentId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");



  // Charger produits
  const loadProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };



  // Charger catégories parents
  const loadParents = async () => {
    const res = await axios.get("https://maxprint-back-1.onrender.com/api/category/parents");
    setParents(res.data);
  };



  // Charger sous-catégories
  const loadSubCategories = async (id) => {
    const res = await axios.get(`https://maxprint-back-1.onrender.com/api/category/sub/${id}`);
    setCategories(res.data);
  };



  useEffect(() => {
    loadProducts();
    loadParents();
  }, []);




  // Ajouter ou modifier produit
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    if (editId) {

      await axios.put(`${API}/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

    } else {

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

    }

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImages([]);
    setEditId(null);

    loadProducts();
  };




  // Supprimer produit 
  const handleDelete = async (id) => {

    if (window.confirm("Supprimer ce produit ?")) {

      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadProducts();
    }
  };




  // Modifier produit
  const handleEdit = (prod) => {

    setName(prod.name);
    setDescription(prod.description || "");
    setPrice(prod.price);
    setCategory(prod.category?._id || "");
    setEditId(prod._id);
  };




  return (
    <div className="admin-products-container">

      <h2>Gestion des Produits</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />



        {/* Catégorie parent */}
        <select
          value={parentId}
          onChange={(e) => {
            const id = e.target.value;
            setParentId(id);
            loadSubCategories(id);
          }}
        >
          <option value="">Choisir catégorie parent</option>

          {parents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}

        </select>



        {/* Sous-catégorie */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choisir sous-catégorie</option>

          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}

        </select>



        {/* Upload images */}
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />



        <button type="submit">
          {editId ? "Modifier" : "Ajouter"}
        </button>

      </form>



      <hr />



      <table className="products-table">

        <thead>
          <tr>
            <th>Nom</th>
            <th>Images</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>

          {products.map((p) => (

            <tr key={p._id}>

              <td data-label="Nom">{p.name}</td>


              <td data-label="Images">

                {p.images?.map((img, index) => (

                  <img
                    key={index}
                    src={`https://maxprint-back-1.onrender.com/uploads/${img}`}
                    alt=""
                    width="50"
                    style={{
                      marginRight: "5px",
                      borderRadius: "4px"
                    }}
                  />

                ))}

              </td>


              <td data-label="Description">{p.description}</td>

              <td data-label="Prix">{p.price} DT</td>

              <td data-label="Catégorie">{p.category?.name || "-"}</td>


              <td data-label="Actions">

                <button
                  className="btn-edit"
                  onClick={() => handleEdit(p)}
                >
                  Modifier
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p._id)}
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

export default AdminProducts;
