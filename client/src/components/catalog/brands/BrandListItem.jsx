import { Link } from "react-router";

export default function BrandListItem({ name, img, path, onClick }) {
  return (
    <li className="w-full max-w-[120px] flex flex-col items-center pt-4 text-center">
      <Link
        to={path}
        onClick={onClick}
        className="block w-full p-2 bg-gray-50 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
      >
        <img
          src={img}
          alt={name}
          className="w-16 h-16 object-contain rounded-full mx-auto mb-2"
        />
        <span className="text-xs font-semibold text-gray-700">{name}</span>
      </Link>
    </li>
  );
}
