const express = require("express");
const userModel = require("../models/user-model");
const router = express();
const {registerUser, loginUser,logout} = require("../controller/authController")

router.get("/",(req,res)=>{
    res.send("Hello")
})

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout)
module.exports = router;