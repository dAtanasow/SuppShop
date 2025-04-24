import { useGetAllProducts } from "../../hooks/useProducts";
import { useLocation } from "react-router-dom";
import Product from "./CatalogItem";

export default function Catalog() {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  const brand = new URLSearchParams(location.search).get("brand");

  const [products, loading, error] = useGetAllProducts(category, brand);

  if (loading) return <h3 className="text-center mt-10 text-xl">Loading...</h3>;

  return (
    <section className="flex flex-col  px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center py-4">
        {category
          ? category.toUpperCase()
          : brand
          ? brand.toUpperCase()
          : "All Products"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto w-full max-w-screen-xl px-2">

        {error ? (
          <div className="w-full col-span-full flex justify-center items-center min-h-[200px]">
            <h3 className="w-full text-center text-3xl">{error}</h3>
          </div>
        ) : (
          products.map((product) => <Product key={product._id} {...product} />)
        )}
      </div>
    </section>
  );
}
