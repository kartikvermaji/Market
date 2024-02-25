import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProductInfo from "./Pages/ProductInfo";
import Cart from "./Pages/Cart";
import Shop2 from "./Pages/Shop2";
import Shipping from "./Pages/Shipping";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Pages/Profile";
import Order from "./Pages/Order";


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shop" element={<Shop2/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/order/:id" element={<Order/>}/> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}