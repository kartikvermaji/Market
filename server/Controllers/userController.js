import USERS from "../Models/userModel.js";
import bcrypt from "bcrypt";
import router from "../Routes/authRoutes.js";

//all users
export const getAllUsers = async (req, res) => {
  try {
    const users=await USERS.find({})
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

//current user
export const getCurrentUser=async(req,res)=>{
  try {
      const id=req.body.id;
      const user=await USERS.findById(id)
      res.status(200).json({user,id});
    } catch (err) {
      res.status(500).json({ errors: err.message });
    }
}
export const updateCurrentUser=async(req,res)=>{
    try {
        const id=req.body.id
        const user=await USERS.findById(id);
        const salt=await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(req.body.password,salt);

        user.username=(req.body.username?req.body.username:user.username)
        user.email=(req.body.email?req.body.email:user.email)
        user.isAdmin=(req.body.isAdmin?req.body.isAdmin:user.isAdmin)
        user.password=(hashedPassword?hashedPassword:user.password)
        
        const updatedUser=await user.save();
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

//Particular user
export const getUser=async(req,res)=>{
  try {
      const {id}=req.params;
      const users=await USERS.findById(id)
      res.status(200).json({users});
    } catch (err) {
      res.status(500).json({ errors: err.message });
    }
}
export const updateUser=async(req,res)=>{
  try {
      const {id}=req.params
      const user=await USERS.findById(id);
    
      user.username=  (req.body.username?req.body.username:user.username)
      user.email=  (req.body.email?req.body.email:user.email)
      user.isAdmin=(Boolean(req.body.isAdmin)?Boolean(req.body.isAdmin):user.isAdmin)
      const updatedUser=await user.save();
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ errors: err.message });
    }
}
export const deleteUser=async(req,res)=>{
  try {
      const {id}=req.params;
      const user=await USERS.findById(id)
      if(user && user.isAdmin){
          return res.status(400).json({message:"Cannot delete Admin"})
      }
      await USERS.deleteOne({_id:user._id})
      res.json({message:"User account Deleted"});
    } catch (err) {
      res.status(500).json({ errors: err.message });
    }
}
  

