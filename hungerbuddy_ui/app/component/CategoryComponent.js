"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../services/FetchNodeServices";

export default function CategoryComponent({data})
 {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 5 : 7,
    slidesToScroll: 1,
    arrows: false
  };
  const sliderRef = useRef()
  const [index, setIndex] = useState(0)

  // var data = [{ categoryid: 1, categoryname: 'South Indian', icon: 'southindian.png' },
  // { categoryid: 2, categoryname: "Gulab jamun", icon: "gulab.png" },
  // { categoryid: 3, categoryname: "Momos", icon: "momos.png" },
  // { categoryid: 4, categoryname: "Poha", icon: "poha.png" },
  // { categoryid: 5, categoryname: "Gol gappe", icon: "golgappe.png" },
  // { categoryid: 6, categoryname: "Nodelas", icon: "nodelas.png" },
  // { categoryid: 7, categoryname: "Burger", icon: "burgercombo.png" },
  // { categoryid: 8, categoryname: "Fast food", icon: "coldring.png" },
  // { categoryid: 9, categoryname: "Snacks", icon: "snacks.png" }
  // ]
  const handleCategoryClick = (cid) => {
    setIndex(cid)

  }
  function showCategory() {
    return data.map((item) => {
      return (<div  >
        <div onClick={() => handleCategoryClick(item.categoryid)} style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: item.categoryid == index ? '4px solid red' : '' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70%', height: '70%', borderRadius: '50%' }}>
            <img style={{ width: '100%' }} src={`${serverURL}/images/${item.categoryicon}`} />
          </div>
          <div style={{ fontSize: matches ? '0.7rem' : '1rem',color:'black' }}>{item.categoryname}</div>
        </div>

      </div>)
    })

  }
  const handlePrevious = () => {
    sliderRef.current.slickPrev()
  }
  const handleNext = () => {
    sliderRef.current.slickNext()
  }

  return (
    <div style={{ width: '95%', position: 'relative', marginTop:'10px'}}>
      
      {matches ? <></> : <Image onClick={handlePrevious} style={{ position: 'absolute', top: '42%', zIndex: 2, cursor: 'pointer' }} src="/images/previous.png" width={35} height={35} alt="" />}
      <Slider ref={sliderRef} {...settings}>
        {showCategory()}
      </Slider>
   <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: '6%', color: 'black',marginTop:'5px' }}>Foods</div>

      {matches ? <></> : <Image onClick={handleNext} style={{ position: 'absolute', top: '42%', right: '-0.3%', zIndex: 2, cursor: 'pointer' }} src="/images/forward.png" width={35} height={35} alt="" />}
    </div>
  )

}

