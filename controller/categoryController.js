const Category = require("../models/categoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongodbid = require("../utils/validateMongoDbId.js");

 
const createCategory = asyncHandler(async(req, res) => {
    try{
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    }
    catch (error) {
      throw new Error(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id);
    validateMongodbid(id);
    try{
       const updatedCategory = await Category.findByIdAndUpdate(id, req.body,{new: true});
       res.json(updatedCategory);
    }catch(error){
        throw new Error(error);
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbid(id);
    try{
       const deletedCategory = await Category.findByIdAndDelete(id);
       res.json(deletedCategory);
    }catch(error){
        throw new Error(error);
    }
})

const getCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbid(id);
    try{
       const getCategory = await Category.findById(id);
       res.json(getCategory);
    }catch(error){
        throw new Error(error);
    }
})

const getallCategory = asyncHandler(async (req, res) => {
    try{
       const getallCategory = await Category.find();
       res.json(getallCategory);
    }catch(error){
        throw new Error(error);
    }
})
module.exports = {
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategory,
    getallCategory,
};

