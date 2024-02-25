import axios from "axios";
import React, { useEffect, useState } from "react";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ProductCarousal = () => {
    const [prod, setProducts] = useState([]);

    const getProducs = async () => {
      const response = await axios.get("http://localhost:3001/product/new");
      setProducts(response.data.products);
    };
  
   
      getProducs();
   
    const[i,setI]=useState(0)

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold text-slate-700 text-center m-4">Featured Products</h1>
      <div className="flex justify-center mt-16 space-x-10">
      <button onClick={()=>{
        if(i>0){
            setI(i-1)
        }
        else {
            setI(4)
        }
      }} ><FontAwesomeIcon icon={faChevronLeft} className="text-3xl hover:text-slate-700  shadow-slate-950  drop-shadow-3xl" /></button>
      
      {
        prod && prod[i] && (
        <div className="flex justify-center w-[60vw] space-x-10 bg-slate-100 p-10 rounded-2xl">
            <Link to={`/product/${prod[i]._id}`}><img src={prod[i].image} alt="" className="h-[21rem] w-[25rem] object-contain rounded-xl shadow-xl bg-white hover:shadow-slate-600" /></Link> 
            <div className="w-[20vw]">
                <p className="text-2xl font-semibold text-slate-700 m-2">{prod[i].name}</p>
                <p className="text-2xl font-semibold text-slate-700 m-2">${prod[i].price}</p>
                <p className="text-xl font-semibold text-slate-600 mt-6">Description</p>
                <p className="  text-slate-500 m-2">{prod[i].description}</p>
                <p className=" font-semibold text-slate-700 mt-6">{prod[i].brand}</p>
                <p className="text-slate-600">{prod[i].reviews.length} reviews</p>
                <p className="text-slate-600">{prod[i].rating} star rating</p>
            </div>

          </div>
          )
      }
        
      <button onClick={()=>{
        if(i<4){
            setI(i+1)
        }
        else {
            setI(0)
        }
      }}><FontAwesomeIcon icon={faChevronRight} className="text-3xl hover:text-slate-700  shadow-slate-950  drop-shadow-3xl" /></button>
      </div>

      
    </div>
  )
}

export default ProductCarousal
