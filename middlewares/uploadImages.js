const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()+ '-'+ Math.round(Math.random()* le9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg")
    },  
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }
    else {
        cb({
            message: "Unsuppported file format"
        }, false)
    }
}

const uploadPhoto = multer({
    storage: multerStorage,
    filerFilter: multerFilter,
    limits: {fieldSize: 7000000},
});

const productImgResize = async(req, res, next) => {
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async(file) => {
            await sharp(file.path)
            .resize(300,300)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`public/uploads/products/${file.filename}`);
        })
    );
    next();
};

module.exports = {uploadPhoto, productImgResize}
