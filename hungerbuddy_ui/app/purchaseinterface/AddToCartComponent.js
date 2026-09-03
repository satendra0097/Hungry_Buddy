"use client";
import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
 
const AddToCartComponent = memo(function AddToCartComponent({ data, refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  const [hovered, setHovered] = useState(false);
  const [quantity, setQuantity] = useState(data?.qty || 0);
  const [weight, setWeight] = useState();
  const dispatch = useDispatch();
 
  const offerPrice = Number(data?.offerprice) || 0;
  const fullPrice = Number(data?.fullprice) || 0;
  const halfPrice = Number(data?.halfprice) || 0;
  const effectivePrice = offerPrice > 0 ? offerPrice : fullPrice;
 
  const handelAddClick = useCallback(() => {
    const q = quantity + 1;
    setQuantity(q);
    dispatch({ type: "ADD_CART", payload: [data.fooditemid, { ...data, qty: q }] });
    setRefresh(r => !r);
  }, [quantity, data, dispatch, setRefresh]);
 
  const handelMinusClick = useCallback(() => {
    const q = quantity - 1;
    if (q <= 0) {
      setQuantity(0);
      dispatch({ type: "DELETE_CART", payload: [data.fooditemid, { ...data, qty: 0 }] });
    } else {
      setQuantity(q);
      dispatch({ type: "ADD_CART", payload: [data.fooditemid, { ...data, qty: q }] });
    }
    setRefresh(r => !r);
  }, [quantity, data, dispatch, setRefresh]);
 
  useEffect(() => {
    queueMicrotask(() => setWeight(effectivePrice));
  }, [data?.fooditemid, effectivePrice]);
 
  useEffect(() => {
    queueMicrotask(() => setQuantity(data?.qty || 0));
  }, [data?.qty]);
 
  const weightOptions = [effectivePrice, halfPrice].filter(w => w > 0);
 
  return (
    <div style={{ width: "100%", padding: matches ? "20px" : "0", boxSizing: "border-box" }}>
 
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
        <div style={{ display: "flex", gap: 10 }}>
          {weightOptions.map((w, i) => (
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
          ))}
        </div>
 
        {quantity === 0 ? (
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
 
      <div style={{ marginTop: 25, borderTop: "1px solid #cebdd8ff", width: "100%" }} />
    </div>
  );
});
 
export default AddToCartComponent;
