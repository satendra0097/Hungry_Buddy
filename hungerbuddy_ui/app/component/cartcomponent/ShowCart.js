"use client";
import React, { useEffect } from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./ShowCart.module.css";
import { serverURL } from "@/app/services/FetchNodeServices";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { usePathname } from "next/navigation";
import QuantityCounter from "./QuantityCounter";
// Minimum order amount for grocery
const MINIMUM_ORDER_AMOUNT = 99;

// Sample cart data
const sampleCartItems = [
  {
    id: 1,
    name: "Sprite 250 ml",
    offerprice: 19.0,
    fullprice: 20.0,
    seller: "Reliance Retail",
    size: "250 ml",
    quantity: 1,
    image: "sprite.avif",
  },
  {
    id: 2,
    name: "Bikaji Bikaneri Bhujia 1 kg",
    offerprice: 260.0,
    fullprice: 330.0,
    seller: "Reliance Retail",
    size: "1 kg",
    quantity: 1,
    image: "bhujia.avif",
  },
];

export default function ShowCart({ items,refresh,setRefresh }) {
  //alert(JSON.stringify(items))
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  var path=usePathname()

  const totalItems = items.length;
  // Calculate total price using offerprice
  const totalPrice = items.reduce((sum, item) => sum + item.offerprice, 0);
  const total_amount = items.reduce((sum, item) => sum + (item.offerprice>0?item.offerprice:item.fullprice)*item.qty, 0);
  const isBelowMinimum = totalPrice < MINIMUM_ORDER_AMOUNT;
  const amountNeeded = MINIMUM_ORDER_AMOUNT - totalPrice;

  console.log('item', items)


  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.basketTitle}>
          Quick Basket <span className={styles.itemCount}>({totalItems})</span>
        </h2>
        <span className={styles.totalPrice}>₹{Number(total_amount).toFixed(2)}</span>
      </div>

      {/* Conditional Banner based on total price */}
      {isBelowMinimum ? (
        <div className={styles.warningBanner}>
          {/* No delivery banner when below minimum */}
        </div>
      ) : (
        <div className={styles.deliveryBanner}>
          <span className={styles.bannerText}>
            Yay! You get Free delivery with this Basket
          </span>
        </div>
      )}

      {/* Cart Card */}
      <div className={styles.cartCard}>
        {/* Quick Delivery Header */}
        <div className={styles.quickHeader}>
          <div className={styles.quickBadge}>
            <FlashOnIcon className={styles.flashIcon} />
            <span className={styles.quickText}>Quick</span>
          </div>
          <span className={styles.deliveryTime}>Delivery in 10 to 30 min</span>
        </div>

        {/* Minimum Order Warning - shown when below minimum */}
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
                Add items worth ₹{amountNeeded.toFixed(2)} from Inventory to
                proceed
              </div>
              <div>
                <Button
                  variant="contained"
                  className={styles.addItemsBtn}
                  size="small"
                >
                  Add Items
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {items.map((item, index) => {
          // Calculate savings for display
          const savings = (item.fullprice - item.offerprice)*item.qty;
          const amt=(item.offerprice>0?item.offerprice:item.fullprice)*item.qty
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
                    {item.offerprice == 0 ? (
                      <div style={{display:'flex',width:'95%'}}>
                      <span className={styles.currentPrice}>
                        ₹{Number(item.fullprice)?.toFixed(2)}/unit
                      </span>
                         
                      <span className={styles.currentPrice} style={{marginLeft:'auto'}} >
                        ₹{amt}
                      </span>
                      
                      </div>
                    ) : (
                      <div style={{display:'flex',width:'95%'}}>
                        <span className={styles.currentPrice}>
                          ₹{Number(item.offerprice || 0).toFixed(2)}/unit

                        </span>
                        <span className={styles.originalPrice}>
                          ₹{Number(item.fullprice || 0).toFixed(2)}/unit

                        </span>
                      <span className={styles.currentPrice} style={{marginLeft:'auto'}} >
                        ₹{Number(amt).toFixed(2)}
                      </span>
                        
                        </div>
                      
                    )}
                  </div>
                  {item.offerprice > 0 && savings > 0 && (
                    <div className={styles.quickBadge}>
                      <div className={styles.quickText}>
                        You Save ₹{Number(savings).toFixed(2)}
                      </div>
                    </div>
                  )}
                  <span className={styles.sellerText}>
                    Sold by:{" "}
                    <span className={styles.sellerName}>HungerBuddy Foods</span>
                  </span>
                 <div style={{display:'flex'}}>
                  <span className={styles.sizeText}>
                    Qty: <span className={styles.sizeValue}>{item.qty}</span>
                  </span>
                  {path=="/order-review"?<div></div>:
                 <div style={{marginLeft:'auto'}}>
                  <QuantityCounter data={item}  refresh={refresh} setRefresh={setRefresh} />
                  </div>}
                  </div>
                 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
