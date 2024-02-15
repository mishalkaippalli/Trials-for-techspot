const express = require('express');
const { createProduct, getaProduct, getAllProduct } = require('../controller/productController');
const router = express.Router();


router.post('/', createProduct);


router.get('/getallproducts', getAllProduct);
router.get('/:id', getaProduct);



module.exports = router;