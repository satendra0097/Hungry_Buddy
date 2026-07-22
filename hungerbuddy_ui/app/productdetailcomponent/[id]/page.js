"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartComponent from "../../purchaseinterface/AddToCartComponent";
import ProductImageComponent from "../../purchaseinterface/ProductImageComponent";
import ProductInfoComponent from "../../purchaseinterface/ProductInfoComponent";
import ProductRateComponent from "../../purchaseinterface/ProductRateComponent";
import ScrollProductList from "../../purchaseinterface/ScrollProductList";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { postData } from "@/app/services/FetchNodeServices";
import FooterComponent from "../../component/FooterComponent";
import Header from "../../component/Header";
import { useSelector } from "react-redux";

export default function ProductDetailComponent({ params }) {
  var params = useParams();
  const { id } = useParams();
  var cart = useSelector((state) => state.cart);

  const [foodItem, setFoodItem] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const aboutRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fetchFoodDetails = async () => {
    var cartkeys = Object.keys(cart);
    var data = {};
    if (cartkeys.includes(id)) {
      data = cart[id];
      setFoodItem(data);
    } else {
      var response = await postData("users/fetch_all_fooditems_by_id", { fooditemid: id });
      data = response.data;
      data['qty'] = 0;
      setFoodItem(data);
    }
    await fetchAllFoodByCategoryId(data?.foodcategoryid);
  };

  const fetchAllFoodByCategoryId = async (cn) => {
    var response = await postData("users/fetch_all_fooditems_by_category_id", { categoryid: cn });
    setCategoryList(response.data);
  };

  const fetchAllFoodPicture = async () => {
    var response = await postData("pictures/fetch_all_picture", { foodid: id });
    setPictureList(response.data);
  };

  useEffect(function () {
    fetchFoodDetails();
    fetchAllFoodPicture();
  }, [id]);

  // Styles
  const containerStyles = {
    background: "#F3ECF7",
    minHeight: "100vh",
    width: "100%",
    padding: isMobile ? "10px" : isTablet ? "15px" : "20px 40px",
  };

  const cardStyles = {
    background: "white",
    borderRadius: isMobile ? 12 : 15,
    padding: isMobile ? "12px" : "20px",
    marginTop: "15px",
  };

  const sectionSpacing = {
    marginTop: isMobile ? "12px" : "20px",
  };

  return (
    <div>
      <div>
        <Header dataRef={aboutRef} />
      </div>
      
      <div style={containerStyles}>
        {/* Mobile View */}
        {isMobile ? (
          <div style={{ padding: "5px" }}>
            <ProductImageComponent data={foodItem} pictures={pictureList} />
            
            <div style={cardStyles}>
              <ProductRateComponent data={foodItem} />
            </div>

            <div style={sectionSpacing}>
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>

            <div style={{ ...cardStyles, marginTop: "15px" }}>
              {/* Similar products can go here */}
            </div>

            <div style={{ ...cardStyles, marginBottom: "30px" }}>
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
        ) : 
        /* Tablet View */
        isTablet ? (
          <div style={{ padding: "10px" }}>
            <ProductImageComponent data={foodItem} pictures={pictureList} />
            
            <div style={cardStyles}>
              <ProductRateComponent data={foodItem} />
            </div>

            <div style={sectionSpacing}>
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>

            <div style={{ ...cardStyles, marginTop: "15px" }}>
              {/* Similar products can go here */}
            </div>

            <div style={{ ...cardStyles, marginBottom: "30px" }}>
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
        ) : 
        /* Desktop View */
        (
          <div style={{ 
            maxWidth: "1400px", 
            margin: "0 auto",
            padding: "20px 0",
          }}>
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginTop: "20px",
            }}>
              {/* Left Column - Image */}
              <div>
                <ProductImageComponent data={foodItem} pictures={pictureList} />
              </div>

              {/* Right Column - Details */}
              <div>
                <ProductRateComponent data={foodItem} />
                
                <div style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "20px",
                  marginTop: "20px",
                }}>
                  <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <ScrollProductList data={categoryList} />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div style={{ marginTop: "30px" }}>
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}