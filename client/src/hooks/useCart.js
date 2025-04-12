import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import cartApi from "../аpi/cart-api";
import { toast } from "react-toastify";

export function useGetCartItems() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuthContext();

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await cartApi.getCart(userId);
            if (result && result.products.length > 0) {
                setCartItems(result.products);
            } else {
                setCartItems([]);
                setError("No items found");
            }
        } catch (err) {
            setError("No items found");
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return [cartItems, setCartItems, loading, error];
}

export function useAddToCart(productId) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useAuthContext();

    const addToCartHandler = async () => {
        try {
            await cartApi.addToCart(productId, userId);
            setLoading(false);
            toast.success('Product added to your cart!');
        } catch (err) {
            setError(err.message || "An error occurred while adding to cart");
        } finally {
            setLoading(false);
        }
    };
    return { addToCartHandler, loading, error };
}