const express= require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const user = require("./router/user.router")
const cors=require("cors")
const authentication = require("./middlewares/authentication")
const post=require("./router/post.routes")
const app= express()


mongoose.connect(process.env.MONGO_URL||5000).then(()=>{console.log("Running")}).catch((err)=>{console.log(err)})
app.use(express.json())
app.use(cors())
app.use("/user",user)
app.use("/post",post)






app.listen(process.env.PORT,()=>{console.log(`Running at ${process.env.PORT}`)})