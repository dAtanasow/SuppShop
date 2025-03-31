const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require('mongoose');

async function getReview(req, res) {
    const { reviewId } = req.params

    if (!reviewId) {
        return res.status(400).json({ error: 'Review ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ message: 'Invalid review ID' });
    }

    try {
        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

async function getProductReviews(req, res) {
    const { productId } = req.params;

    try {
        const product = await productModel
            .findById(productId)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'userId',
                    select: 'username'
                }
            });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            reviews: product.reviews,
        });
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function postReview(req, res) {
    const { rating, comment } = req.body;
    const userId = req.user?._id;
    const { productId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const ratingValue = Number(rating);

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        return res.status(400).json({ error: "Invalid rating value" });
    }

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingReview = await reviewModel.findOne({ productId, userId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already posted a review for this product.' });
        }

        const newReview = new reviewModel({
            productId: productId,
            userId: userId,
            rating: ratingValue,
            comment: comment || '',
            createdAt: new Date(),
        });

        await newReview.save();

        product.reviews.push(newReview._id);

        const allReviews = await reviewModel.find({ productId });

        const totalRatings = allReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
        const averageRating = allReviews.length > 0 ? totalRatings / allReviews.length : 0;

        product.averageRating = !isNaN(averageRating) ? Number(averageRating.toFixed(2)) : 0;
        product.ratingCount = allReviews.length;

        await product.save();

        res.status(201).json({
            product,
            review: newReview
        });
    } catch (error) {
        console.error('Error posting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function like(req, res) {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.likes.includes(userId)) {
            review.likes.pull(userId);
        } else {
            review.dislikes.pull(userId);
            review.likes.push(userId);
        }

        await review.save();

        res.status(200).json({
            likeCount: Number(review.likes.length),
            dislikeCount: Number(review.dislikes.length)
        });
    } catch (error) {
        console.error("Error liking review:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function dislike(req, res) {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.dislikes.includes(userId)) {
            review.dislikes.pull(userId);
        } else {
            review.likes.pull(userId);
            review.dislikes.push(userId);
        }

        await review.save();

        res.status(200).json({
            likeCount: Number(review.likes.length),
            dislikeCount: Number(review.dislikes.length)
        });
    } catch (error) {
        console.error("Error disliking review:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getReview,
    getProductReviews,
    postReview,
    like,
    dislike,
}