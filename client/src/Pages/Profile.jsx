import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState([]);

  const getuserOrder = async () => {
    const res = await axios.get(`http://localhost:3001/order/mine/${user._id}`);
    setOrder(res.data);
  };
  useEffect(()=>{
    getuserOrder()
  },[])
  
 

  return (
    <div>
      <Navbar />
      Profile
      <div>
        <h1>Your Profile</h1>
        <img
          src={
            "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
          }
          alt="User-pic"
          className="md:h-14 md:w-14 h-10 w-10 rounded-3xl object-contain"
        />
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.name}</p>
      </div>
      <div>
        <h1>Your Orders</h1>
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Id</td>
              <td>Date</td>
              <td>Total</td>
              <td>View More </td>
            </tr>
          </thead>

          <tbody>
            {order?.map((prod) => (
              <tr key={prod._id}>
                <td>
                  <img
                    src={prod.orderItems[0].image}
                    alt=""
                    className="h-20 w-20 object-contain"
                  />
                </td>
                <td>{prod._id}</td>
                <td>{prod.createdAt.substring(0, 10)}</td>
                <td>${prod.totalPrice}</td>
                <td>
                  <Link to={`/order/${prod._id}`}>View More</Link>
                </td>
                {/* <td onClick={navigate(`order/prod._id`)} >View Order</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
