import { useState } from "react";
import axios from "axios";
import "./AddCategory.css";

function CategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);

    if (image) {
      data.append("image", image); // ⚠️ doit être "image" comme dans upload.single("image")
    }

    try {
      const res = await axios.post(
        "https://maxprint-back-1.onrender.com/api/category",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}` // 🔐 TOKEN ICI
          }
        }
      );

      setMessage("✅ Catégorie créée avec succès !");
      console.log(res.data);

      // Reset
      setFormData({
        name: "",
        description: ""
      });
      setImage(null);

    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de la création");
    }
  };

  return (
    <div className="category-container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Ajouter une Catégorie</h2>

      {message && <p className="category-message">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br /><br />

        {/* ✅ Nouveau input image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br /><br />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CategoryForm;