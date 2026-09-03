"use client";
import React, { memo, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./PaymentDetails.module.css";

const PaymentDetails = memo(function PaymentDetails({ items }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const totals = useMemo(() => {
    let mrp = 0;
    let disc = 0;
    for (const item of items) {
      const offerprice = Number(item.offerprice) || 0;
      const fullprice = Number(item.fullprice) || 0;
      const effective = offerprice > 0 ? offerprice : fullprice;
      mrp += effective * item.qty;
      if (offerprice > 0 && fullprice > offerprice) {
        disc += (fullprice - offerprice) * item.qty;
      }
    }
    return { mrp, disc, total: mrp - disc };
  }, [items]);

  return (
    <div className={styles.container}>
      <div className={styles.paymentCard}>
        <h3 className={styles.paymentTitle}>Payment Details</h3>

        <div className={styles.row}>
          <span className={styles.label}>MRP Total</span>
          <span className={styles.value}>₹{totals.mrp.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Product Discount</span>
          <span className={styles.discountValue}>- ₹{totals.disc.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.deliveryLabel}>Delivery Fee (Quick)</span>
          <span className={styles.freeDelivery}>FREE</span>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>₹{totals.total.toFixed(2)}</span>
        </div>

        <div className={styles.savingsRow}>
          <span className={styles.savingsText}>
            You Saved ₹{totals.disc.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default PaymentDetails;
