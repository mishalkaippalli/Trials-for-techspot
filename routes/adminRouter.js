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
        getProductAddPage
     } = require('../controller/productController');


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
router.get('/getallproducts',authMiddleware, isAdmin, getAllProduct);
router.post('/createproducts',authMiddleware, isAdmin, createProduct);
router.get('/getaProduct/:id', getaProduct);
router.put('/updateaProduct/:id', updateProduct);
router.delete('/deleteaProduct/:id',authMiddleware, isAdmin, deleteProduct);


module.exports = router;