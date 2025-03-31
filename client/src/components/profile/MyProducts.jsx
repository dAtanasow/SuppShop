import { useGetMyProducts } from "../../hooks/useProducts";
import Product from "../catalog/CatalogItem";

export default function MyProducts() {
  const [products, loading, error] = useGetMyProducts();

  if (loading) return <h3>Loading...</h3>;

  return (
    <section className="flex flex-col items-center">
      <div className="flex gap-10 flex-wrap justify-between p-5 w-[80vw]">
        {error ? (
          <h3 className="w-full text-center text-3xl">{error}</h3>
        ) : (
          products.map((product) => <Product key={product._id} {...product} />)
        )}
      </div>
    </section>
  );
}
