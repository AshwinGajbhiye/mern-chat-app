 import jwt from "jsonwebtoken";

 const generateTokenAndSetCookies = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECERET,{
        expiresIn:"15d"
    }); 

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true, //prevent xss attacks cross-site scripting attacks
        sameSite: "strict",
        secure:process.env.NODE_ENV !== "developmnt"
    })
 }

 export default generateTokenAndSetCookies;