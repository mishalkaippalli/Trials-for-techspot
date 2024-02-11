const User = require("../models/userModel");
const path = require("path");
// const express = require("express");//added
// const app = express();//added
// app.use(express.static(path.join(__dirname, "./public"))); //added
// app.use(express.static(path.join(__dirname, "public")));//added

const asyncHandler = require("express-async-handler");

const loadregister = (req, res) => {
  console.log("In the usercntl",__dirname);
  console.log("iam inside loadregister")
   res.render('page-login-register');

}

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log("email id inside createUser",email);
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        // Create a new user
        console.log("I am inside if true of findUSer in userctrl");
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
      throw new Error("User already exists");
    }
})

module.exports = {createUser, loadregister};