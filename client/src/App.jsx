import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Header />
      <main id="main-content" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
