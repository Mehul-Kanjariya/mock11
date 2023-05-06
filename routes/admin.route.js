const express = require("express");
const adminRouter = express.Router();
const {BookModel} = require("../model/book.model");

adminRouter.post("/",async (req, res)=>{
    try{
        const books = new BookModel(req.body);
        await books.save();
        res.status(201).send({"message":"New Book added"})
    }catch(err){
        res.status(400).send({"message":err.message})
    }
})

adminRouter.patch("/:id",async (req, res)=>{
    const {id} = req.params;
    const payload = req.body;
    try{
        const books = await BookModel.findByIdAndUpdate({_id:id},payload)
        res.status(204).send({"message":`Book with id ${id} has been updated`})
    }catch(err){
        res.status(400).send({"message":err.message})
    }
})

adminRouter.delete("/:id",async (req, res)=>{
    const {id} = req.params;
    try{
        const books = await BookModel.findByIdAndDelete({_id:id})
        res.status(202).send({"message":`Book with id ${id} has been deleted`})
    }catch(err){
        res.status(400).send({"message":err.message})
    }
})

module.exports={
    adminRouter
}