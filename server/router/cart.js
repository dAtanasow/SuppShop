const express = require('express');
const router = express.Router();
const { cartController } = require('../controllers');
const { auth } = require('../utils');

router.get('/:userId', cartController.getCartItems);

router.put('/:userId', auth(), cartController.addToCart);
router.put('/:userId/:itemId', auth(), cartController.updateCartItemQuantity);

router.delete('/:userId', auth(), cartController.removeFromCart);

module.exports = router
