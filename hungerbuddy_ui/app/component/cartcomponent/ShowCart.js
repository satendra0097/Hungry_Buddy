"use client";
import React, { memo, useMemo } from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./ShowCart.module.css";
import { serverURL } from "@/app/services/FetchNodeServices";
import { usePathname } from "next/navigation";
import QuantityCounter from "./QuantityCounter";

const MINIMUM_ORDER_AMOUNT = 99;

const ShowCart = memo(function ShowCart({ items, refresh, setRefresh }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const path = usePathname();

  const totalItems = items.length;

  const totals = useMemo(() => {
    let total = 0;
    let savings = 0;
    for (const item of items) {
      const offerprice = Number(item.offerprice) || 0;
      const fullprice = Number(item.fullprice) || 0;
      const effective = offerprice > 0 ? offerprice : fullprice;
      total += effective * item.qty;
      if (offerprice > 0 && fullprice > offerprice) {
        savings += (fullprice - offerprice) * item.qty;
      }
    }
    return { total, savings };
  }, [items]);

  const isBelowMinimum = totals.total < MINIMUM_ORDER_AMOUNT;
  const amountNeeded = MINIMUM_ORDER_AMOUNT - totals.total;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.basketTitle}>
          Quick Basket <span className={styles.itemCount}>({totalItems})</span>
        </h2>
        <span className={styles.totalPrice}>₹{totals.total.toFixed(2)}</span>
      </div>

      {isBelowMinimum ? (
        <div className={styles.warningBanner}></div>
      ) : (
        <div className={styles.deliveryBanner}>
          <span className={styles.bannerText}>
            Yay! You get Free delivery with this Basket
          </span>
        </div>
      )}

      <div className={styles.cartCard}>
        <div className={styles.quickHeader}>
          <div className={styles.quickBadge}>
            <FlashOnIcon className={styles.flashIcon} />
            <span className={styles.quickText}>Quick</span>
          </div>
          <span className={styles.deliveryTime}>Delivery in 10 to 30 min</span>
        </div>

        {isBelowMinimum && (
          <div className={styles.minimumOrderBanner}>
            <div className={styles.minimumOrderHeader}>
              <WarningAmberIcon className={styles.warningIcon} />
              <span className={styles.minimumOrderText}>
                Minimum purchase amount is ₹{MINIMUM_ORDER_AMOUNT.toFixed(2)}
              </span>
            </div>
            <div className={styles.minimumOrderAction}>
              <div className={styles.addItemsText}>
                Add items worth ₹{amountNeeded.toFixed(2)} from Inventory to proceed
              </div>
              <div>
                <Button variant="contained" className={styles.addItemsBtn} size="small">
                  Add Items
                </Button>
              </div>
            </div>
          </div>
        )}

        {items.map((item, index) => {
          const offerprice = Number(item.offerprice) || 0;
          const fullprice = Number(item.fullprice) || 0;
          const effective = offerprice > 0 ? offerprice : fullprice;
          const amt = effective * item.qty;
          const savings = offerprice > 0 && fullprice > offerprice ? (fullprice - offerprice) * item.qty : 0;

          return (
            <div key={item.fooditemid}>
              {index > 0 && <div className={styles.itemDivider} />}
              <div
                className={styles.cartItem}
                style={{ flexWrap: isSmallMobile ? "wrap" : "nowrap" }}
              >
                <div
                  className={styles.itemImage}
                  style={{
                    width: isSmallMobile ? "60px" : "100px",
                    height: isSmallMobile ? "60px" : "100px",
                  }}
                >
                  <img
                    src={`${serverURL}/images/${item.picture}`}
                    alt={item.fooditemname}
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.fooditemname}</span>
                  <div className={styles.priceRow}>
                    {offerprice === 0 ? (
                      <div style={{ display: 'flex', width: '95%' }}>
                        <span className={styles.currentPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </span>
                        <span className={styles.currentPrice} style={{ marginLeft: 'auto' }}>
                          ₹{amt}
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', width: '95%' }}>
                        <span className={styles.currentPrice}>
                          ₹{offerprice.toFixed(2)}/unit
                        </span>
                        <span className={styles.originalPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </span>
                        <span className={styles.currentPrice} style={{ marginLeft: 'auto' }}>
                          ₹{amt.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className={styles.quickBadge}>
                      <div className={styles.quickText}>
                        You Save ₹{savings.toFixed(2)}
                      </div>
                    </div>
                  )}
                  <span className={styles.sellerText}>
                    Sold by: <span className={styles.sellerName}>HungerBuddy Foods</span>
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className={styles.sizeText}>
                      Qty: <span className={styles.sizeValue}>{item.qty}</span>
                    </span>
                    {path !== "/order-review" && (
                      <div style={{ marginLeft: 'auto' }}>
                        <QuantityCounter data={item} refresh={refresh} setRefresh={setRefresh} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ShowCart;
