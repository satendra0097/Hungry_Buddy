"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import { useRazorpay } from "react-razorpay";
import { getData, postData } from "../services/FetchNodeServices";

export default function OrderReviewPage() {
  const theme = useTheme();
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [activeAdd, setActiveAdd] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cart = useSelector((state) => state.cart);
  const products = useMemo(() => Object.values(cart), [cart]);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const { error, isLoading, Razorpay } = useRazorpay();

  const user = useMemo(() => {
    try {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('USER');
        return userData ? JSON.parse(userData) : null;
      }
    } catch { return null; }
    return null;
  }, []);

  const btnMessage = user ? "Make Payment" : "Sign In";
  const userData = user ? Object.values(user)[0] : null;

  const fetchAddress = useCallback(async () => {
    const res = await getData('address/fetch_all_user_address');
    if (res?.status && res.data?.length) {
      setAddress(res.data);
      const activeIndex = res.data.findIndex((item) => item.active === 1);
      setActiveAdd(activeIndex >= 0 ? res.data[activeIndex] : res.data[0]);
    }
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  const mrpTotal = useMemo(
    () => products.reduce((sum, item) => {
      const offerprice = Number(item.offerprice) || 0;
      const fullprice = Number(item.fullprice) || 0;
      return sum + (offerprice > 0 ? offerprice : fullprice) * item.qty;
    }, 0),
    [products]
  );

  const discount = useMemo(
    () => products.reduce((sum, item) => {
      const offerprice = Number(item.offerprice) || 0;
      const fullprice = Number(item.fullprice) || 0;
      return sum + (offerprice > 0 ? fullprice - offerprice : 0) * item.qty;
    }, 0),
    [products]
  );

  const total = mrpTotal - discount;

  const options = useMemo(() => ({
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: total * 100,
    currency: "INR",
    name: "Hunger Buddy",
    description: "Test Transaction",
    order_id: "",
    handler: async (response) => {
      await postData("users/submit_orders", {
        paymentid: response.razorpay_payment_id,
        delivery_status: "Not Deliver",
        payment_type: "None",
      }).then(async (res) => {
        await postData('users/submit_order_details', {
          orderid: res.orderid,
          enrollmentno: userData?.enrollmentno,
          emailid: userData?.emailid,
          mobileno: userData?.mobileno,
          data: products,
        });
      });
      dispatch({ type: 'EMPTY_CART' });
      router.push('/homepage');
      alert("payment Successful!");
    },
    prefill: {
      name: userData?.studentname,
      email: userData?.emailid,
      contact: userData?.mobileno,
    },
    theme: { color: "#F37254" },
  }), [total, userData, products, dispatch, router]);

  const handleMakePayment = useCallback(() => {
    if (!user) {
      router.push("/signin?from=MP");
      return;
    }
    if (!Razorpay) {
      alert("Razorpay is loading, please wait...");
      return;
    }
    new Razorpay(options).open();
    setCurrentStep(2);
  }, [user, Razorpay, options, router]);

  return (
    <div>
      {products.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div
          className={styles.pageContainer}
          style={{ padding: isSmallMobile ? "12px" : isMobile ? "16px" : "24px" }}
        >
          <h1
            className={styles.pageTitle}
            style={{ fontSize: isMobile ? "20px" : "24px", marginBottom: isMobile ? "16px" : "24px" }}
          >
            Order Review
          </h1>

          <Grid container spacing={isMobile ? 2 : 3} className={styles.mainContent}>
            <Grid size={{ xs: 12, md: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {userData ? (
                  <ShowAddress
                    setActiveAdd={setActiveAdd}
                    address={activeAdd || address[0] || null}
                    drawerStatus={drawerStatus}
                    setDrawerStatus={setDrawerStatus}
                  />
                ) : null}

                <ShowCart items={products} refresh={false} setRefresh={() => {}} />
              </div>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <div className={styles.rightSection}>
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
    </div>
  );
}
