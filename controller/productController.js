const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try{
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch(error){
         throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (req, res)=> {
    const  {id}  = req.params;
    console.log(id);
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        console.log(updateProduct);
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
})

const deleteProduct = asyncHandler(async (req, res)=> {
    const  {id}   = req.params;
    console.log(id);
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct)
    } catch (error) {
        throw new Error(error);
    }
})


const getaProduct = asyncHandler(async (req, res)=> {
    const {id} = req.params;
    try{
        const findProduct = await Product.findById(id);
        console.log("Iam inside getaproduct try",findProduct);
        res.json({findProduct});
    }catch(error){
        console.log("Iam inside getaproduct catch",error)
         throw new Error(error);
    }
})
const getAllProduct = asyncHandler(async(req, res) => {
    try{
      const getallProduct = await Product.find({});
      console.log(getallProduct);
      res.json(getallProduct);
    } catch(error) {
        console.log("Iam inside getalproducts catch", error);
      throw new Error(error);
    }
})




module.exports = {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};











