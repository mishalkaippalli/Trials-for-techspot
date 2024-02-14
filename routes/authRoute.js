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
    unblockUser 
} = require('../controller/userCtrl');


// user_route.set('view engine','ejs');//added

// user_route.set('view engine','ejs');
// user_route.use(express.static("public"));
// user_route.set('views', 'views/users');//added



router.get('/',loadregister);
router.post('/register',createUser);
router.post("/login", loginUserCtrl)
router.get('/all-users', getallUser)
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);



module.exports = router;