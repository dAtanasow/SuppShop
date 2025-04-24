import { useState } from "react";
import cartApi from "../../аpi/cart-api";
import { useGetCartItems } from "../../hooks/useCart";
import { useAuthContext } from "../../context/AuthContext";
import CartItem from "./CartItem";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Cart() {
  const { userId } = useAuthContext();
  const [cartItems, setCartItems, loading, error] = useGetCartItems(userId);
  const [modalItemId, setIsModalItemId] = useState(null);

  const updateItemQuantity = async (userId, itemId, newQuantity) => {
    try {
      await cartApi.updateCartItemQuantity(userId, itemId, newQuantity);
      const updatedCart = cartItems.map((item) =>
        item.productId._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Error updating item quantity", err);
    }
  };

  const removeItemHandler = async (userId, itemId) => {
    try {
      await cartApi.removeCartItem(userId, itemId);
      const updatedCart = cartItems.filter(
        (item) => item.productId._id !== itemId
      );
      setCartItems(updatedCart);
      setIsModalItemId(null);
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const calculateTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <motion.div
      className="cart-item flex items-center justify-between p-4 border-b"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 sm:px-4 w-full max-w-4xl">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item.productId}
              quantity={item.quantity}
              userId={userId}
              onRemove={removeItemHandler}
              onUpdateQuantity={updateItemQuantity}
              modalItemId={modalItemId}
              setIsModalItemId={setIsModalItemId}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </h2>
        </div>
        <div className="mt-4">
          <Link
            to="/"
            className="bg-green-500 text-white py-2 px-4 rounded-md w-full text-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
