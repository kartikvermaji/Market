import React from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { setLogout } from "../state/state";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const handlelogout = async () => {
    dispatch(setLogout({}));
    nav("/");

    // enqueueSnackbar("User Logged out Successfully",{variant:"success"})
  };
  return (
    <div className="flex text-center justify-around fixed flex-row w-full text-lg p-2 bg-white">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold">Market</h1>
      </div>

      <div className="md:flex flex-row space-x-20 hidden ">
      <Link to="/home" className="">Home</Link>
      <Link to="/home">Favourites</Link>
      <Link to="/cart">{cartItems.length} Cart</Link>
      <Link to="/shop">Shop</Link>
      </div>

      <div>
        {user ? (
          <div className="flex space-x-1 md:space-x-3 text-left">
            <div>
            <Link to="/profile">
            <img
              src={
                "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
              }
              alt="User-pic"
              className="md:h-14 md:w-14 h-12 w-12 rounded-3xl object-contain"
            /></Link>
            </div>
            <div>
            <p className=" hidden md:block md:text-xl text-md font-lightbold">{user.username}</p>
            <button onClick={handlelogout} className="  hidden md:block text-sm md:text-lg font-semibold pt-[-2px]">Logout</button>
            </div>
            
           
          </div>
        ) : (
          <div>
            <p>
              <Link to="/" className="text-xl font-semibold">Login/Register</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
