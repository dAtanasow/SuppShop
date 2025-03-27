import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/home/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main id="main-content" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
