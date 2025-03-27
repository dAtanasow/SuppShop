const express = require('express');
const router = express.Router();

const users = require('./users');
const products = require('./products');
const reviews = require('./reviews');
const cart = require('./cart');


router.use('/users', users);
router.use('/catalog', products);
router.use('/reviews', reviews);
router.use('/cart', cart);



module.exports = router;