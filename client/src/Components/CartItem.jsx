import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../state/state";

const CartItem = ({ product }) => {
  const [qty, setQty] = useState(product.quantity);
  const obj = product.item;
  const dispatch = useDispatch();
  return (
    <div>
      {obj._id ? (
        <div>
          <Link to={`/product/${product.item._id}`}>
            <img
              src={obj.image}
              alt={product.item.name}
              className="h-16 w-16"
            />
            <p>{product.item.name}</p>
            <p>${product.item.price}</p>
            <p>Quantity:{product.quantity}</p>
          </Link>

          <button
            onClick={async () => {
              if (qty >= 1) {
                setQty(qty - 1);

                dispatch(addToCart({ item: obj, qty }));
              }
            }}
          >
            -
          </button>

          <button
            onClick={async () => {
              setQty(qty + 1);
              dispatch(addToCart({ item: obj, qty }));
            }}
          >
            +
          </button>

          <div>
            <button
              onClick={() => {
                dispatch(removeFromCart({ item: obj, qty }));
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartItem;
