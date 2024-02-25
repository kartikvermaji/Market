import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { saveOrderItems, savePaymentMethod, saveShippingAddress } from "../state/state";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Shipping = () => {

  const shippingAddress = useSelector((state) => state.shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const cartItems = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const setorder=async()=>{

      cartItems.map((items)=>{
        if(items.item && items.item._id){
          const name=items.item.name
        const qty=items.quantity
        const image=items.item.image
        const price=items.item.price
        const product=items.item._id
        const prod={
          name,qty,image,price,product
        }
        dispatch(saveOrderItems(prod))
        }
        
      })

    
  }

  return (
    <div>
      <Navbar/>
      <div>
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col justify-center items-center text-center">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />

            <label>City:</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />

            <label>Postal Code:</label>
            <input
              type="text"
              placeholder="Enter PostalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <label>Country:</label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />

            <label>Payment Method</label>
            <label>
              <input
                type="radio"
                placeholder="Enter Address"
                required
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Paypal/Credit Card
            </label>

            <button type="submit" onClick={setorder}> Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
