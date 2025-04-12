import { useGetAllProducts } from "../../hooks/useProducts";
import { useLocation } from "react-router-dom";
import Product from "./CatalogItem";

export default function Catalog() {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  const brand = new URLSearchParams(location.search).get("brand");

  const [products, loading, error] = useGetAllProducts(category, brand);

  if (loading) return <h3>Loading...</h3>;

  return (
    <section className="flex flex-col items-center">
      <h1 className="flex text-3xl justify-center p-3">
        {category
          ? category.toUpperCase()
          : brand
          ? brand.toUpperCase()
          : "All Products"}
      </h1>
      <div className="flex gap-20 flex-wrap justify-start pt-5 w-[80vw]">
        {error ? (
          <h3 className="w-full text-center text-3xl">{error}</h3>
        ) : (
          products.map((product) => <Product key={product._id} {...product} />)
        )}
      </div>
    </section>
  );
}
