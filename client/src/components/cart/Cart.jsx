import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useGetCartItems } from "../../hooks/useCart";
import cartApi from "../../аpi/cart-api";
import CartItem from "./CartItem";

export default function Cart() {
  const { userId } = useAuthContext();
  const [cartItems, setCartItems, loading, error] = useGetCartItems(userId);

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
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await cartApi.removeCartItem(userId, itemId);
      const updatedCart = cartItems.filter(
        (item) => item.productId._id !== itemId
      );
      setCartItems(updatedCart);
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
    <div className="container mx-auto p-4 w-[70vw] mx-auto">
      <h1 className="text-3xl text-center p-5">CART</h1>
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
        <Link to="/" className="bg-green-500 text-white py-2 px-4 rounded-md">
          Checkout
        </Link>
      </div>
    </div>
  );
}
