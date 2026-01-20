"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartComponent from "../../purchaseinterface/AddToCartComponent";
import ProductImageComponent from "../../purchaseinterface/ProductImageComponent";
import ProductInfoComponent from "../../purchaseinterface/ProductInfoComponent";
import ProductRateComponent from "../../purchaseinterface/ProductRateComponent";
import SimilarAvailableComponent from "../../purchaseinterface/SimilarAvailableComponent";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { postData } from "@/app/services/FetchNodeServices";

export default  function ProductDetailComponent({params}) {

    var params=useParams()
    const {id}=useParams()
  //  alert("xxxx"+JSON.stringify(data))
const [foodItem,setFoodItem]=useState({})
   const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const fetchFoodDetails=async()=>{
        
    var response = await postData("users/fetch_all_fooditems_by_id",{fooditemid:id});
        
        //alert(JSON.stringify(response.data))
        
        setFoodItem(response.data)    

    


  }
  useEffect(function(){
    
fetchFoodDetails()
  },[id])

  return (
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
          
          <ProductImageComponent   data={foodItem} />


          <div
            style={{
              background: "white",
              borderRadius: 15,
              padding: "20px",
              marginTop: "20px",
              background:'transparent'
            }}
          >
            <ProductRateComponent  data={foodItem} />
          </div>

        
          <div
            style={{
              background: "white",
              borderRadius: 15,
              padding: "20px",
              marginTop: "15px",
            }}
          >
            <AddToCartComponent />
          </div>

          
          <div
            style={{
              background: "white",
              borderRadius: 15,
              padding: "20px",
              marginTop: "15px",
              background:'transparent'
            }}
          >
            <SimilarAvailableComponent  />
          </div>

        
          <div
            style={{
              background: "white",
              borderRadius: 15,
              padding: "20px",
              marginTop: "15px",
              marginBottom: "30px",
              background:'transparent'
            }}
          >
            <ProductInfoComponent   />
          </div>
        </div>
      ) : (
       

        <div style={{ position: "relative", minHeight: "100vh" }}>
          
          <div style={{display:'flex',marginTop:'5%',position:'relative'}}>
            <ProductImageComponent  data={foodItem} />
          </div>

      
          <div style={{ display: "flex", marginTop: "-65%", marginLeft: "58%" }}>
            <ProductRateComponent   data={foodItem}/>
          </div>

          
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 20,
              width: "39%",
              marginTop: 22,
              marginLeft: "59%",
              position: 'relative'
            }}
          >
            <AddToCartComponent />
          </div>

        
          <div style={{ display: 'flex', marginLeft: '59%', marginTop: "11%" }}>
            <SimilarAvailableComponent />
          </div>

          
          <div>
            <ProductInfoComponent />
          </div>
        </div>
      )}
    </div>
  );
}