const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    brandName: {
        type: String, 
        required: true
    },
    brandImage: {
        type: Array,
        required: false
    },
    isBlocked: {
        type: Boolean,
        deafult: false,
    }
})

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;