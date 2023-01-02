const mongoose=require('mongoose')
const userSchema=new mongoose.Schema(  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://tse1.mm.bing.net/th?id=OIP._VoTfUzENldEmDbFEcQi4QHaHa&pid=Api&rs=1&c=1&qlt=95&w=109&h=109",
    },
  },
  { timestamps: true })


const User=mongoose.model("user",userSchema)
module.exports=User