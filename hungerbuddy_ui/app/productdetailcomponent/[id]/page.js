
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
 
  params = useParams();
  const { id } = useParams();
  var cart = useSelector((state) => state.cart);
 
  const [foodItem, setFoodItem] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  const aboutRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
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
 
  return (
    <div>
      <Header dataRef={aboutRef} />
 
      <div
        style={{
          background: "#F3ECF7",
          minHeight: "100vh",
          width: matches ? "100%" : "95%",
          maxWidth: "1400px",
          borderRadius: matches ? 0 : 20,
          margin: matches ? "0" : "20px auto 0",
          boxSizing: "border-box",
        }}
      >
        <div style={{ padding: matches ? "15px" : "30px" }}>
 
          {/* ✅ FIX: single CSS Grid instead of two hand-coded layouts full of
              negative margin-% hacks. 1 column on mobile, 2 columns on desktop.
              Grid automatically re-flows at any zoom/screen size. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: matches ? "1fr" : "minmax(0, 1.15fr) minmax(0, 1fr)",
              gap: matches ? 20 : 40,
              alignItems: "start",
            }}
          >
            {/* LEFT COLUMN: product image */}
            <div>
              <ProductImageComponent data={foodItem} pictures={pictureList} />
            </div>
 
            {/* RIGHT COLUMN: rating/price, add-to-cart card, similar items, info accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
 
              <ProductRateComponent data={foodItem} />
 
              <div
                style={{
                  background: matches ? "transparent" : "white",
                  borderRadius: 20,
                  padding: matches ? 0 : 20,
                  boxSizing: "border-box",
                }}
              >
                <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
              </div>
 
              {categoryList?.length > 0 && (
                <div>
                  <ScrollProductList data={categoryList} />
                  {/* <SimilarAvailableComponent data={categoryList} /> */}
                </div>
              )}
 
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
 
        </div>
      </div>
 
      <FooterComponent />
    </div>
  );
}