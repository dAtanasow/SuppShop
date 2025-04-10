const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth(), authController.logout);
router.put('/:userId/profile', auth(), authController.editProfileInfo);

router.get('/check-availability', authController.checkAvailable)
router.get('/:userId', auth(), authController.getUserById);


module.exports = router