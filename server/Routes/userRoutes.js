import express  from "express";
import { getAllUsers, getCurrentUser, getUser, updateCurrentUser, updateUser } from "../Controllers/userController.js";
import {verifyToken,verifyAdmin} from "../Middlewares/verifyToken.js"
const router=express.Router()

router.get('/',verifyToken,verifyAdmin,getAllUsers);

router.get('/profile',verifyToken,getCurrentUser);
router.post('/profile',verifyToken,updateCurrentUser);

router.get('/:id',verifyToken,verifyAdmin,getUser);
router.post('/:id',verifyToken,verifyAdmin,updateUser);

export default router 