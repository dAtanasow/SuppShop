import { useEffect, useState } from "react";
import productsApi from "../аpi/products-api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useForm } from "./useForm";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                setLoading(true);
                const result = await productsApi.getOne(productId);
                setProduct(result);
            } catch (err) {
                setError('Failed to fetch product.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [productId]);
    return { product, loading, error };
}

const initialProductState = {
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
};

export function useCreateProduct(productId) {
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [productData, setProductData] = useState(initialProductState);
    const navigate = useNavigate();
    const isEdit = !!productId;

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const product = await productsApi.getOne(productId);
                setProductData(product);
            } catch (err) {
                console.error(err);
                setError("Failed to load product details.");
            }
        };

        fetchProduct();
    }, [productId]);


    const validate = (values) => {
        const errors = {};
        const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

        if (!values.title?.trim() || values.title.trim().length < 3 || !/^[a-zA-Z0-9\s]+$/.test(values.title)) {
            errors.title = 'Title must be at least 3 characters and contain only letters and numbers';
        }
        if (!values.imgURL?.trim() || !urlPattern.test(values.imgURL.trim())) {
            errors.imgURL = 'Please provide a valid URL starting with http:// or https://';
        }
        if (!values.category) errors.category = "Category is required";
        if (!values.brand) errors.brand = "Brand is required";
        if (values.price < 1) errors.price = "Price must be at least 1";
        if (!values.flavour.trim() || values.flavour.trim().length < 3 || !/^[a-zA-Z\s]+$/.test(values.flavour)) {
            errors.flavour = 'Flavour is required and must be at least 3 letters';
        }
        if (values.weight < 1) errors.weight = "Weight must be at least 1 gram";
        if (values.servings < 1) errors.servings = "Servings must be at least 1";

        return errors;
    };

    const createOrUpdateProduct = async (values) => {
        const errors = validate(values);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const trimmedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) =>
                typeof value === "string" ? [key, value.trim()] : [key, value]
            )
        );

        try {
            if (isEdit) {
                await productsApi.update(productId, trimmedValues);
            } else {
                await productsApi.create(trimmedValues);
            }

            navigate(`/my-products`);
        } catch (err) {
            console.error(err.message);
            setError(
                isEdit
                    ? "Failed to update product. Please try again."
                    : "Failed to create product. Please try again."
            );
        }
    };

    const { values, changeHandler, submitHandler } = useForm(
        productData,
        createOrUpdateProduct,
        { reinitializeForm: !!productId }
    );

    return {
        isEdit,
        error,
        values,
        changeHandler,
        submitHandler,
        formErrors,
    };
};

export function useDeleteProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            await productsApi.remove(productId);
            navigate('/my-products');
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('There was an error deleting the product. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error };
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
                const result = await productsApi.getMyProducts();

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