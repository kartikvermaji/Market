import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className=" bg-white pb-2  rounded-3xl hover:shadow-slate-600 shadow-xl  ">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className="h-[12rem] w-[12rem] object-cover  rounded-t-2xl shadow-lg hover:shadow-slate-300" />
          <div className="flex justify-around">
          <p className="text-xl mt-2 text-slate-600 font-semibold">{product.name}</p>
          <p className="text-xl m-2 text-slate-800">${product.price}</p>
          </div>
         
         {/* <div className="flex justify-around">
         <p className="text-lg ">{product.brand}</p>
          <p className="text-lg">{product.rating} stars</p>
         </div> */}
          
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
