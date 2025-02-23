const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","You need to login first")
        return res.redirect("/")
    }

    try {

        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEYS)
        console.log(decoded)
        let user =await userModel.findOne({email:decoded.email})
        console.log(user);
        
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");  // If the user is not found, redirect to login
        }
        req.user = user
        next()
    } catch (error) {
        req.flash("error","Smethig went wrong")
        res.redirect("/")
    }
}