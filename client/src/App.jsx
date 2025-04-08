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
import ProductDetails from "./components/product-details/ProductDetails";
import CreateEditProduct from "./components/CreateEditProduct";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/Cart";
import MyProducts from "./components/profile/MyProducts";
import PrivateGuard from "./components/PrivateGuard";

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
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:productId" element={<ProductDetails />} />
            <Route element={<PrivateGuard />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/my-products" element={<MyProducts />} />
              <Route path="/create" element={<CreateEditProduct />} />
              <Route
                path="/catalog/:productId/edit"
                element={<CreateEditProduct />}
              />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
