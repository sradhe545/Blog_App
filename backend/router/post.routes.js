const express=require('express')
const app=express.Router()
const User=require("../models/user.model")
const Post=require("../models/post.model")
const authentication = require('../middlewares/authentication')


// GET ALL THE POST
app.get("/all", async (req, res) => {
    const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({categories: {$in: [catName],},});
    } else {
      posts = await Post.find();
    }
   
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }  
  });


  // GET THE POST
app.get("/:id", async (req, res) => {
  try {   
      const post=await Post.findById({_id:req.params.id})  
      res.send({msg:post})
  } catch (err) {
    res.status(500).json(err);
  }    
});
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


// GET ALL MY POST
app.get("/mypost",authentication, async (req, res) => {
    const {userId}=req.body
    res.send("id is"+userId)
    // try {   
    //     const post=await Post.find(req.body.userId)  
    //     res.send({msg:post})
    // } catch (err) {
    //   res.status(500).json(err);
    // }    
  });

















module.exports=app