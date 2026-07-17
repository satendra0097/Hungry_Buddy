"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";


export default function AddToCartComponent({ data, refresh, setRefresh }) {
  // alert(JSON.stringify(data))
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [hovered, setHovered] = useState(null);
  const [quantity, setQuantity] = useState(data.qty);
  
  const [weight, setWeight] = useState();
  // const [refresh, setRefresh] = useState(false);
  var dispatch = useDispatch()

  const handelAddClick = () => {
    var q = quantity
    q++
    data['qty'] = q
    setQuantity(q);
    dispatch({ type: "ADD_CART", payload: [data.fooditemid, data] })
    if (refresh) {
      setRefresh(false)
    } else {
      setRefresh(true)
    }
  };


  // ✅ FIXED: Simplified minus logic
  const handelMinusClick = () => {
    var q = quantity;
    q--;  // Decrease by 1
    
    if (q == 0) {
      // Remove from cart when quantity becomes 0
      dispatch({ type: "DELETE_CART", payload: [data.fooditemid, data] })
      data['qty'] = 0
      setQuantity(0);
    } else {
      // Update cart with new quantity
      data['qty'] = q
      setQuantity(q);
      dispatch({ type: "ADD_CART", payload: [data.fooditemid, data] })
    }
    setRefresh(!refresh)
  }


  useEffect(function () {
    // alert(JSON.stringify(data))

    setWeight(data?.offeprice > 0 ? data?.offeprice : data.fullprice)
  },
   [data?.fooditemid])
useEffect(function(){
setQuantity(data.qty)
},[data.qty])

  // const addQuantity = () => setQuantity(quantity + 1);
  // const subQuantity = () => {
  //   if (quantity > 0) setQuantity(quantity - 1);
  // };

  const weightOptions = [data?.offeprice > 0 ? data?.offeprice : data.fullprice, data?.halfprice];

  return (

    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div style={{ padding: matches ? "20px" : "0" }}>


        {/* WEIGHT & QUANTITY SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: matches ? "flex-start" : "center",
            justifyContent: matches ? "flex-start" : "space-between",
            width: "60%",
            maxWidth: matches ? "100%" : 400,
            marginTop: 0,
            // flexDirection: matches ? "row" : "row",
            flexDirection: 'row',
            gap: matches ? 105 : 0,
          }}
        >



          {/* WEIGHT SELECTION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: matches ? "flex-start" : "center",
              gap: matches ? 10 : 5,
              width: matches ? "100%" : "auto",
            }}
          >

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

              {weightOptions.map((w, i) => (
                <div key={i}>
                  {w > 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <div key={i}
                        onClick={() => setWeight(w)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "50%",
                          background: weight === w ? "rgb(13, 156, 67)" : "#fff",
                          width: matches ? 45 : 50,
                          height: matches ? 45 : 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: weight === w ? "#fff" : "#000",
                          fontWeight: 400,
                          fontSize: matches ? 13 : 14,
                          transition: "0.2s",
                          border: "1px solid gray",
                        }}
                      >
                        ₹{w}
                      </div></div> : <div></div>}
                </div>
              ))}
            </div>
          </div>



          {/* QUANTITY SELECTOR */}
          {quantity == 0 ?
            <div style={{ width: matches ? "100%" : "auto" }}>
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handelAddClick}
                style={{
                  display: "flex",
                  marginLeft: matches ? "0" : "40%",
                  marginTop: matches ? 0 : 20,
                  borderRadius: matches ? 10 : 25,
                  backgroundColor: "transparent",
                  border: "1px solid rgb(13, 156, 67)",
                  color: "rgb(13, 156, 67)",
                  width: matches ? "93%" : "245%",
                  height: matches ? 45 : 50,
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  fontSize: matches ? "14px" : "16px",
                  cursor: "pointer",
                  transition: "0.2s",
                  boxShadow: hovered ? "0 0 0 3px rgb(13, 156, 67)" : "none",
                }}
              >
                Add to Cart
              </button>
            </div> :
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: matches ? "flex-start" : "center",
                gap: matches ? 10 : 5,
                width: matches ? "100%" : "auto",
                marginLeft: matches ? 0 : 180,
                // background:'red',


              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  // marginLeft: matches ? 0 : -30,
                  // marginTop: matches ? 0 : -20,
                  fontSize: matches ? "16px" : "18px",
                  color: 'black'
                }}
              >
                Quantity
              </span>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
                
                {/* ✅ FIXED: Minus button - Now exactly like plus button */}
                <button
                  onClick={handelMinusClick}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    background: "rgba(26,26,26,0.1)",
                    width: matches ? 45 : 50,
                    height: matches ? 45 : 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    // ✅ NO opacity - exactly like plus button
                  }}
                >
                  <Image src="/images/minus.png" alt="minus" width={20} height={20} />
                </button>


                <span
                  style={{
                    fontWeight: 600,
                    fontSize: matches ? 16 : 18,
                    minWidth: 20,
                    textAlign: "center",
                    color: 'black'
                  }}
                >
                  {quantity}
                </span>

                {/* Plus button - Same style */}
                <button
                  onClick={handelAddClick}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    background: "rgba(26,26,26,0.1)",
                    width: matches ? 45 : 50,
                    height: matches ? 45 : 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                  }}
                >
                  <Image src="/images/plus.png" alt="plus" width={20} height={20} />
                </button>
              </div>
            </div>}

        </div>



        {/* BUTTONS SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: matches ? "column" : "row",
            // marginTop: matches ? 40 : 70,
            gap: matches ? 15 : 250,
            marginLeft: matches ? -35 : -80,
            width: "100%",
            marginTop: matches ? '15%' : '6%',



          }}
        >
        </div>


        {/* BUY NOW BUTTON */}
        <div style={{ display: 'flex', width: "100%", justifyContent: 'center', height: 200 }}>
          <button
            style={{
              display: "flex",

              borderRadius: matches ? 10 : 25,
              backgroundColor: "rgb(13, 156, 67)",
              color: "#fff",
              width: '50%',
              height: matches ? 45 : 50,
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: matches ? "14px" : "16px",
              cursor: "pointer",
              border: "none",

            }}
          >
            Buy it Now
          </button>
          <Divider
            style={{
              display: "flex",
              marginTop: matches ? '40%' : '27%',
              color: "#cebdd8ff",
              width: matches ? '93%' : "30%",

              border: "none",
              borderTop: "1px solid #cebdd8ff",
              position: 'absolute',
              marginLeft: matches ? -35 : '-1%'
            }}
          />
        </div>
      </div>





    </div>
  );
}