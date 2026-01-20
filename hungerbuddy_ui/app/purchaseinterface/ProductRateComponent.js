"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Rating from '@mui/material/Rating';
import { serverURL } from "../services/FetchNodeServices";
export default function ProductRateComponent({data}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  console.log({data})
  return (
    <div
      style={{
        padding: matches ? "20px" : "0",
        marginLeft: matches ? -35 : "4%",
        marginTop: matches ? "10px" : "0",
        background: 'transparent'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,

        }}
      >
        
        <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Rating
            name="simple-controlled"
            value={parseInt(data[0]?.rating)}

          />
        </div>

        <div
          style={{
            fontSize: matches ? 12 : 14,
            color: "grey",
            zIndex: 1,
          }}
        >
          ({data[0]?.rating})
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: matches ? 8 : 10,
          marginTop: matches ? 8 : 10,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: 'poppins',
            fontSize: matches ? "14px" : "18px",
            color: matches ? 'black' : "grey",
            zIndex: 1,
          }}
        >
       {data[0]?.categoryname}
        </div>
        <div
          style={{
            fontSize: matches ? "28px" : "35px",
            fontWeight: 500,
            zIndex: 1,
          }}
        >
          {data[0]?.fooditemname}
        </div>
        <div
          style={{
            fontSize: matches ? "24px" : "30px",
            fontWeight: 500,
            zIndex: 1,
          }}
        >
        {data[0]?.offerprice==0?<span style={{fontWeight:'bold',color:'#000'}}>₹{data[0]?.fullprice}</span>:<><span style={{fontWeight:'bold',marginRight:'2%',color:'#000'}}>{data[0]?.offerprice}</span> <s>₹{data[0]?.fullprice}</s></>}
        </div>

        <div
          style={{
            fontSize: matches ? "10px" : "12px",
            color: "grey",
            zIndex: 1,
          }}
        >
          Tax included. Shipping calculated at checkout
        </div>

        <div
          style={{
            fontSize: matches ? "14px" : "20px",
            fontWeight: 400,
            marginTop: matches ? 15 : 25,
            zIndex: 1,
            lineHeight: 1.5,
          }}
        >
          The snack that’s always invited to the party! Lightly peppered, just a
          hint of mint, and crunchy—Aloo Sev makes everything better, from chai
          time to movie night.
        </div>
      </div>
    </div>
  );
}

