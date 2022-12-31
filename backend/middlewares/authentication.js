const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
const authentication=(req,res,next)=>{

    const token=req.headers?.authorization?.split(" ")[1]
    if(!token)
    {
         res.send("Please Login")
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const userId=decoded.userId
    if(decoded){
      console.log(decoded);
        req.body.userId=userId
        next()
      }
      else{
        res.send("Please Login")
      }
  
}
module.exports=authentication