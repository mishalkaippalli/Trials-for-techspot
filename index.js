const express = require("express");
const app = express();

const dbConnect = require("./config/dbConnect");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const adminRoutes = require("./routes/adminRouter");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoute");
const morgan = require("morgan");
dbConnect();

const session = require("express-session");
const nocache = require("nocache");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 72 * 60 * 60 * 1000,
        httpOnly: true
    }
}))

app.set('view engine','ejs');
app.set('views', path.join(__dirname, "views/admin"));//added

app.use(express.static(path.join(__dirname, "public")));


app.use("/admin", adminRoutes);//modified
// app.use("/admin/product", productRouter);//modified


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});