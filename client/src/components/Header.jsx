import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { userId, isAuthenticate } = useAuthContext();

  return (
    <header className="bg-white shadow">
      <nav className="flex items-center justify-between p-2 text-lg">
        <div className="flex w-[20%] pl-5 text-xl">
          <Link to="/">
            supp<span className="text-green-700">shop</span>
          </Link>
        </div>
        <ul className="flex w-[60%] gap-20 justify-center">
          <li className="relative group">
            <p className="hover:text-gray-700 cursor-pointer">Category</p>
          </li>

          <li className="relative group">
            <p className="hover:text-gray-700 cursor-pointer">Brands</p>
          </li>

          <li>
            <Link to="/about" className="hover:text-gray-700">
              About
            </Link>
          </li>

          {userId && (
            <li>
              <Link to={`/cart/${userId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
            </li>
          )}
        </ul>

        <div className="flex w-[20%] justify-end gap-10 pr-5">
          {isAuthenticate ? (
            <>
              <Link to="/create">Add Product</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-700">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
