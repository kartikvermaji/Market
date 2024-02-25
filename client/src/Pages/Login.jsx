import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state/state";
import axios from "axios";
import Navbar from "../Components/Navbar";
import LoginImage from "../assets/loginimage.jpg";
import RegisterImage from '../assets/registerimage.png'

const Login = () => {
  const [account, setaccount] = useState(true);
  const handleclick = async () => {
    setaccount(!account);
  };
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        {account ? (
          <div className="flex flex-col">
            <SiginIn handleclick={handleclick}/>
            
          </div>
        ) : (
          <div>
            <SignUp  handleclick={handleclick}/>
            
          </div>
        )}
      </div>
    </div>
  );
};

const SignUp = ({handleclick}) => {
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormDate((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      // enqueueSnackbar("Logged in Successfully!",{variant:"success"})
    } catch (err) {
      // enqueueSnackbar("Incorrect Credentials",{variant:"error"})
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around">
        <div>
        <img src={RegisterImage} alt="" className="w-[55vw] hidden md:block h-[90vh] object-cover shadow-2xl shadow-slate-400 rounded-xl" />
        </div>
      <div className=" md:mt-6">
      <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-700 p-3 md:p-6">Market</h1>
        <h1 className="text-2xl md:p-3 text-slate-700 font-semibold text-center md:mt-4">Register</h1>
      <form action="" onSubmit={handleSubmit}  className=" flex flex-col w-[95vw] space-y-5 md:w-[30vw] p-3">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-slate-100 text-center text-xl px-10 py-2 rounded-xl hover:bg-slate-200 p-3"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-100 text-center text-xl px-10 py-2 rounded-xl hover:bg-slate-200 p-3"
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-slate-100 text-center text-xl px-10 py-2 rounded-xl hover:bg-slate-200 p-3"
        />
        <button type="submit"  className="bg-slate-900 text-lg md:text-2xl text-white mt-8 py-1 md:py-2 rounded-2xl hover:bg-slate-700">Register</button>
      </form>
      <p onClick={handleclick} className="sm:text-lg pl-2">Already have an account?<span className="text-slate-800 font-semibold hover:text-slate-600"> Login here</span></p>
        </div>
        
        <div>
        <img src={RegisterImage} alt="" className="w-[95vw] pl-3  md:hidden md:pl-0 md:w-[55vw] h-[90vh] object-cover shadow-2xl shadow-slate-400 rounded-xl" />
        </div>
    </div>
  );
};



const SiginIn = ({handleclick}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormDate((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/home");
      // enqueueSnackbar("Logged in Successfully!",{variant:"success"})
    } catch (err) {
      // enqueueSnackbar("Incorrect Credentials",{variant:"error"})
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div className=" md:mt-6">
        <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-700 p-3 md:p-6">Market</h1>
        <h1 className="text-2xl md:p-3 text-slate-700 font-semibold text-center md:mt-4">Login</h1>
        <form action="" onSubmit={handleSubmit} className=" flex flex-col w-[95vw] md:w-[30vw] p-3">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-slate-100 text-center text-xl px-10 py-2 rounded-xl hover:bg-slate-200 p-3"
          />
          <input
            type="text"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-slate-100 text-center text-xl px-10 py-2 rounded-xl hover:bg-slate-200 p-3 mt-5"
          />
          <button type="submit" className="bg-slate-900 text-lg md:text-2xl text-white mt-8 py-1 md:py-2 rounded-2xl hover:bg-slate-700">Login</button>
        </form>
        <p onClick={handleclick} className="sm:text-lg pl-2">Don't have any account?<span className="text-slate-800 font-semibold hover:text-slate-600"> Regsiter Here</span></p>
      </div>
      <div>
        <img src={LoginImage} alt="" className="w-[95vw] pl-3 md:pl-0 md:w-[55vw] h-[90vh] object-cover shadow-2xl shadow-slate-400 rounded-xl" />
      </div>
    </div>
  );
};

export default Login;
