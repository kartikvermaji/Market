import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const TopProducts = () => {
  const [prod, setProducts] = useState([]);

  const getProducs = async () => {
    const response = await axios.get("http://localhost:3001/product/top");
    setProducts(response.data.products);
  };
  useEffect(() => {
    getProducs();
  }, []);
  return (
    <div className="bg-slate-100 p-10">
      <h1 className="text-5xl font-semibold text-slate-700 text-center m-4 ">Our Top Products</h1>
      <div className="flex flex-row  mt-10 justify-around">
      {prod.map((product) => (
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}</div>
    </div>
  );
};

export default TopProducts;
