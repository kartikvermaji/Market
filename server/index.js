//importing
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"

//configurations
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//importing ROUTES/MODELS/MIDDLEWARES/CONTROLLERS
import authRoute from "./Routes/authRoutes.js"
import userRoute from "./Routes/userRoutes.js"
import productRoute from "./Routes/productRoute.js"
import categoryRoute from "./Routes/categoryRoute.js"
import orderRoute from "./Routes/orderRoute.js"

//Setting Up Routes
app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/category",categoryRoute);
app.use("/order",orderRoute);
  
//MONGOOOSE
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    const Port = process.env.PORT;
    app.listen(Port, function (err) {
      if (err) {
        console.log("error on connecting to port: ", err);
      }
      console.log("Server Is Hitting at : ",Port);
    });
  })
  .catch((err) => {
    console.log("error on connecting to mongoose :", err);
  });