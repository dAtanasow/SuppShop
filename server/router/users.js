const express = require('express');
const router = express.Router();
const { authController, productsController } = require('../controllers');
const { auth } = require('../utils');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth(), authController.logout);
router.get('/check-availability', authController.checkAvailable)

router.put('/:userId/profile', auth(), authController.editProfileInfo);


router.get('/:userId/products', productsController.getMyProducts);
router.get('/:userId', authController.getUserById);


module.exports = router