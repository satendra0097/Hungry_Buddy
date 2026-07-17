"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShowCart from "../component/cartcomponent/ShowCart";
import ShowAddress from "../component/cartcomponent/ShowAddress";
import PaymentDetails from "../component/cartcomponent/PaymentDetails";
import CouponComponent from "../component/cartcomponent/CouponComponent";
import CounterComponent from "../component/cartcomponent/CounterComponent";
import styles from "./order-review.module.css";
import { useDispatch, useSelector } from "react-redux";
// import AddressDrawer from '../add-address/page'  // ✅ Fixed: removed extra semicolon
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { postData } from "../services/FetchNodeServices";

export default function OrderReviewPage() {
  const theme = useTheme();
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  var cart = useSelector((state) => state.cart);
  var products = Object.values(cart);
  var dispatch = useDispatch()
  // Step management: 0 = My Cart, 1 = Order Review, 2 = Payment
  // Start at 1 for Order Review
  const [currentStep, setCurrentStep] = useState(1);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const { error, isLoading, Razorpay } = useRazorpay();
  // var user=useSelector((state)=>state.user)
  var user = JSON.parse(localStorage.getItem('USER'))
  var btnMessage
  var userData
  if (user == null) {
    btnMessage = "Sign In"
    userData = "Not Login"

  }
  else {
    btnMessage = "Make Payment"
    userData = Object.values(user)[0]
  }


  const mrpTotal = products.reduce((sum, item) => sum + (item.offerprice > 0 ? item.offerprice : item.fullprice) * item.qty, 0);

  const discount = products.reduce((sum, item) => sum + (item.offerprice > 0 ? item.fullprice - item.offerprice : 0) * item.qty, 0);
  const deliveryFee = 0


  const total = mrpTotal - discount + deliveryFee;



  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: total * 100, // Amount in paise
    currency: "INR",
    name: "Hunger Buddy",
    description: "Test Transaction",
    order_id: "", // Generate order_id on server
    handler: async (response) => {
      console.log(response)

      await postData("users/submit_order", { paymentid: response.razorpay_payment_id, orderdate: new Date(), delivery_status: "Not Deliver", payment_type: "None" }).then(async (res) => {

        await postData('users/submit_order_detail', { orderid: res.orderid, enrollmentno: userData.enrollmentno, emailid: userData.emailid, mobileno: userData.mobileno, data: products })
      })

      dispatch({ type: 'EMPTY_CART' })
      router.push('/homepage')

    },
    prefill: {
      name: userData?.studentname,
      email: userData?.emailid,
      contact: userData?.mobileno,
    },
    theme: {
      color: "#F37254",
    },
  };


  const handleMakePayment = () => {
    if (userData == "Not Login") {
      router.push("/signin?from=MP")
    }
    else {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    }

    setCurrentStep(2); // Move to Payment step
  };


  return (
    <div>
      {products.length == 0 ? (
        <div>Cart is empty</div>
        
      ) : (
        <div
          className={styles.pageContainer}
          style={{
            padding: isSmallMobile ? "12px" : isMobile ? "16px" : "24px",
          }}
        >
          
          {/* Page Header */}
          <h1
            className={styles.pageTitle}
            style={{
              fontSize: isMobile ? "20px" : "24px",
              marginBottom: isMobile ? "16px" : "24px",
            }}
          >
            Order Review
          </h1>

          

          {/* Main Content using MUI Grid */}
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            className={styles.mainContent}
          >
            {/* Left Section - Address + Cart */}
            <Grid size={{ xs: 12, md: 8 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                
                   <ShowAddress />
                {userData != "Not Login" ?
                  <ShowAddress address={userData} drawerStatus={drawerStatus} setDrawerStatus={setDrawerStatus} />
                  : <></>}

                <ShowCart items={products} />
              </div>
            </Grid>

            {/* Right Section - Stepper, Payment & Coupon */}
            <Grid size={{ xs: 12, md: 4 }}>
              <div className={styles.rightSection}>
                {/* Stepper */}
                <CounterComponent currentStep={currentStep} />
                <PaymentDetails items={products} />
                <CouponComponent />
                
                {currentStep === 1 ? (
                  <Button
                    variant="contained"
                    fullWidth
                    className={styles.placeOrderBtn}
                    onClick={handleMakePayment}
                  >
                    {btnMessage}
                  </Button>
                ) : (
                  <div>Payment Step Placeholder</div>
                )}
              </div>
            </Grid>
          </Grid>

        </div>
      )}
      {/* <AddressDrawer drawerStatus={drawerStatus} setDrawerStatus={setDrawerStatus} /> */}
    </div>
  );
}