import { useGetMyProducts } from "../../hooks/useProducts";
import Product from "../catalog/CatalogItem";

export default function MyProducts() {
  const [products, loading, error] = useGetMyProducts();

  if (loading) return <h3>Loading...</h3>;

  return (
    <section className="flex flex-col items-center">
      <h1 className="flex text-3xl justify-center p-3">My Products</h1>
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
