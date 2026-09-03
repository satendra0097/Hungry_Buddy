"use client"
import RootReducer from "./RootReducer"
import { Provider } from "react-redux"
import { legacy_createStore as createStore, compose } from "redux"
import { useState, useEffect } from "react"

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function ReduxProvider({ children }) {
  const [store] = useState(() => createStore(RootReducer, undefined, composeEnhancers()));

  useEffect(() => {
    try {
      const cart = localStorage.getItem("CART");
      const user = localStorage.getItem("USER");
      if (cart) {
        const parsed = JSON.parse(cart);
        Object.keys(parsed).forEach((key) => {
          store.dispatch({ type: "ADD_CART", payload: [key, parsed[key]] });
        });
      }
      if (user) {
        const parsed = JSON.parse(user);
        Object.keys(parsed).forEach((key) => {
          store.dispatch({ type: "ADD_USER", payload: [key, parsed[key]] });
        });
      }
    } catch {}
  }, [store]);

  return <Provider store={store}>{children}</Provider>
}
