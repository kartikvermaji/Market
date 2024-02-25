import express from "express"

import {verifyToken,verifyAdmin} from "../Middlewares/verifyToken.js"
import { calcualteTotalSalesByDate, calculateTotalSales, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid } from "../Controllers/orderController.js";
const router = express.Router();

router.get("/",verifyToken,verifyAdmin ,getAllOrders)
router.post('/',createOrder)

router.get("/mine/:id",getUserOrders);
router.get("/totalOrders",countTotalOrders);
router.get("/totalSales",calculateTotalSales);
router.get("/totalSalesByDate",calcualteTotalSalesByDate);


router.get("/:id",findOrderById)
router.put("/:id/pay",verifyToken,markOrderAsPaid)
router.put("/:id/deliver",verifyToken,markOrderAsDelivered)


export default router
