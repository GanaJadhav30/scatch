const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner-model')

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV==="development"){
    router.post("/create",async(req,res)=>{
        let owner = await ownerModel.find();
        if(owner.length>0){
            return res
            .status(503)
            .send("You do not have permission ")
        }else{
            let {fullname,email,password}=req.body
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            })
            res.send(createdOwner)
        }

    })
}


router.get("/",(req,res)=>{
    res.send("Hey its working")
})

router.get("/admin",(req,res)=>{
    let success = req.flash("success")
    res.render("createProducts",{success})
})

module.exports = router;