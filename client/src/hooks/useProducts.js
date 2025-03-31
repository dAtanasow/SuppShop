import { useEffect, useState } from "react";
import productsApi from "../аpi/products-api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import userApi from "../аpi/auth-api";

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

    return [product];
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

export function useDeleteProduct() {
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    const deleteProduct = async (productId) => {
        const isConfirmed = confirm('Are you sure you want to delete this product?')
        if (!isConfirmed) {
            return;
        }
        await productsApi.remove(productId);
        navigate(`/users/${userId}/products`);
    };

    return deleteProduct;
}

export function useGetMostRated(category) {
    const [topFiveProducts, setTopFiveProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostRatedProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await productsApi.getAll(category);
                if (!result || result.length === 0) {
                    setError("No products found for this category");
                } else {
                    const sortedProducts = result.sort(
                        (a, b) => b.averageRating - a.averageRating
                    );
                    setTopFiveProducts(sortedProducts);
                }
            } catch (err) {
                setError("Error fetching products");
                console.log(err.message);

            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchMostRatedProducts();
        }
    }, [category]);

    return [topFiveProducts, loading, error];
}

export function useGetMyProducts() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuthContext();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await userApi.getMyProducts(userId);

                setProducts(Array.isArray(result) ? result : []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProducts();
        }
    }, [userId]);
    return [products, loading, error];
}