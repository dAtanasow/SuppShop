import { Link } from "react-router-dom";
import { useGetMostRated } from "../../hooks/useProducts";

export default function MostRatedSection({ title, category }) {
  const [topFiveProducts, loading, error] = useGetMostRated(category);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <article className="flex w-full justify-center">
      <div>
        <p className="text-xl text-center p-5 font-semibold mb-4">{title}</p>
        <div className="flex gap-10">
          {topFiveProducts.map((product) => (
            <Link to={`/catalog/${product._id}`} key={product._id}>
              <div className="flex flex-col w-60 items-center">
                <img
                  src={product.imgURL}
                  alt={product.title}
                  className="w-full max-h-60 object-cover mb-2"
                />
                <p className="text-center font-semibold">{product.title}</p>
                <p className="text-yellow-500 text-xl/5">
                  {"★".repeat(Math.round(product.averageRating))}
                  {"☆".repeat(5 - Math.round(product.averageRating))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
