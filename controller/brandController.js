const Brand = require("../models/brandModel")
const Product = require("../models/productModel")

const getBrandPage = async (req, res) => {
    try {
    //    const brandData = await Brand.find({});
    //    res.render("brands", {data: brandData});
         res.render("page-brands");
    }catch(error){
        console.log(error.message);
    }
}

const addBrand = async (req, res) => {
    try{
        const brand = req.body.name;
        console.log(brand);
        const findBrand = await Brand.findOne({brand});
        if(!findBrand){
            const image = req.file.filename
            const newBrand = new Brand({
                brandName: brand,
                brandImage: image
            })

            await newBrand.save();
            res.redirect("/admin/brands");
        }

    } catch (error) {
        throw new Error(error);
    }
}

const getAllBrands = async (req, res)=> {
    try{
        res.redirect("/admin/brands")

    }catch(error){ 
        throw new Error(error)
    }
}

const blockBrand = async (req, res)=> {
    try{
        const id = req.query.id;
        await Brand.updateOne({_id: id}, {$set: {isBlocked: true}});
        console.log("brand blocked");
        res.redirect("/admin/brands");
    }catch(error){
        throw new Error(error)
    }
}

const unBlockBrand = async (req, res) => {
    try{
        const id = req.query.id;
        await Brand.updateOne({_id: id}, {$set: {isBlocked: false}});
        console.log("brand unblocked");
        res.redirect("/admin/brands");
    }catch(error){
        console.log(error);
    }
}

module.exports = { getBrandPage,
                   addBrand,
                   getAllBrands,
                   blockBrand,
                   unBlockBrand
};