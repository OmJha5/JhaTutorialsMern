import User from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export let login = async (req , res) => {
    try{
        const {email , password , role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message : "Something is missing!",
                success : false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Incorrect Email Or Password or Role!",
                success : false,
            })
        }

        let status = await bcrypt.compare(password , user.password)
        if(!status){
            return res.status(400).json({
                message : "Incorrect Email Or Password or Role!",
                success : false,
            })
        }

        // Check if role is correct or not
        if(role != user.role){
            return res.status(400).json({
                message : "Incorrect Email Or Password or Role!",
                success : false,
            })
        }

        const tokenData = {
            email : user.email,
            role : user.role,
        }

        const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn : "7d"})

        user = {
            _id : user._id,
            email : user.email,
            role : user.role,
        }
        
        return res.status(200).cookie("jhaTutorialsToken" , token , {maxAge : 7 * 24 * 60 * 60 * 1000 , httpOnly:true , sameSite:process.env.NODE_ENV=="production" ? "none" : "lex" , secure:process.env.NODE_ENV=="production"}).json({
            user: user,
            success : true
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

export let checkuser = async(req , res) => {
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

        res.status(200).json({
            user : isUserExist,
            success : true
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

export let showallusers = async(req , res) => {
    try{
        let allUsers = await User.find({});
        res.status(200).json({
            success : true,
            allUsers
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

export let createuser = async(req , res) => {
    try{
        const {email , password , role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message : "User already exist with this email",
                success : false,
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await User.create({
            email , password : hashedPassword , role,
        })
        
        await newUser.save();

        return res.status(200).json({
            message : "User Created Successfully!",
            success : true,
            newUser
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal server error",
            success : false
        })
    }
}

export let deleteuser = async(req , res) => {
    try{
        let params = req.params;
        let id = params.id; // Delete hone wale user ki id.
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }

        const user = await User.findOne({_id : id});
        if(!user){
            return res.status(400).json({
                message : "User Not Found",
                success : false
            })
        }

        if(user.role == "superadmin"){
            let totalsuperadmin = await User.countDocuments({role : "superadmin"})
            if(totalsuperadmin == 1) {
                return res.status(400).json({
                    message : "There should be atleast one superadmin in the app",
                    success : false
                })
            }
        }

        await User.deleteOne({_id : id});

        res.status(200).json({
            success : true,
            message : "User deleted successfully!"
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal server error",
            success : false
        })
    }
}

export let updateuser = async(req , res) => {
    try{
        let params = req.params;
        let id = params.id; // update hone wale user ki id.
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }

        let {role} = req.body;

        await User.findByIdAndUpdate(id , {role : role});

        res.status(200).json({
            message : "User got updated",
            success : true
        })
    }
    catch(e){
        res.status(400).json({
            message : "Internal server error",
            success : false
        })
    }
}