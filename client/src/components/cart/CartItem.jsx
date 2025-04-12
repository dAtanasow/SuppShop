import ConfirmModal from "../ConfirmModal.jsx";

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
    <div className="cart-items">
      <div className="cart-item flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img
            src={item.imgURL}
            alt={item.title}
            className="w-30 object-cover mr-4"
          />
          <div>
            <h2 className="text-xl/8">
              {item.title} - {item.brand}
            </h2>
            <p className="text-gray-600 text-lg/8">${item.price}</p>
            <p className="text-gray-500 text-lg/8">{item.weight}g</p>
            <p className="text-gray-500 text-base/8">{item.flavour}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleDecrease}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleIncrease}
          >
            +
          </button>
          <button
            className="ml-4 text-red-500"
            onClick={() => setIsModalItemId(item._id)}
          >
            Remove
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
  );
}
