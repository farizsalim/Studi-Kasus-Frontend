import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import authReducer from "./features/Auth/reducer";
import cartReducer from "./features/Cart/reducer";
import productReducer from "./features/Product/reducer";
import { thunk } from "redux-thunk";

let rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
});

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
let store = createStore(rootReducer,composeEnchancers(applyMiddleware(thunk)));

export default store;