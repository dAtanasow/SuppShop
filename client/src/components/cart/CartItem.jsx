import { Link } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CartItem({
  item,
  userId,
  onRemove,
  quantity,
  onUpdateQuantity,
  modalItemId,
  setIsModalItemId,
}) {
  const handleIncrease = () => {
    onUpdateQuantity(userId, item._id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(userId, item._id, quantity - 1);
    }
  };

  return (
    <motion.div
      className="cart-item flex items-center justify-between p-4 border-b"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cart-item flex flex-col sm:flex-row items-center justify-between p-4 gap-4 sm:gap-6 border-b bg-white rounded-xl shadow-sm w-full sm:w-[calc(33.3333%-1rem)] md:w-[calc(25%-1rem)] flex-shrink-0">
        {/* Секция: Изображение */}
        <Link to={`/catalog/${item._id}`} className="flex-shrink-0">
          <div className="w-full h-40 sm:h-36 lg:h-44 relative">
            <img
              src={item.imgURL}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
        </Link>

        {/* Секция: Инфо + бутони */}
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-6">
          {/* Текст */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-lg font-semibold">
              {item.title} - {item.brand}
            </h2>
            <p className="text-green-700 text-lg">${item.price}</p>
            <p className="text-gray-500 text-sm">{item.weight}g</p>
            <p className="text-gray-500 text-sm">{item.flavour}</p>
          </div>

          {/* Бутоните */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <button
                className="w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={handleDecrease}
              >
                <Minus />
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="w-6 h-6 bg-green-500 text-white rounded-full hover:bg-green-600"
                onClick={handleIncrease}
              >
                <Plus />
              </button>
            </div>
            <button
              className="text-red-600 text-sm hover:underline"
              onClick={() => setIsModalItemId(item._id)}
            >
              <Trash2 />
            </button>

            <ConfirmModal
              isOpen={modalItemId === item._id}
              message="Are you sure you want to remove this item?"
              onConfirm={() => onRemove(userId, item._id)}
              onCancel={() => setIsModalItemId(null)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
