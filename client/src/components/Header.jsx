import { useState } from "react";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import CategoryList from "./catalog/categories/CategoryList";
import BrandList from "./catalog/brands/BrandList";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Header() {
  const { userId, isAuthenticate } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  return (
    <header className="bg-white shadow w-ful relative">
      {/* === DESKTOP HEADER === */}
      <nav className="hidden md:flex items-center justify-between p-4 text-lg">
        <div className="text-xl font-semibold">
          <Link to="/">
            supp<span className="text-green-700">shop</span>
          </Link>
        </div>

        <ul className="flex gap-10 justify-center items-center">
          <li className="relative group">
            <p className="hover:text-gray-700 cursor-pointer">Category</p>
            <CategoryList />
          </li>

          <li className="relative group">
            <p className="hover:text-gray-700 cursor-pointer">Brands</p>
            <BrandList />
          </li>

          {userId && (
            <li>
              <Link to="/cart" className="hover:text-gray-700">
                🛒
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {isAuthenticate ? (
            <>
              <Link to="/create">Add Product</Link>
              <Link className="border-l pl-3" to="/profile">
                Profile
              </Link>
              <Link className="border-l pl-3" to="/logout">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-700 border-l pl-3"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* === MOBILE HEADER === */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 relative">
        {/* Ляво: Menu и Add Product */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/create">
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>

        {/* Център: Лого */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-xl font-semibold">
            supp<span className="text-green-700">shop</span>
          </Link>
        </div>

        {/* Дясно: Cart и Profile */}
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M6 19a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </Link>
          <Link to={isAuthenticate ? "/profile" : "/login"}>
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A11.955 11.955 0 0112 15c2.5 0 4.847.765 6.879 2.071M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* === MOBILE MENU PANEL === */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full text-left font-medium bg-white border-t px-3 py-3 space-y-5">
          {/* === Категории === */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <p className="flex-1 text-left">Category</p>
            <span>
              {isCategoryOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </div>
          {isCategoryOpen && (
            <div className="w-screen bg-white">
              <CategoryList
                isMobile={true}
                onItemClick={() => {
                  setIsCategoryOpen(false);
                  setIsBrandOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          )}

          {/* === Брандове === */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsBrandOpen((prev) => !prev)}
          >
            <p className="flex-1 text-left">Brands</p>
            <span>
              {isBrandOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </div>
          {isBrandOpen && (
            <div className="w-screen bg-white">
              <BrandList
                isMobile={true}
                onItemClick={() => {
                  setIsCategoryOpen(false);
                  setIsBrandOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
