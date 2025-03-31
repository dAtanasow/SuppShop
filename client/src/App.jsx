import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthProvider from "./context/AuthProvider";
import Logout from "./components/Logout";
import Catalog from "./components/catalog/Catalog";
import ProductDetails from "./components/catalog/product-details/ProductDetails";
import CreateEditProduct from "./components/CreateEditProduct";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main id="main-content" className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:productId" element={<ProductDetails />} />
            <Route path="/create" element={<CreateEditProduct />} />
            <Route
              path="/catalog/:productId/edit"
              element={<CreateEditProduct />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
