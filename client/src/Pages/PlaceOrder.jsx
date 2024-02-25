import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import axios from "axios";
import state, { clearCartItems, clearOrderItems, saveOrderItems } from "../state/state";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const[Confirm,setconfirm]=useState(false)

  const orderItems = useSelector((state) => state.orderItems);
  const cartItems = useSelector((state) => state.cartItems);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const totalAmount = useSelector((state) => state.totalAmount);
  const shippingAddress = useSelector((state) => state.shippingAddress);

  const placeOrderHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3001/order", {
        userId: user._id,
        orderItems: orderItems,
        paymentMethod: "paypal",
        itemsPrice: totalAmount,
        shippingPrice: 0,
        taxPrice: totalAmount * 0.18,
        totalPrice: totalAmount * 0.18 + totalAmount,
        shippingAddress: shippingAddress,
      });

      dispatch(clearCartItems());
      dispatch(clearOrderItems());

      // navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {cartItems.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <td>Image</td>
                <td>Product</td>
                <td> Quantity</td>
                <td> Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((prod) => (
                <>
                  {prod.item._id ? (
                    <tr key={prod.item._id}>
                      <td>
                        <img
                          src={prod.item.image}
                          alt=""
                          className="h-12 w-12"
                        />
                      </td>
                      <td>{prod.item.name}</td>
                      <td>{prod.quantity}</td>
                      <td>{prod.item.price}</td>
                      <td>{prod.item.price * prod.quantity}</td>
                    </tr>
                  ) : (
                    <div></div>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h1>Order Summary</h1>

        <div>
          <h1>Amount</h1>
          <p>Items:${totalAmount}</p>
          <p>Shipping:$0</p>
          <p>Tax:${totalAmount * 0.18}</p>
          <p>Total Price:${totalAmount + totalAmount * 0.18}</p>
        </div>

        <div>
          <h1>Shipping Address </h1>
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.city}</p>
          <p>{shippingAddress.postalCode}</p>
          <p>{shippingAddress.country}</p>
        </div>

        <div>
          <h1>Payment Method</h1>
          <p>Paypal / Credit Card</p>
        </div>

        <button
          onClick={() => {
            placeOrderHandler();
            setconfirm(!confirm)
          }}
        >
          Confirm Order
        </button>
      </div>

      {confirm?(<></>):(<></>)
      }
    </div>
  );
};

export default PlaceOrder;
