"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
 
export default function AddToCartComponent({ data, refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  const [hovered, setHovered] = useState(null);
  const [quantity, setQuantity] = useState(data.qty);
  const [weight, setWeight] = useState();
  const dispatch = useDispatch();
 
  const handelAddClick = () => {
    const q = quantity + 1;
    setQuantity(q);
    dispatch({ type: "ADD_CART", payload: [data.fooditemid, { ...data, qty: q }] });
    setRefresh(!refresh);
  };
 
  const handelMinusClick = () => {
    const q = quantity - 1;
    if (q <= 0) {
      dispatch({ type: "DELETE_CART", payload: [data.fooditemid, { ...data, qty: 0 }] });
      setQuantity(0);
    } else {
      setQuantity(q);
      dispatch({ type: "ADD_CART", payload: [data.fooditemid, { ...data, qty: q }] });
    }
    setRefresh(!refresh);
  };
 
  useEffect(() => {
    const w = data?.offeprice > 0 ? data?.offeprice : data.fullprice;
    queueMicrotask(() => setWeight(w));
  }, [data?.fooditemid]);
 
  useEffect(() => {
    const q = data.qty;
    queueMicrotask(() => setQuantity(q));
  }, [data.qty]);
 
  const weightOptions = [data?.offeprice > 0 ? data?.offeprice : data.fullprice, data?.halfprice];
 
  return (
    // ✅ FIX: removed marginLeft:-80, gap:105, width:'245%' — these only "worked"
    // by accident at one exact zoom level and broke everything else.
    <div style={{ width: "100%", padding: matches ? "20px" : "0", boxSizing: "border-box" }}>
 
      {/* WEIGHT & QUANTITY SECTION */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          width: "100%",
        }}
      >
        {/* WEIGHT SELECTION */}
        <div style={{ display: "flex", gap: 10 }}>
          {weightOptions.map((w, i) =>
            w > 0 ? (
              <div
                key={i}
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
                  flexShrink: 0,
                }}
              >
                ₹{w}
              </div>
            ) : null
          )}
        </div>
 
        {/* QUANTITY SELECTOR */}
        {quantity == 0 ? (
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handelAddClick}
            style={{
              borderRadius: matches ? 10 : 25,
              backgroundColor: "transparent",
              border: "1px solid rgb(13, 156, 67)",
              color: "rgb(13, 156, 67)",
              width: matches ? "100%" : "220px",
              height: matches ? 45 : 50,
              fontWeight: 500,
              fontSize: matches ? "14px" : "16px",
              cursor: "pointer",
              transition: "0.2s",
              boxShadow: hovered ? "0 0 0 3px rgb(13, 156, 67)" : "none",
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontWeight: 500, fontSize: matches ? "16px" : "18px", color: 'black' }}>
              Quantity
            </span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
                }}
              >
                <Image src="/images/minus.png" alt="minus" width={20} height={20} />
              </button>
 
              <span style={{ fontWeight: 600, fontSize: matches ? 16 : 18, minWidth: 20, textAlign: "center", color: 'black' }}>
                {quantity}
              </span>
 
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
          </div>
        )}
      </div>
 
      {/* BUY NOW BUTTON */}
      <div style={{ display: 'flex', width: "100%", marginTop: 30 }}>
        <button
          style={{
            borderRadius: matches ? 10 : 25,
            backgroundColor: "rgb(13, 156, 67)",
            color: "#fff",
            width: matches ? '100%' : '260px',
            height: matches ? 45 : 50,
            fontWeight: 500,
            fontSize: matches ? "14px" : "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Buy it Now
        </button>
      </div>
 
      {/* ✅ FIX: plain in-flow divider instead of position:absolute + magic marginTop % */}
      <div style={{ marginTop: 25, borderTop: "1px solid #cebdd8ff", width: "100%" }} />
    </div>
  );
}