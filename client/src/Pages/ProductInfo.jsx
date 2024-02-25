import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import state, { addToCart, setProducts } from "../state/state";
import Navbar from "../Components/Navbar";
import {
  faArrowLeft,
  faMinus,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../Components/ProductCard";

const ProductInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rate, setrate] = useState(5);

  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/allProducts");
      dispatch(setProducts(res.data.products));
      // setProductsByCategories(filteredProducts)
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error; // Propagate the error to the caller
    }
  };
  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3001/product/${id}`);
    setItem(response.data.product);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/product/${id}/reviews`,
        {
          rating: rate,
          comment: comment,
          user: user,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getProduct();
    getAllProducts();
  }, []);

  const relProd = products?.filter(
    (product) => product.category === item.category
  );
  console.log(rate);

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        {item && (
          <div>
            <Link
              to="/home"
              className="fixed text-2xl text-white bg-slate-800 px-5 py-3 hover:text-slate-900 ml-10 hover:bg-slate-100 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className="flex  justif-center px-20 ">
              <img
                src={item.image}
                alt=""
                className="h-[90vh] w-[40vw] rounded-2xl shadow-xl object-contain"
              />
              <div className="w-[55vw] p-10 rounded-2xl h-[90vh] bg-slate-100">
                <p className="mt-10 text-4xl font-extrabold text-slate-700 ">
                  {item.name}
                </p>
                <p className="mt-5 text-2xl text-slate-800">${item.price}</p>
                <p className="mt-5 text-xl text-slate-700">Description:</p>
                <p>{item.description}</p>

                <p className="text-xl mt-5 font-semibold">{item.brand}</p>

                <p className="text-lg mt-5">
                  Added: {item.createdAt && item.createdAt.substring(0, 10)}
                </p>
                <p className="text-lg mt-2">Reviews: {item.numReviews}</p>
                <p className="text-lg mt-2">Ratings: {item.rating.toFixed(1)} stars</p>

                <div className="flex flex-col text-xl items-center justify-center mt-12">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        if (qty >= 2) {
                          setQty(qty - 1);
                        }
                      }}
                      className=" bg-slate-700 space-x-2 px-3 py-2 rounded-full text-center hover:text-slate-900 hover:bg-slate-200  text-xl text-white"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p className="text-2xl">{qty}</p>
                    <button
                      onClick={() => {
                        setQty(qty + 1);
                      }}
                      className=" bg-slate-700 space-x-2 px-3 py-2 rounded-full text-center hover:text-slate-900 hover:bg-slate-200  text-xl text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <button
                    onClick={async () => {
                      dispatch(addToCart({ item, qty }));
                    }}
                    className="text-xl text-white bg-slate-800 px-4 py-2 mt-4 rounded-xl hover:bg-slate-200 hover:text-slate-700"
                  >
                    <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="bg-slate-800 pb-16">
          <h1 className="text-3xl font-semibold text-slate-100 text-center py-8 m-4">
            Related Products
          </h1>
          <div className="flex justify-center space-x-16 p-10">
            {relProd &&
              relProd.map((prod) => (
                <div>
                  <ProductCard product={prod} />
                </div>
              ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-700 text-center  py-8 ">
            Write A Review
          </h1>
          <form
            action=""
            className="flex flex-row justify-center space-x-16"
            onSubmit={submitHandler}
          >
            <div>
              <p className="text-2xl font-semibold text-slate-900 text-center  py-4 ">
                Rating
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="1star"
                    value={1}
                    name="rating"
                    onChange={() => {
                      setrate(1);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-lightbold text-slate-900 text-center  "
                  >
                    Inferior
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="2star"
                    value={2}
                    name="rating"
                    onChange={() => {
                      setrate(2);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-lightbold text-slate-900 text-center "
                  >
                    Decent
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="3star"
                    value={3}
                    name="rating"
                    onChange={() => {
                      setrate(3);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-lightbold text-slate-900 text-center  "
                  >
                    Great
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="4star"
                    value={4}
                    name="rating"
                    onChange={() => {
                      setrate(4);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-lightbold text-slate-900 text-center  "
                  >
                    Excellent
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="5star"
                    value={5}
                    name="rating"
                    onChange={() => {
                      setrate(5);
                    }}
                    className=""
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-lightbold text-slate-900 text-center "
                  >
                    Exceptional
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-slate-900 text-center  py-4 ">
                Review
              </p>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="3"
                placeholder="Your Reviews"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-slate-100 shadow-xl hover:bg-slate-300 hover:shadow-slate-500 h-32 w-96 rounded-2xl text-center text-2xl items-center"
              ></textarea>
              <button
                type="submit"
                className="bg-slate-900 text-white text-lg px-6  py-1 md:py-2 rounded-lg hover:bg-white border-2 hover:text-slate-700 font-semibold md:text-1xl border-slate-900 m-4 mx-32 shadow-xl hover:shadow-slate-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 text-center justify-center flex flex-col  py-4 mt-16">
          Product Reviews
        </h1>

        <div className="flex justify-center space-x-6 p-16 flex-wrap items-center  ">
          {item &&
            item.reviews &&
            item.reviews.map((prod) => (
              <div className="flex flex-col justify-center w-[20vw] h-[20vh] m-6 bg-slate-200 p-6 rounded-xl ">
                <div className="flex space-x-4">
                <img
                  src={
                    "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
                  }
                  alt="User-pic"
                  className="md:h-16 md:w-16 h-12 w-12 rounded-3xl object-contain"
                />
                <div className="flex flex-col">
                <p className="text-lg font-semibold text-slate-700">{prod.name}</p>
                <p className="text-md font-semibold text-slate-600">{prod.rating} Stars</p>
                </div>
                </div>
                <p className="ml-20">{prod.comment}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
