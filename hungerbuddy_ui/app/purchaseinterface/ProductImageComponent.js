"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"
import { serverURL } from "../services/FetchNodeServices";


export default function ProductImageComponent({data}) {
    // alert("xxxx"+JSON.stringify(data))
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
   //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


  const images = [
    `${serverURL}/images/aloosev1.png`,
    `${serverURL}/images/aloosev2.png`,
    `${serverURL}/images/aloosev3.png`,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
    // console.log(data)
  return (
    <div style={{ marginTop: 30, marginLeft: matches ? "0" : "10%" }}>
      {matches ? (

        // MOBILE: ke liye  !!

        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <Slider {...settings}>
            {images.map((item) => (
              <div >
                <img
                  src={item}
                  alt=""
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 15,
                    // margin: "0 auto",
                  
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (

        // Original wala !!
      
        <div>
          <img
           src={`${serverURL}/images/${data[0]?.picture}`}
            alt=""
            style={{
              width: 626,
              height: 635,
              borderRadius: 25,
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", gap: 20 }}>
            <img
              src={images[1]}
              alt=""
              style={{ width: 300, height: 300, borderRadius: 25 }}
            />
            <img
              src={images[2]}
              alt=""
              style={{ width: 300, height: 300, borderRadius: 25 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}