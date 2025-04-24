import { Link } from "react-router-dom";

export default function Product({
  _id,
  title,
  imgURL,
  brand,
  servings,
  price,
}) {
  return (
    <Link
      to={`/catalog/${_id}`}
      className="block transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 p-4 flex flex-col items-center h-full">
        <img
          src={imgURL}
          alt={title}
          className="w-full h-40 md:h-60 object-cover rounded-lg mb-4"
        />
        <h2 className="text-sm font-semibold text-gray-800 text-center mb-1">
          {title}
        </h2>
        <p className="text-xs text-gray-500 text-center mb-1">{brand}</p>
        <p className="text-sm text-gray-700">{servings} servings</p>
        <p className="text-base font-bold text-blue-600">{price}$</p>
      </div>
    </Link>
  );
}
