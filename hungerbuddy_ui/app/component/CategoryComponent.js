"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, postData } from "../services/FetchNodeServices";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CategoryComponent({ data, dataRef, foodList, setFoodList }) {
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
  var navigate = useRouter();

  const [index, setIndex] = useState(0)
  const path = usePathname();
  const fetchAllFoodByCategory = async (cid) => {
    var response = await postData('users/fetch_all_fooditems_by_category_id', { categoryid: cid });


    setFoodList(response.data);
  };


  const handleCategoryClick = (cid) => {
    if(path=="/homepage")
    {
    fetchAllFoodByCategory(cid)
    setIndex(cid)
    dataRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  else
  {

    navigate.push('/homepage')
  }
}
  function showCategory() {
    return data?.map((item) => {
      return (<div  >
        <div onClick={() => handleCategoryClick(item.categoryid)} style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: item.categoryid == index ? '4px solid ' : '' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70%', height: '70%', borderRadius: '50%' }}>
            <img style={{ width: '100%' }} src={`${serverURL}/images/${item.categoryicon}`} />
          </div>
          <div style={{ fontSize: matches ? '0.7rem' : '1rem', color: 'black' }}>{item.categoryname}</div>
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
    <div style={{ width: '95%', position: 'relative', marginTop: '10px' }}>

      {matches ? <></> : <Image onClick={handlePrevious} style={{ position: 'absolute', top: '42%', zIndex: 2, cursor: 'pointer' }} src="/images/previous.png" width={35} height={35} alt="" />}
      <Slider ref={sliderRef} {...settings}>
        {showCategory()}
      </Slider>
      <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: '6%', color: 'black', marginTop: '5px' }}>Foods</div>

      {matches ? <></> : <Image onClick={handleNext} style={{ position: 'absolute', top: '42%', right: '-0.3%', zIndex: 2, cursor: 'pointer' }} src="/images/forward.png" width={35} height={35} alt="" />}
    </div>
  )

}

