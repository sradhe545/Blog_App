const express=require('express')
const app=express.Router()
const User=require("../models/user.model")
const Post=require("../models/post.model")
const authentication = require('../middlewares/authentication')

//CREATE
app.post("/create",authentication,async (req,res)=>{
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
})
//UPDATE POST
app.put("/update/:id",authentication, async (req, res) => {
    try {   
          const post =await Post.findById(req.params.id)
          const updatedPost = await Post.findByIdAndUpdate({_id:req.params.id}, {
            $set: req.body,
          },
          { new: true })
          res.send({msg:"Updated Successfully",updatedPost})
    } catch (err) {
      res.status(500).json(err);
    }    
  });

// DELETE
app.delete("/delete/:id",authentication, async (req, res) => {
    try {   
        await Post.findByIdAndDelete({_id:req.params.id})  
        res.send({msg:"Deleted Successfully"})
    } catch (err) {
      res.status(500).json(err);
    }    
  });





















module.exports=app