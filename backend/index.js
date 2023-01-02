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
const path = require("path");

app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(process.env.MONGO_URL||5000).then(()=>{console.log("Running")}).catch((err)=>{console.log(err)})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
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