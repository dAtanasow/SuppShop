import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import cartApi from "../аpi/cart-api";

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