"use client"
import RootReducer from "./RootReducer"
import { Provider } from "react-redux"
import { createStore } from "redux"
var store = createStore(RootReducer)
export default function ReduxProvider({ children }) {
    return (<Provider store={store}>
        {children}
    </Provider>)
}