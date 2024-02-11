const express = require('express');
const router = express.Router();//added
const path = require("path");

const { createUser, loadregister } = require('../controller/userCtrl');


// user_route.set('view engine','ejs');//added

// user_route.set('view engine','ejs');
// user_route.use(express.static("public"));
// user_route.set('views', 'views/users');//added

console.log("In the auth route",__dirname);
console.log("In the auth route 2",path.basename(__dirname));


//  user_route.use(express.static('public'));

// router.use(express.static(path.join(__dirname, "public")));

router.get('/register',loadregister);

// router.post('/register',createUser);

module.exports = router;