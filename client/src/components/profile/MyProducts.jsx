import { useGetMyProducts } from "../../hooks/useProducts";
import Product from "../catalog/CatalogItem";

export default function MyProducts() {
  const [products, loading, error] = useGetMyProducts();

  if (loading) return <h3>Loading...</h3>;

  return (
    <section className="flex flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center py-4">
        My Products
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
