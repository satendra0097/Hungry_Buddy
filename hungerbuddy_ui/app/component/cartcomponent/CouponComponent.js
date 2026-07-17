"use client";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./CouponComponent.module.css";
import Image from "next/image";
import { InputAdornment } from "@mui/material";

export default function CouponComponent() {
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className={styles.card} onClick={toggleDrawer(true)}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <LocalOfferIcon className={styles.couponIcon} />
            <span className={styles.text}>Apply Coupon</span>
          </div>
          <ChevronRightIcon className={styles.arrowIcon} />
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className={styles.drawerPaper}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitle}>Apply Coupon</div>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className={styles.inputContainer}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/images/voucher.png"
                        alt="voucher"
                        width={40}
                        height={40}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              disableElevation
              className={styles.applyButton}
              sx={{ bgcolor: "#0078ad", "&:hover": { bgcolor: "#0c5273" } }}
            >
              APPLY
            </Button>
          </div>

          <div className={styles.emptyContainer}>
            <Image src="/images/voucher.png" alt="voucher" width={50} height={50} />
            <div className={styles.emptyText}>
              Currently there are no available coupons
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
