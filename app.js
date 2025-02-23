const express = require('express');
const app = express();
const cookieParser =require('cookie-parser')
const path = require('path')
const ownerRouter = require("./routes/ownerRouter")
const productRouter = require("./routes/productsRouter")
const userRouter = require("./routes/userRouter")
const indexRouter = require("./routes/index")
const db = require('./config/mongoose-connection');
const flash = require('connect-flash')
const expressSession = require("express-session")
require("dotenv").config();


app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")

 
app.use("/owner",ownerRouter)
app.use("/products",productRouter)
app.use("/users",userRouter)
app.use("/",indexRouter)
app.listen(3000)