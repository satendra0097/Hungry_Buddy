"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./QuantityCounter.module.css";
import { useDispatch } from "react-redux"; 
import { useEffect,useState } from "react";
export default function QuantityCounter({
  data,
  refresh,
  setRefresh
 
}) {
 const [quantity, setQuantity] = useState(data.qty);
useEffect(function(){
  setQuantity(data?.qty)
},[])
 var dispatch=useDispatch() 

  const handleAddClick = () => {
   
    var q = quantity;
    q++;
     data['qty']=q
    setQuantity(q);
    dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})
    setRefresh(!refresh)
  };

  const handleMinusClick = () => {
   var q = quantity;
    
    if(q==1)
   {
    dispatch({type:"DELETE_CART",payload:[data.fooditemid,data]})
    setQuantity(q);
     }
    else
      {
        q--
        data['qty']=q
        setQuantity(q)
        dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})
      } 
   
    setRefresh(!refresh)
  };


  return (
    <div className={styles.counterSection}>
      <div className={styles.counterBtn} onClick={handleMinusClick}>
        <RemoveIcon style={{ fontSize: 16 }} />
      </div>
      <span className={styles.counterValue}>{quantity}</span>
      <div className={styles.counterBtn} onClick={handleAddClick}>
        <AddIcon style={{ fontSize: 16 }} />
      </div>
    </div>
  );
}
