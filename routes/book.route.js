const express = require("express");
const bookRouter = express.Router();
const {BookModel} = require("../model/book.model");

bookRouter.get('/',async(req,res)=>{
    let {category} = req.query;
    let {author} = req.query;

    if(category && author){
        try{
            let books = await BookModel.find({$and:[{category},{author}]});
            res.status(200).send(books);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }else if(category){
        try{
            let books = await BookModel.find({category});
            res.status(200).send(books);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }else{
        try{
            let books = await BookModel.find();
            res.status(200).send(books);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }
})

bookRouter.get('/:id',async(req,res)=>{
    let {id}=req.params;
    try{
        let books = await BookModel.findById({_id:id});
        res.status(200).send(books);
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports={
    bookRouter
}