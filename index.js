const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const authRouter = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
dbConnect();

// app.use('/', (req, res) => {
//     res.send("Hello from server side");
// });

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// app.get("/", (req, res) => {
//     res.render(path.join(__dirname, "views/users/page-login-register.ejs"))
// } )
app.set('view engine','ejs');
app.set('views', path.join(__dirname, "views/admin"));//added

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

console.log("In the index",__dirname);

app.use("/admin", authRouter);//modified

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});