import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import ProfileEdit from "./ProfileEdit";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Profile() {
  const { email, username, phone, img } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  return (
    <div className="min-h-screen bg-white sm:bg-gray-100 sm:flex sm:justify-center sm:items-center">
      {/* Main container with responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full sm:w-96 lg:max-w-lg px-6 py-6 bg-white rounded-xl shadow-md">
          {/* === Header Section === */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">
              {isEditing ? "Edit Profile" : "My Profile"}
            </h1>
            <Link to="/logout" className="text-red-500 hover:text-red-600">
              <LogOut size={22} />
            </Link>
          </div>

          {/* === Main Content === */}
          <div className="flex flex-col items-center">
            {isEditing ? (
              <ProfileEdit toggleEditMode={toggleEditMode} />
            ) : (
              <>
                {/* Profile image */}
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md mb-4"
                  src={img}
                  alt="Profile"
                />

                {/* Profile details */}
                <div className="text-center mb-6 space-y-1">
                  <p className="text-xl font-semibold text-gray-800">
                    {username}
                  </p>
                  <p className="text-gray-500">{email}</p>
                  <p className="text-gray-500">{phone}</p>
                </div>

                {/* Input fields and buttons */}
                <div className="flex flex-col gap-3 w-full">
                  <input
                    type="text"
                    value={username}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    value={phone}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <button
                    onClick={toggleEditMode}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Info
                  </button>

                  <Link
                    to="/my-products"
                    className="w-full px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    My Products
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
