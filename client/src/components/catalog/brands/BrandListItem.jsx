import { Link } from "react-router-dom";

export default function BrandListItem({ name, img, path, onClick }) {
  return (
    <li className="w-full max-w-[110px] flex flex-col items-center text-center">
      <Link
        to={path}
        onClick={onClick}
        className="block w-full p-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <img
          src={img}
          alt={name}
          className="w-16 h-16 object-cover rounded mx-auto mb-1"
        />
        <span className="text-xs font-medium">{name}</span>
      </Link>
    </li>
  );
}
