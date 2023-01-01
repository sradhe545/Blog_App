const express= require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const user = require("./router/user.router")
const category=require("./router/category.route")
const cors=require("cors")
const authentication = require("./middlewares/authentication")
const multer = require("multer");
const post=require("./router/post.routes")
const app= express()


mongoose.connect(process.env.MONGO_URL||5000).then(()=>{console.log("Running")}).catch((err)=>{console.log(err)})
app.use(express.json())
app.use(cors())


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, "hello.jpeg");
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });



app.use("/user",user)
app.use("/post",post)
app.use("/category",category)







app.listen(process.env.PORT,()=>{console.log(`Running at ${process.env.PORT}`)})