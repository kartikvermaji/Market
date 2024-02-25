import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SpecialProducts = ()=>{ 
  const [prod, setProducts] = useState([]);

  const getProducs = async () => {
    const response = await axios.get("http://localhost:3001/product/new");
    setProducts(response.data.products);
  };
  useEffect(() => {
    getProducs();
  }, []);
  return (
    <div  className="bg-slate-800 pt-10">
      <h1  className="text-5xl font-semibold text-slate-50 text-center m-4 ">Newly Added </h1>
      <div className="flex flex-row  mt-10 justify-around">
      {prod.map((product) => (
        <div key={product._id} >
          <ProductCard product={product} />
        </div>
      ))}
      </div>
    </div>
  );
}

export default SpecialProducts
