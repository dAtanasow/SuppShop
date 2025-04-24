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
      <div className="flex flex-col sm:flex-row p-4 gap-4 sm:gap-6 border-b w-full rounded-xl bg-white shadow-sm">
        {/* Секция: Изображение */}
        <Link to={`/catalog/${item._id}`} className="flex-shrink-0">
          <div className="w-full max-w-[150px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] mx-auto overflow-hidden">
            <img
              src={item.imgURL}
              alt={item.title}
              className="w-full h-auto object-cover rounded-xl shadow-md border-none"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>
        </Link>

        {/* Секция: Инфо + бутони */}
        <div className="flex flex-col sm:flex-row flex-grow justify-between w-full">
          {/* Текстов блок */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-lg font-semibold">
              {item.title} - {item.brand}
            </h2>
            <p className="text-green-700 text-lg">${item.price}</p>
            <p className="text-gray-500 text-sm">{item.weight}g</p>
            <p className="text-gray-500 text-sm">{item.flavour}</p>
          </div>

          {/* Бутоните: най-долу вдясно */}
          <div className="flex flex-col sm:flex-col items-center sm:items-end gap-2 mt-4 sm:mt-auto self-end w-full sm:w-auto">
            {/* Бутоните за количество – центрирани на мобилна */}
            <div className="flex justify-center sm:justify-end items-center gap-2 w-full">
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

            {/* Бутон за изтриване – вдясно на мобилна, както си беше на десктоп */}
            <div className="flex justify-end w-full">
              <button
                className="text-red-600 text-sm hover:underline"
                onClick={() => setIsModalItemId(item._id)}
              >
                <Trash2 />
              </button>
            </div>

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
