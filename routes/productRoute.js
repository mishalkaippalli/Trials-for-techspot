const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/productController');
const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")
const router = express.Router();
console.log(isAdmin);

router.post('/',authMiddleware, isAdmin, createProduct);
router.get('/getallproducts',authMiddleware, isAdmin, getAllProduct);
router.get('/:id', getaProduct);
router.put('/:id', updateProduct);
router.delete('/:id',authMiddleware, isAdmin, deleteProduct)



module.exports = router;