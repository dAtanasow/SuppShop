const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User",
        required: true
    }],
    dislikes: [{
        type: ObjectId,
        ref: "User",
        required: true
    }],
})

module.exports = mongoose.model('Review', reviewSchema);