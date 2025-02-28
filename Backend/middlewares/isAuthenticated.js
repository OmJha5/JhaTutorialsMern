import User from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export let isAuthenticated = async(req , res , next) => {
    try{
        let token = req.cookies.jhaTutorialsToken

        if(!token){
            return res.status(401).json({
                message : "Token Expired, Please login!",
                success : false
            })
        }

        const decode =  jwt.verify(token , process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        }

        let isUserExist = await User.findOne({email : decode.email}).select("-password");
        if(!isUserExist) {
            return res.status(401).json({
                message : "Please Login to continue",
                success : false,
            })
        }

        return next();
    }
    catch(e){
        res.status(400).json({
            message : "Internal Server Error",
            success : false
        })
    }
}