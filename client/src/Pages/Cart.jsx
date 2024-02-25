import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmount=useSelector((state)=>state.totalAmount)
  const navigate=useNavigate()


  return (
    <div>
      <Navbar />
      CartItems
      {cartItems.length === -1 ? (
        <p>Your Cart Is Empty</p>
      ) : (
        <div>
          {cartItems.map((items) => (
            <div key={items.item._id}>
              <CartItem product={items} />
            </div>
          ))}

          <div>
            <p>
              {totalAmount}
            </p>
          </div>
          <button onClick={()=>{
             navigate("/shipping");
          }}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
