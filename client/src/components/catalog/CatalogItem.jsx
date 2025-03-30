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
    <Link to={`/catalog/${_id}`}>
      <div className="flex p-1 w-60">
        <div className="flex flex-col gap-2">
          <img src={imgURL} className="w-60 h-80 object-cover" />
          <h2>
            {title} - {brand}
          </h2>
          <p>{servings} servings</p>
          <p>{price}$</p>
        </div>
      </div>
    </Link>
  );
}
