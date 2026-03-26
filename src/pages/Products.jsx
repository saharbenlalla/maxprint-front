import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [parents, setParents] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [mainImages, setMainImages] = useState({}); 
  const [selectedImage, setSelectedImage] = useState(null); 

  // Charger tous les produits
  const loadProducts = async () => {
    const res = await axios.get("https://maxprint-back-1.onrender.com/api/product");
    setProducts(res.data);

    // définir la première image par défaut
    const initialImages = {};
    res.data.forEach((p) => {
      initialImages[p._id] = p.images?.[0] || "";
    });
    setMainImages(initialImages);
  };

  // Charger catégories parent
  const loadParents = async () => {
    const res = await axios.get("https://maxprint-back-1.onrender.com/api/category/parents");
    setParents(res.data);
  };

  // Charger sous-catégories selon parent
  const loadSubCategories = async (parentId) => {
    if (!parentId) {
      setSubCategories([]);
      return;
    }
    const res = await axios.get(
      `https://maxprint-back-1.onrender.com/api/category/sub/${parentId}`
    );
    setSubCategories(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadParents();
  }, []);

  // Filtrage produits
  const filteredProducts = products.filter((p) => {
    if (selectedSub) return p.category?._id === selectedSub;
    if (selectedParent) return p.category?.parent?._id === selectedParent;
    return true;
  });

  return (
    <div className="products-page-container">
      <h1>Nos Produits</h1>

      {/* Filtrage parent / sous-catégorie */}
      <div className="filters">
        <select
          value={selectedParent}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedParent(id);
            setSelectedSub("");
            loadSubCategories(id);
          }}
        >
          <option value="">Toutes les catégories parent</option>
          {parents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          disabled={!subCategories.length}
        >
          <option value="">Toutes les sous-catégories</option>
          {subCategories.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des produits */}
      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            {/* Image principale */}
            <div className="main-image">
              <img
                src={`https://maxprint-back-1.onrender.com/uploads/${mainImages[p._id]}`}
                alt={p.name}
                onClick={() =>
                  setSelectedImage(
                    `https://maxprint-back-1.onrender.com/uploads/${mainImages[p._id]}`
                  )
                }
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* Mini-carousel */}
            <div className="mini-carousel">
              {p.images?.map((img, index) => (
                <img
                  key={index}
                  src={`https://maxprint-back-1.onrender.com/uploads/${img}`}
                  alt={p.name}
                  onClick={() => {
                    setMainImages({ ...mainImages, [p._id]: img });
                    setSelectedImage(`https://maxprint-back-1.onrender.com/uploads/${img}`);
                  }}
                  className={
                    mainImages[p._id] === img ? "active-thumb" : ""
                  }
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <h3>{p.name}</h3>
            <p className="price">{p.price} DT</p>
            <p className="desc">{p.description}</p>

            {/* Bouton Commander WhatsApp */}
            <a
              className="btn-order"
              href={`https://wa.me/21627110822?text=Bonjour,%20je%20souhaite%20commander%20le%20produit:%20${encodeURIComponent(
                p.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Commander
            </a>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Produit" />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
