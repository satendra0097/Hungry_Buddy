"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { serverURL } from "../services/FetchNodeServices";
import { useRouter } from "next/navigation";
 
export default function ScrollProductList({ data }) {
  const theme = useTheme();
  const navigate = useRouter();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
 
  // ✅ FIX: slidesToShow adapts to screen instead of a hardcoded 4 that
  // overflows on mobile
  const slidesToShow = matchesSm ? 2 : matchesMd ? 3 : 4;
 
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: !matchesSm,
  };
 
  const [hovered, setHovered] = useState(null);
 
  const handleFoodChange = (foodid) => {
    navigate.replace(`/productdetailcomponent/${foodid}`);
  };
 
  const mySlider = () => {
    return data?.map((item, index) => (
      <div
        key={index}
        onClick={() => handleFoodChange(item.fooditemid)}
        style={{ display: 'flex', justifyContent: 'center', padding: '10px', cursor: "pointer" }}
      >
        <img
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            border: hovered === index ? "0.8px solid grey" : "",
            borderRadius: 15,
            transform: hovered === index ? "scale(1.0)" : "scale(1)",
            transition: "0.25s",
            background: "#fff",
            width: "100%",
            maxWidth: "120px",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
          loading="lazy"
          src={`${serverURL}/images/${item.picture}`}
          alt={`similar product ${index + 1}`}
        />
      </div>
    ));
  };
 
  return (
    // ✅ FIX: width was a fixed 500px, now fills whatever container it's in
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: matchesMd ? "16px" : "20px", color: 'black', marginBottom: '20px', fontWeight: 500 }}>
        Liked it? Try these!
      </div>
 
      <Slider {...settings}>{mySlider()}</Slider>
 
      <div style={{ fontSize: matchesMd ? "14px" : "20px", marginTop: matchesMd ? 30 : 40, color: 'black', fontWeight: 500 }}>
        Also available on*
      </div>
    </div>
  );
}