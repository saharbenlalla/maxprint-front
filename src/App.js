import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryForm from "./pages/Category/AddCategory";
import CategoriesList from "./pages/Category/Categories";
import AdminCategories from "./pages/Category/CategoriesAdmin";
import AdminPage from "./pages/AdminPage";
import AdminProducts from "./pages/products/AdminProduct";
import AdminServices from "./pages/service/AdminServices.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Products from "./pages/Products.jsx";
import Services from "./pages/Services.jsx";
import Offers from "./pages/offerPage.jsx";
import AdminOffers from "./pages/adminOffer.jsx";
import AdminMessages from "./pages/messagesAdmin.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-category" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/contacts" element={<AdminMessages />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/offers" element={<AdminOffers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/offres" element={<Offers />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
