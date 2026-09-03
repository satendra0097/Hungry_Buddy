
"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartComponent from "../../purchaseinterface/AddToCartComponent";
import ProductImageComponent from "../../purchaseinterface/ProductImageComponent";
import ProductInfoComponent from "../../purchaseinterface/ProductInfoComponent";
import ProductRateComponent from "../../purchaseinterface/ProductRateComponent";
import ScrollProductList from "../../purchaseinterface/ScrollProductList";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { postData } from "@/app/services/FetchNodeServices";
import FooterComponent from "../../component/FooterComponent";
import Header from "../../component/Header";
import { useSelector } from "react-redux";
 
export default function ProductDetailComponent() {
 
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
 
  const [foodItem, setFoodItem] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  const aboutRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  const fetchFoodDetails = useCallback(async () => {
    const numId = Number(id);
    let data = {};
    const cartItem = cart[numId];
    if (cartItem) {
      data = cartItem;
    } else {
      const response = await postData("users/fetch_all_fooditems_by_id", { fooditemid: numId });
      if (!response?.data) return;
      data = { ...response.data, qty: 0 };
    }
    setFoodItem(data);
    if (data?.foodcategoryid) {
      const catResponse = await postData("users/fetch_all_fooditems_by_category_id", { categoryid: data.foodcategoryid });
      if (catResponse?.data) setCategoryList(catResponse.data);
    }
  }, [id, cart]);
 
  const fetchAllFoodPicture = useCallback(async () => {
    const response = await postData("pictures/fetch_all_picture", { foodid: Number(id) });
    if (response?.data) setPictureList(response.data);
  }, [id]);
 
  useEffect(() => {
    fetchFoodDetails();
    fetchAllFoodPicture();
  }, [fetchFoodDetails, fetchAllFoodPicture]);
 
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
 
          <div
            style={{
              display: "grid",
              gridTemplateColumns: matches ? "1fr" : "minmax(0, 1.15fr) minmax(0, 1fr)",
              gap: matches ? 20 : 40,
              alignItems: "start",
            }}
          >
            <div>
              <ProductImageComponent data={foodItem} pictures={pictureList} />
            </div>
 
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
