import express from "express"
import { addProduct, addProductReview, fetchAllProducts, fetchFilterProducts, fetchNewProducts, fetchProductById, fetchProducts, fetchTopProducts, removeProduct, updateProduct } from "../Controllers/productController.js";
import {verifyToken,verifyAdmin} from "../Middlewares/verifyToken.js"
const router = express.Router();

router.get("/",verifyToken,verifyAdmin ,fetchProducts)
router.post('/',verifyToken,verifyAdmin,addProduct)

router.get("/allProducts",fetchAllProducts);
router.post("/filterss",fetchFilterProducts)

router.post("/:id/reviews",addProductReview);

router.get("/top",fetchTopProducts);
router.get("/new",fetchNewProducts);

router.get("/:id",fetchProductById)
router.put("/:id",verifyToken,verifyAdmin ,updateProduct)
router.delete("/:id",verifyToken,verifyAdmin ,removeProduct)



export default router
