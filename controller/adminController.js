const User = require("../models/userModel");
const {generateToken} = require("../config/jwtToken")
const path = require("path");
const asyncHandler = require("express-async-handler");
const validateMongodbid = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loadregister = (req, res) => {
  try{
    console.log("In the usercntl",__dirname);
    console.log("iam inside loadregister")
    res.render('page-account-login');
  } catch (error) {
    console.log(error.message);
  }
}

const signupadmin = (req, res) => {
  try{
    res.render('page-account-register');
  } catch (error) {
    console.log(error.message);
  }
  

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
// verify login instead of login a user in the down trial from laplux 

const verifyLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(email);

    const findAdmin = await User.findOne({email, role: "admin"});

    if(findAdmin) {
      const passwordMatch = await bcrypt.compare(password, findAdmin.password);
      if(passwordMatch) {
        req.session.admin = true;
        console.log("Admin id logged in");
        res.redirect("/admin/dashboard");
        res.json(findAdmin)
      } else {
        console.log("Password is incorect");
        res.redirect("/admin/login")
        
      }
    } else {
      console.log("You are not an admin");
    }
  } catch (error) {
    console.log(error.message);
  }
}

//Loign a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  //check if user exists otr not
  const findUser = await User.findOne({email});
  console.log("I am inside loginuserctrl and afer finding user")
  console.log(findUser);

  if(findUser && await findUser.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {new : true}
    );
    res.cookie('refreshToken', refreshToken,{
      httpOnly:true,
      maxAge:72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    console.log("in else of loginuserctrl")
    throw new Error("Invalid Credentials");
  }
 })

// Handle refresh token
const handleRefreshtoken = asyncHandler(async(req, res) => {
  const cookie = req.cookies;
  console.log("I am inside handlerefreshtoken",cookie);
  if(!cookie?.refreshToken) throw new Error ('No refresh token in cookies');
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if(!user) throw new Error ('No Refresh token present in db or not matched');
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if(err || user.id !== decoded.id) {
      throw new Error ("There is somehting wrong with refresh token");
    } 
    const  accessToken = generateToken(user?._id);
    res.json({accessToken});
  })
});

// logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if(!cookie?.refreshToken) throw new Error ('No refresh token in cookies');
  const refreshToken = cookie.refreshToken;
  console.log("Iam inside logout refreshtoken: ", refreshToken);
  const user = await User.findOne({refreshToken});
  if(!user){
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    })
    return res.sendStatus(204);//forbidden
  }
  await User.findOneAndUpdate({refreshToken}, {
    refreshToken: "",
  })
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
   res.sendStatus(204);//forbidden
});


 //update a user
const updatedUser = asyncHandler(async(req, res) => {
  const { _id } = req.user;
  validateMongodbid(_id);
  console.log("Inside update user",req.user);
  try{
    const updatedUser = await User.findByIdAndUpdate(_id, 
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },
    {
      new: true,
    }
    );
    res.json(updatedUser)
  } catch (error) {
    throw new Error(error);
  }
})



 //Get all users
const getallUser = asyncHandler(async(req, res)=>{
  try {
  const getUsers = await User.find();
  res.json(getUsers)
  }
  catch(error) {
   throw new Error(error)
  }
});

// Get a single user
const getaUser = asyncHandler(async(req,res) => {
  const {id} = req.params;
  validateMongodbid(id);
  try{
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    })
  } catch (error) {
    throw new Error(error);
  }
}) 

// Delete a single user
const deleteaUser = asyncHandler(async(req,res) => {
  const {id} = req.params;
  console.log(id);
  try{
    const deleteaUser = await User.findByIdAndDelete( id );
    res.json({
      deleteaUser,
    })
  } catch (error) {
    throw new Error(error);
  }
}) 
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const blockUser = await User.findByIdAndUpdate(id,
       {
        isBlocked: true,
       },
       {
        new: true,
       }
       );
       res.json({
        message: blockUser,
       })
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const unblock = await User.findByIdAndUpdate(id,
       {
        isBlocked: false,
       },
       {
        new: true,
       }
       );
       res.json({
        message: unblock,
       })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {createUser, loadregister, loginUserCtrl, getallUser,
   getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshtoken,
  logout, signupadmin, verifyLogin
  };