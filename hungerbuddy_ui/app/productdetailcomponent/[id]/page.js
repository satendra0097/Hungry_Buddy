"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartComponent from "../../purchaseinterface/AddToCartComponent";
import ProductImageComponent from "../../purchaseinterface/ProductImageComponent";
import ProductInfoComponent from "../../purchaseinterface/ProductInfoComponent";
import ProductRateComponent from "../../purchaseinterface/ProductRateComponent";
import SimilarAvailableComponent from "../../purchaseinterface/SimilarAvailableComponent";
import ScrollProductList from "../../purchaseinterface/ScrollProductList";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { postData } from "@/app/services/FetchNodeServices";
import FooterComponent from "../../component/FooterComponent";
import Header from "../../component/Header";
import { useSelector } from "react-redux";
export default function ProductDetailComponent({ params }) {

  var params = useParams()
  const { id } = useParams()
  var cart = useSelector((state) => state.cart)

  //  alert("xxxx"+JSON.stringify(data))
  const [foodItem, setFoodItem] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [pictureList, setPictureList] = useState([])
  const [refresh, setRefresh] = useState(false)

  const aboutRef = useRef()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));



  const fetchFoodDetails = async () => {

var cartkeys=Object.keys(cart)
var data={}
 if (cartkeys.includes(id))
  
 {
   data=cart[id]
  setFoodItem(data)
  
//  alert("cart m  h")
 }
 else
 {
  // alert(
  //   "cart m nhi h"
  // )
   var response = await postData("users/fetch_all_fooditems_by_id", { fooditemid: id });
 data=response.data
   data['qty']=0
 
    setFoodItem(data)
 }
    await fetchAllFoodByCategoryId(data?.foodcategoryid)
  }

  const fetchAllFoodByCategoryId = async (cn) => {
    var response = await postData("users/fetch_all_fooditems_by_category_id", { categoryid: cn });
    //  alert(JSON.stringify(response.data))
    setCategoryList(response.data)
  };



  const fetchAllFoodPicture = async () => {
    var response = await postData("pictures/fetch_all_picture", { foodid: id });
    //  alert(JSON.stringify(response.data))
    setPictureList(response.data)
  };

  useEffect(function () {
    fetchFoodDetails()
    fetchAllFoodPicture()
  }, [id])

  return (
    <div>
      <div>
        <Header dataRef={aboutRef} />
      </div>
      <div
        style={{
          background: "#F3ECF7",
          minHeight: "100vh",
          width: matches ? "100%" : "95%",
          borderRadius: matches ? 0 : 20,
          marginLeft: matches ? "0" : "2%",
          marginTop: matches ? 0 : 20,
        }}
      >
        {matches ? (

          <div style={{ padding: "15px" }}>

            <ProductImageComponent data={foodItem} pictures={pictureList} />


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "20px",
                background: 'transparent'
              }}
            >
              <ProductRateComponent data={foodItem} />
            </div>


            <div

            >
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>

            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "15px",
                background: 'transparent',
                width: '60%'
              }}
            >
              {/* <SimilarAvailableComponent data={categoryList} /> */}
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "15px",
                marginBottom: "30px",
                background: 'transparent'
              }}
            >

              <ProductInfoComponent data={foodItem} />
            </div>


          </div>

        ) : (


          <div style={{ minHeight: "100vh" }}>

            <div style={{ display: 'flex', marginTop: '5%', }}>
              <ProductImageComponent data={foodItem} pictures={pictureList} />
            </div>


            <div style={{ display: "flex", marginTop: "-65%", marginLeft: "58%" }}>
              <ProductRateComponent data={foodItem} />
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 20,
                width: "39%",
                marginTop: 22,
                marginLeft: "59%",

              }}
            >
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>

            <div style={{ marginLeft: '65%', marginTop: "11%", width: '40%' }}>
              <ScrollProductList data={categoryList} />
              {/* <SimilarAvailableComponent data={categoryList} /> */}
            </div>


            <div>
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}