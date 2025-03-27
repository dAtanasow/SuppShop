const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cartItemSchema = new mongoose.Schema({
    productId: { type: ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
    products: [cartItemSchema],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Cart', cartSchema);
