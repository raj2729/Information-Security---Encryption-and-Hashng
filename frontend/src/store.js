// To manage global state
import { createStore, combineReducers, applyMiddleware } from "redux";
// To send data from 1 component to another component
import thunk from "redux-thunk";
// To get an option of viewing redu from browseer
import { composeWithDevTools } from "redux-devtools-extension";

// Importing reducers
// import {
//   productListReducer,
//   productDetailsReducer,
// } from "./reducers/productReducer";

import {
  isUserEnrolledReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
// import { adminLoginReducer, adminViewOrders } from "./reducers/adminReducer";

// USING REDUX
/*
1. create constants
2. create reducer fxn
3. import reducer fxn in store
4. create actions
*/

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const adminInfoFromStorage = localStorage.getItem("adminInfo")
//   ? JSON.parse(localStorage.getItem("adminInfo"))
//   : null;

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : [];

// get all reducers in a single variable using combineReducers
const reducer = combineReducers({
  // Anytime if u want to access productList it can be accessed using this
  //  It is present inside state and is used using useSelector
  //   productList: productListReducer,

  //   cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  isEnrolledInCourse: isUserEnrolledReducer,
});

// Initial State
const initialState = {
  //   cart: {
  //     // cartItems: "Raj",
  //     cartItems: cartItemsFromStorage,
  //     shippingAddress: shippingAddressFromStorage,
  //   },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  //   adminLogin: {
  //     adminInfo: adminInfoFromStorage,
  //   },
};

// communicates between react and redux
const middleware = [thunk];

// creating store object
const store = createStore(
  reducer,
  initialState,
  //   Removed square brackets
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
