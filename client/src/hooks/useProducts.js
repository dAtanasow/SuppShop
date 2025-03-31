import { useEffect, useState } from "react";
import productsApi from "../аpi/products-api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

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

export function useGetOneProduct(productId) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        (async () => {
            if (!productId) return;
            const result = await productsApi.getOne(productId);
            setProduct(result);
        })();
    }, [productId]);

    return [product, setProduct];
}

export function useCreateProduct(productId) {
    const [isEdit] = useState(!!productId);
    const [productData, setProductData] = useState({
        title: "",
        imgURL: "",
        category: "",
        price: 0,
        brand: "",
        description: "",
        flavour: "",
        weight: 0,
        servings: 0,
        ingredient: "",
        directions: "",
        warnings: "",
    });

    const navigate = useNavigate();
    const { userId } = useAuthContext();

    useEffect(() => {
        if (!productId) return;
        (async () => {
            try {
                const product = await productsApi.getOne(productId);
                setProductData(product);
            } catch (err) {
                console.error(err.message);
            }
        })()
    }, [productId]);

    const createOrUpdateProduct = async (values) => {

        try {
            isEdit
                ? await productsApi.update(productId, values)
                : await productsApi.create(values);


            navigate(`/users/${userId}/products`);
        } catch (err) {
            console.error(err.message);
        }
    };

    return {
        isEdit,
        productData,
        createOrUpdateProduct,
    };
};