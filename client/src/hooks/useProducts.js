import { useEffect, useState } from "react";
import productsApi from "../аpi/products-api";

export function useGetAllProducts(category, brand) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            const result = await productsApi.getAll(category, brand);
            if (result && result.length > 0) {
                setProducts(result);
            } else {
                setProducts([]);
                setError("No items found");
            }
            setLoading(false);
        })()
    }, [category, brand])

    return [products, loading, error];
}