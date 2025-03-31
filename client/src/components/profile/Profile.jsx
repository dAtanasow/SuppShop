import { useAuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { email, username, phone, img } = useAuthContext();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8"></h1>
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
        </div>
      </div>
    </div>
  );
}
