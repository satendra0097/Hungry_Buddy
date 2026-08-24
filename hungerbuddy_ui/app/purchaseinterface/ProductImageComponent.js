"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { serverURL } from "../services/FetchNodeServices";
 
export default function ProductImageComponent({ data, pictures }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const images = pictures?.picture ? pictures.picture.split(",") : [];
 
  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
 
  return (
    // ✅ FIX: no more marginLeft:"10%" hack. Container simply fills its
    // parent grid/flex cell and caps at 626px on desktop.
    <div style={{ width: "100%", maxWidth: matches ? "100%" : "626px", margin: matches ? "0 auto" : "0" }}>
      {matches ? (
        // MOBILE: slider, image always square + full width (no fixed px)
        <div style={{ width: "100%" }}>
          {images.length > 0 ? (
            <Slider {...settings}>
              {images.map((item, i) => (
                <div key={i}>
                  <img
                    src={item}
                    alt=""
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: 15,
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={`${serverURL}/images/${data?.picture}`}
              alt=""
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 15 }}
            />
          )}
        </div>
      ) : (
        // DESKTOP/TABLET: main image + 2 thumbnails, all fluid (%) not fixed px
        <div style={{ width: "100%" }}>
          <img
            src={`${serverURL}/images/${data?.picture}` || `${serverURL}/images/aloosev1.png`}
            alt=""
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 25,
              marginBottom: 20,
              display: "block",
            }}
          />
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <img
              src={images[0] ? `${serverURL}/images/${images[0]}` : `${serverURL}/images/aloosev2.png`}
              alt=""
              style={{ width: "calc(50% - 10px)", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 25 }}
            />
            <img
              src={images[1] ? `${serverURL}/images/${images[1]}` : `${serverURL}/images/aloosev3.png`}
              alt=""
              style={{ width: "calc(50% - 10px)", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 25 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}