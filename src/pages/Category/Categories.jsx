import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
          const res = await axios.get(
            "https://maxprint-back-1.onrender.com/api/category"
          );
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        setError("❌ Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2>Liste des Catégories</h2>

      {categories.length === 0 ? (
        <p>Aucune catégorie trouvée</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {categories.map((cat) => (
            <div
              key={cat._id}
              style={{
                width: "250px",
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
              }}
            >
              {cat.image && (
                <img
                  src={`https://maxprint-back-1.onrender.com/uploads/${cat.image}`}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px"
                  }}
                />
              )}

              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;