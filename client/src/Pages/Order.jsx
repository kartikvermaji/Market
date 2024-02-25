import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const Order = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const getOrders = async () => {
    const res = await axios.get(`http://localhost:3001/order/${id}`);
    setOrder(res.data);
  };
  useEffect(()=>{
    getOrders();
  },[])
  
 
  return (
    <div>
      <Navbar />
      <h1>Order</h1>
      <table>
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total Price</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((prod) => (
            <tr> 
              <td> <Link to={`/product/${prod.product}`}><img src={prod.image} alt="" className="h-20 w-20" />{" "}</Link> </td>
              <td>{prod.name} </td>
              <td>${prod.price} </td>
              <td> {prod.qty}</td>
              <td>${prod.qty * prod.price *0.18 +prod.price}</td>
              <td>{order.createdAt.substring(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {order && order.shippingAddress?(<div>
        <h1>Shipping Address</h1>
        <p>House Address:{order.shippingAddress.address}</p>
        <p>Postal Code:{order.shippingAddress.postalCode}</p>
        <p>City:{order.shippingAddress.city}</p>
        <p>Country:{order.shippingAddress.country}</p>
      </div>):(<></>)}

      {order?(<div>
        <h1>Order Summary</h1>
        <p>Items Price: ${order.itemsPrice}</p>
        <p>Shipping Price: ${order.shippingPrice}</p>
        <p>Tax: ${order.taxPrice}</p>
        <p>Total Price: ${order.totalPrice}</p>
      </div>):(<></>)}


      
    </div>
  );
};

export default Order;
