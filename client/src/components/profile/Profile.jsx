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
    <div className="min-h-screen flex flex-col">
      {/* === Header Section === */}
      <div className="flex items-center justify-between px-4 py-5 bg-white border-b shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          {isEditing ? "Edit Profile" : "My Profile"}
        </h1>
        <Link to="/logout" className="text-red-500 hover:text-red-600">
          <LogOut size={22} />
        </Link>
      </div>

      {/* === Main Content === */}
      <div className="flex-grow p-6 flex flex-col items-center">
        {isEditing ? (
          <ProfileEdit toggleEditMode={toggleEditMode} />
        ) : (
          <>
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md mb-4"
              src={img}
              alt="Profile"
            />

            <div className="text-center mb-6 space-y-1">
              <p className="text-xl font-semibold text-gray-800">{username}</p>
              <p className="text-gray-500">{email}</p>
              <p className="text-gray-500">{phone}</p>
            </div>

            <div className="flex flex-col gap-3 w-full">
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
  );
}
