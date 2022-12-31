const express= require("express")
const app=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/user.model")
const Post=require("../models/post.model")
const { Router } = require("express")
const authentication = require("../middlewares/authentication")

// SIGNUP
app.post("/signup",async (req,res)=>{
    let {email,password,username} = req.body
    try{
        let existUser=await User.findOne({email})
        if(existUser){
            return res.send({msg:"User Already Exists"})
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err)
            {
                res.send({error:err})
            }
            const user=new User({email,password:hash,username})
            await user.save()
            res.send({success:user})
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Something went Wrong")
    }

})

// LOGIN
app.post("/login",async (req,res)=>{
    let {email,password} = req.body
    const user=await User.findOne({email})
    if(!user)
    {
        return res.send("User Not Found")
    }
    const hash=user.password
    // const user_id=user._id
    bcrypt.compare(password, hash, function(err, result) {
       if(err)
       {
        res.send({msg:"Something went wrong"})
       } 
       if(result){
         const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET);
         res.send({message:"Login Successful",token})
       }else{
          res.send({msg:"Invalid Credentials"})
       }
   });

})


//UPDATE
app.put("/update/:id",authentication,async (req,res)=>{
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(5);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your account!");
      }
    
})

app.get("/:id",authentication, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// DELETE
app.delete("/delete/:id",authentication, async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });


module.exports =app