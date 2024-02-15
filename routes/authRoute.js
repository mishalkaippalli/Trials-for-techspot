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
} = require('../controller/userCtrl');


// user_route.set('view engine','ejs');//added

// user_route.set('view engine','ejs');
// user_route.use(express.static("public"));
// user_route.set('views', 'views/users');//added



router.get('/',loadregister);
router.get('/signup',signupadmin);
router.post('/signup',createUser);
router.post("/login", loginUserCtrl)
router.get('/all-users', getallUser)
router.get("/refresh", handleRefreshtoken);
router.get("/logout", logout);

router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);






module.exports = router;