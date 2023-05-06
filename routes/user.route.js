const express = require("express");
const userRouter = express.Router();
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async(req,res)=>{
    const {email,password,name,isAdmin} = req.body;
    bcrypt.hash(password, 5, async(err, hash)=>{
        if(hash){
            try{
                const user = new UserModel({email,password:hash,name,isAdmin});
                await user.save();
                res.status(201).send({"message":"New User Registered"});
            }catch(err){
                res.status(400).send({"message":err.message});
            }
        }else{
            res.status(400).send({"message":err.message});
        }
    })
})

userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    res.status(201).send({"message":"Login successful", "token":jwt.sign({"userID":user._id},'MASAI')})
                }else{
                    res.status(400).send({"message":"Wrong Credentials"});
                }
            })
        }else{
            res.status(400).send({"message":"Email not registered"});
        }
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports={
    userRouter
}