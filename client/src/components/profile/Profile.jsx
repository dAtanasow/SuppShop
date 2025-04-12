import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import ProfileEdit from "./ProfileEdit";
import { Link } from "react-router-dom";

export default function Profile() {
  const { email, username, phone, img } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {isEditing ? "Edit Profile" : "Profile"}
        </h1>
        {isEditing ? (
          <ProfileEdit toggleEditMode={toggleEditMode} />
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-lg"
              src={img}
              alt="Profile"
            />
            <div className="text-center space-y-2">
              <p className="text-2xl font-semibold text-gray-800">{username}</p>
              <p className="text-lg text-gray-600">{email}</p>
              <p className="text-lg text-gray-600">{phone}</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={toggleEditMode}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>

              <Link
                to={`/my-products`}
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                My Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
