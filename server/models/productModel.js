const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    flavour: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
    },
    directions: {
        type: String,
    },
    warnings: {
        type: String,
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    reviews: [{
        type: ObjectId,
        ref: "Review",
        required: true
    }],
    averageRating: {
        type: Number,
        default: 0,
    },
}, { timestamps: { createdAt: 'created_at' } });



module.exports = mongoose.model('Product', productSchema);