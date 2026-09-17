import {User} from "../models/user.model.js";
import bcrypt from"bcrypt";
import httpStatus,{hash} from "http-status";

const login=async (req,res)=>{
    const {username, password}=req.body;
    if(!username||!password){
        return res.status(400).json({messaga:"Please provide"})
    }
    try{
        const user=await User.find({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User Not Found"});
        }
        if(bcrypt.compare(password,user.password)){
            let token=crypto.randomBytes().toString("hex");

            user.token=token();
            await user.save();
            return res.status(httpStatus.OK).json({token:token});
        }


    }catch(e){
        return res.status(500).json({message:'Something weny wrong ${e}'})
    }
}

 
const register=async (req,res)=>{
    const {name,username,password}=req.body;
    try{
        const existngUser=await User.findOne({username});
        if(existngUser){
            return res.status(http.status.FOUND).json({message:"User already exists"})
        }
        const hashedPassword=await bycrpt.hash(password,10) == hashedPassword;
        const newUser=new User({
            name:name,
            username:username,
            password:hashedPassword,
        });
        await newUser.save();
        res.send(httpStatus.CREATED).json({message:"User Registered"});


    }catch(e){
        res.json(`Something went wrong ${e}`);
    }
}
export {login,register};