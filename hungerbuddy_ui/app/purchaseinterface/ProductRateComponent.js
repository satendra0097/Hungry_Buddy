"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Rating from '@mui/material/Rating';
 
export default function ProductRateComponent({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    // ✅ FIX: removed marginLeft:-35 hack, width now 100% of its own column
    <div style={{ width: "100%", padding: matches ? "20px 20px 0" : "0", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Rating name="simple-controlled" value={parseInt(data?.rating)} readOnly />
        <div style={{ fontSize: matches ? 12 : 14, color: "grey" }}>({data?.rating})</div>
      </div>
 
      <div style={{ display: "flex", flexDirection: "column", gap: matches ? 8 : 10, marginTop: matches ? 8 : 10 }}>
        <div style={{ fontFamily: 'poppins', fontSize: matches ? "14px" : "16px", color: "grey" }}>
          {data?.categoryname}
        </div>
 
        {/* ✅ FIX: font clamps down instead of a fixed 35px that overflows on small desktops */}
        <div style={{ fontSize: matches ? "24px" : "32px", fontWeight: 500, wordBreak: "break-word" }}>
          {data?.fooditemname}
        </div>
 
        <div style={{ fontSize: matches ? "22px" : "28px", fontWeight: 500 }}>
          {data.offerprice == 0 ? (
            <span style={{ fontWeight: 'bold', color: '#000' }}>₹{data.fullprice}</span>
          ) : (
            <>
              <span style={{ fontWeight: 'bold', marginRight: '2%', color: '#000' }}>₹{data.offerprice}</span>{" "}
              <s style={{ color: "grey", fontSize: "0.7em" }}>₹{data.fullprice}</s>
            </>
          )}
        </div>
 
        <div style={{ fontSize: matches ? "10px" : "12px", color: "grey" }}>
          Tax included. Shipping calculated at checkout
        </div>
 
        <div style={{ fontSize: matches ? "12px" : "14px", fontWeight: 400, marginTop: matches ? 15 : 20, lineHeight: 1.5, color: 'black' }}>
          {data?.description}
        </div>
      </div>
    </div>
  );
}