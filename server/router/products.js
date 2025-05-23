const express = require('express');
const router = express.Router();

const { auth } = require('../utils');
const { productsController } = require('../controllers');


router.get('/', productsController.getAll);
router.post('/create', auth(), productsController.create);
router.get('/my-products', auth(), productsController.getMyProducts);

router.get('/:productId', productsController.getOne);
router.put('/:productId/edit', auth(), productsController.update);

router.delete('/:productId/delete', auth(), productsController.remove);

module.exports = router
