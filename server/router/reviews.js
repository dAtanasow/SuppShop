const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { reviewsController } = require('../controllers');

router.get('/:productId', reviewsController.getProductReviews);
router.post('/:productId', auth(), reviewsController.postReview);

router.post('/:reviewId/like', auth(), reviewsController.like);
router.post('/:reviewId/dislike', auth(), reviewsController.dislike);

module.exports = router
