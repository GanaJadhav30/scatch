const jwt = require('jsonwebtoken')
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt')
const {generateToken} = require('../utils/generateToken')
const productModel=require("../models/product-model")

module.exports.registerUser = async(req,res)=>{
    

    try {

        let{fullname,email,password}= req.body
        let user =await userModel.findOne({email:email})

        if(user){
            res.status(401).send("You already have account please login!")
        }else{
            bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                let user = await userModel.create({
                    fullname,
                    email,
                    password:hash,
                })
                let token = generateToken(user)
                res.cookie("token",token)
                res.send("User created successfully")
            });
        });
        }
        
        
        
        
    } catch (error) {
        res.send(error.message);
        
    }
}


module.exports.loginUser =async function(req,res){
    let{email,password}=req.body

    let user=await userModel.findOne({email:email})

    if(!user) {
        req.flash("error","Email or Password wrong")
        return res.redirect("/")
    }
    
    bcrypt.compare(password,user.password,async function(err,result){
        if(result){
            let products = await productModel.find();
            let token = generateToken(user)
            res.cookie("token",token)
            return res.redirect("/shop")
        }else{
         req.flash("Email or Password wrong")
            return res.redirect("/")
        }
    })
}

module.exports.logout= async function(req,res){
    res.cookie("token","")
    res.redirect("/")
}

