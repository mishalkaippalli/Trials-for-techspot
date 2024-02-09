const {default: mongoose} = require("mongoose")
const dbConnect = async () => {
    try{
        console.log(process.env.MONGODB_URL)
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log("Database successfully connected");
    } catch (error) {
       console.log("Database error",error);
    }
};
module.exports = dbConnect;