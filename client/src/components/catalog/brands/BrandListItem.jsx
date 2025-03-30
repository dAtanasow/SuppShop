import { Link } from "react-router-dom";

export default function BrandListItem({ name, img, path }) {
  return (
    <li className="flex flex-col p-3 w-40 text-center justify-center hover:bg-gray-200">
      <Link to={path}>
        <img className="w-full" src={img} alt={name} />
      </Link>
    </li>
  );
}
