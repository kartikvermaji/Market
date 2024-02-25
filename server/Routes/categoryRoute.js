import express  from "express";
import { createCategory, listCategory, readCategory, removeCategory, updateCategory } from "../Controllers/categoryController.js";
import {verifyToken,verifyAdmin} from "../Middlewares/verifyToken.js"

const router=express.Router();

router.post("/",verifyToken,verifyAdmin,createCategory)

router.put("/:categoryId",verifyToken,verifyAdmin,updateCategory)
router.delete("/:categoryId",verifyToken,verifyAdmin,removeCategory)

router.get("/categories",listCategory)
router.get("/:id",verifyToken,readCategory)


export default router