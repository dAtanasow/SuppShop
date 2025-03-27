const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { reviewsController } = require('../controllers');

router.get('/product/:productId', reviewsController.getProductReviews);
router.get('/:reviewId', reviewsController.getReview);

router.post('/:productId', auth(), reviewsController.postReview);
router.post('/:reviewId/like', auth(), reviewsController.like);
router.post('/:reviewId/dislike', auth(), reviewsController.dislike);

module.exports = router
