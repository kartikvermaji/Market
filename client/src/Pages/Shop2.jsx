import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import ProductCard from "../Components/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCategories, setProducts } from "../state/state.js";

const Shop = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsByCategories, setProductsByCategories] = useState(products);
  const [productsByFilter, setProductsByFilter] = useState(products);

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3001/category/categories");
    dispatch(setCategories(res.data));
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/allProducts");
      setFilteredProducts(res.data.products);
      dispatch(setProducts(filteredProducts));
      // setProductsByCategories(filteredProducts)
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error; // Propagate the error to the caller
    }
  };

  const handleCheck = (id) => {
    setProductsByCategories(
      filteredProducts?.filter((product) => product.category === id)
    );
    setProductsByFilter(
      filteredProducts?.filter((product) => product.category === id)
    );
  };
  const handleBrandClick = (brand) => {
    const productsByBrand = productsByCategories?.filter(
      (product) => product.brand === brand
    );
    setProductsByFilter(productsByBrand);
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        productsByCategories
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  getCategories();
  getAllProducts();

  return (
    <div>
      <Navbar />
      <div>
        <button onClick={async()=>{
          getAllProducts()
            setProductsByCategories(products);
            setProductsByFilter(products);

        }}>Show All Prodcuts</button>
        <div>
          <h1>Filter By Categories</h1>
          {categories?.map((c) => (
            <div key={c._id}>
              <input
                type="radio"
                id={c._id}
                name="Category"
                onChange={(e) => handleCheck(c._id)}
              />
              <label htmlFor="">{c.name}</label>
            </div>
          ))}
        </div>

        <div>
          <h1>Filter by Brands</h1>
          {uniqueBrands?.map((brand) => (
            <div key={brand}>
              <input
                type="radio"
                id={brand}
                name="brand"
                onChange={() => handleBrandClick(brand)}
              />
              <label htmlFor="">{brand}</label>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setProductsByCategories(products);
            setProductsByFilter(products);
          }}
        >
          Reset
        </button>

        <div className="flex justify-around flex-nowrap">
          {productsByFilter?.map((prod) => (
            <div key={prod._id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
