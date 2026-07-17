
"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { serverURL } from "../services/FetchNodeServices";
import { useRouter } from "next/navigation";
export default function ScrollProductList({ data }) {
  const theme = useTheme();
  var navigate = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var settings = {
    dots: false,
    //  infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };
  const [hovered, setHovered] = useState(null);

  const images = [
    `${serverURL}/images/minialoosev.png`,
    `${serverURL}/images/yellowsev.png`,
    `${serverURL}/images/ratalmi.png`,
    `${serverURL}/images/farari.png`,

  ];
  const handleFoodChange = (foodid) => {
    navigate.replace(`/productdetailcomponent/${foodid}`);
  };

  const mySlider = () => {
    return data?.map((item, index) => {

      return (<div
        onClick={() => handleFoodChange(item.fooditemid)}
        style={{display:'flex',justifyContent:'center', width: "130px",height:'130' ,padding: '20px' }}>

        <img
          key={index}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            border: hovered === index ? "0.8px solid grey" : "",
            borderRadius: 15,
            transform: hovered === index ? "scale(1.0)" : "scale(1)",
            transition: "0.25s",
          background: "#fff",
            width: matches ? "100px" : "100px",
            height:matches ? '100px' : '100px',
          objectFit: "cover",
          }}
          src={`${serverURL}/images/${item.picture}`}
          alt={`similar product ${index + 1}`}
        />
      </div>
      );
    });
  };

  return (
    <div style={{ width: "500px" }}>
         <div style={{
                display: 'flex',
             
                fontSize: matches ? "16px" : "20px",
                color:'black',
                marginBottom:'20px',
                fontWeight:500
            }}>
                Liked it? Try these!
            </div>

      <Slider {...settings}>{mySlider()}</Slider>
      
            <div style={{
                display: 'flex',
             
                fontSize: matches ? "14px" : "20px",
                marginTop: matches ? 30 : 40,
                 color:'black',
                   fontWeight:500
            }}>
                Also available on*
            </div>
    </div>
    
  );
  
}