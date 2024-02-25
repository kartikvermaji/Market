import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import USERS from "../Models/userModel.js";

//Register
export const Register = async (req, res) => {
    try {
      const {
        username,
        email,
        password
      } = req.body;
      if(!username || !email || !password){
        return res.status(400).json({message:"Please Fill all fields"});
      }

      const user=await USERS.findOne({email})
      if(user){
        return res.status(400).json({message:"User already exists"});
      }
      const salt=await bcrypt.genSalt();
      const hashedPassword= await bcrypt.hash(password,salt);
      const newUser=new USERS({
        username,
        email,
        password:hashedPassword, 
      })
      const savedUser=await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//Login User
export const Login=async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user=await USERS.findOne({username:username});
        if(!user){return res.status(404).json({message:"User Not Found"})}

        const match=await bcrypt.compare(password,user.password);
        if(!match){ return res.status(400).json({ msg: "Invalid credentials." })}

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET);
        delete user.password
        res.status(200).json({ token, user});
    }catch (err) {
    res.status(500).json({ errors: err.message });
  }
}
