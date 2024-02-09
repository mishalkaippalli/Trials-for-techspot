const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const authRouter = require("./routes/authRoute");
dbConnect();

// app.use('/', (req, res) => {
//     res.send("Hello from server side");
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/user", authRouter);
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});