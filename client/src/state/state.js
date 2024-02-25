import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/updateCart.js";

const initialState = {
  user: null,
  token: null,

  favourites: [],

  categories: [],
  brands:[],
  products: [],
  checked: [],
  radio: [],
  brandCheckboxes: {},
  checkedBrands: [],

  totalAmount:0,
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "PayPal",
  orderItems:[],
};

export const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.totalAmount=0;
      state.cartItems = [
        {
          item: {},
          quantity: 0,
        },
      ];
      state.categories=[];
      state.radio=[];
      state.checked=[];
      state.products=[];
      state.shippingAddress=[];
      state.orderItems=[]
    },

    addToFavourites: (state, action) => {
      if (
        !state.favourites.some((product) => product._id === action.payload._id)
      ) {
        state.favourites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favourites = state.filter(
        (product) => product._id !== action.payload._id
      );
    },
    setFavorites: (state, action) => {
      state.favourites = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setReset:(state)=>{
      
      state.radio=[];
      state.checked=[];
      state.products=[];
    },

    addToCart: (state, action) => {
      const item = action.payload.item;
      const quantity = action.payload.qty;
      let dif=0;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item._id === item._id
      );
      if (existingItem) {
        dif=quantity-existingItem.quantity
        existingItem.quantity = quantity;
        state.totalAmount+=dif*(item.price);
      } else {
        state.cartItems.push({ item, quantity });
        state.totalAmount+=quantity*(item.price);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.item._id !== action.payload.item._id
      );
      state.totalAmount-=action.payload.item.price*action.payload.qty;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    saveOrderItems: (state, action) => {
      const existingItem = state.orderItems.find(
        (cartItem) => cartItem.product === action.payload.product
      );
      if (!existingItem) {
        state.orderItems.push(action.payload);
      }
     
    },
    clearOrderItems: (state) => {
      state.orderItems= [];
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
    },
    resetCart: (state) => (state.cartItems = []),
  },
});

export const {
  setLogin,
  setLogout,
  addToFavourites,
  removeFromFavorites,
  setFavorites,
  setCategories,
  saveOrderItems,
  clearOrderItems,
  setReset,
  setProducts,
  setChecked,
  setRadio,
  setSelectedBrand,
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = allSlice.actions;
export default allSlice.reducer;
