const express = require('express');
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
// const path = require("path");

const { createUser, 
    loadregister, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updatedUser,
    blockUser,
    unblockUser, 
    handleRefreshtoken,
    logout,
    signupadmin
    } = require('../controller/adminController');

const { createProduct,
        getaProduct,
        getAllProduct, 
        updateProduct, 
        deleteProduct, 
        getProductAddPage,
        uploadImages
     } = require('../controller/productController');

const { createCategory, 
        updateCategory,
        deleteCategory,
        getCategory,
        getallCategory
     } = require('../controller/categoryController');

const brandController = require('../controller/brandController');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');


//Admin Actions
router.get('/',loadregister);
router.get('/signup',signupadmin);
router.post('/signup',createUser);
router.post("/login", loginUserCtrl)
router.get('/all-users', getallUser)
router.get("/refresh", handleRefreshtoken);
router.get("/logout", logout);
// router.get('/:id', authMiddleware, isAdmin, getaUser);
// router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

//Product Management
router.get('/addproducts',getProductAddPage)
router.put("/product/upload/:id", authMiddleware, isAdmin,
             uploadPhoto.array("images", 10),productImgResize,uploadImages);
router.get('/getallproducts',authMiddleware, isAdmin, getAllProduct);
router.post('/createproducts',authMiddleware, isAdmin, createProduct);
router.get('/getaProduct/:id', getaProduct);
router.put('/updateaProduct/:id', updateProduct);
router.delete('/deleteaProduct/:id',authMiddleware, isAdmin, deleteProduct);

//Category Management
router.post("/category",authMiddleware, isAdmin, createCategory);
router.put("/category/update/:id:",authMiddleware, isAdmin, updateCategory);
router.delete("/category/delete/:id",authMiddleware, isAdmin, deleteCategory);
router.get("/category/get/:id",authMiddleware, isAdmin, getCategory);
router.get("/category/getall",authMiddleware, isAdmin, getallCategory);

//Brand Management
router.get("/brands", brandController.getBrandPage);
router.post("/brands/newbrand", brandController.addBrand);
router.get("/brand/getallbrands", brandController.getAllBrands);
router.put("/brands/block", brandController.blockBrand);
router.put("/brands/unblock", brandController.unBlockBrand);



module.exports = router;