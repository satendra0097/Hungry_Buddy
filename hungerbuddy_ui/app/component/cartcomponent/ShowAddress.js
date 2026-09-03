"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Divider, Button } from "@mui/material";
import styles from "./ShowAddress.module.css";
import AddressDrawer from "./AddressDrawer";
import { memo } from "react";

const ShowAddress = memo(function ShowAddress({ address, setActiveAdd, drawerStatus, setDrawerStatus }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Delivery Address</h2>
        </div>

        {address ? (
          <div className={styles.addressCard}>
            <div className={styles.nameRow}>
              <div className={styles.nameContainer}>
                <span className={styles.name}>{address.receiver_name}</span>
              </div>
              <IconButton
                onClick={() => setDrawerStatus(true)}
                className={styles.editButton}
                sx={{ backgroundColor: "#f5f5f5", "&:hover": { backgroundColor: "#e0e0e0" } }}
              >
                <EditIcon sx={{ fontSize: 18, color: "#333" }} />
              </IconButton>
            </div>
            <Divider sx={{ borderColor: "#e0e0e0" }} />
            <div className={styles.addressDetails}>
              <p className={styles.addressText}>{address.address}</p>
              <p className={styles.addressText}>{address.building_name}</p>
              <p className={styles.addressText}>{address.landmark_area}</p>
              <p className={styles.addressText}>{address.pincode}</p>
              <p className={styles.phoneText}>Phone: {address.receiver_phone}</p>
            </div>
          </div>
        ) : (
          <div>
            <Button>Add Address</Button>
          </div>
        )}
      </div>

      <AddressDrawer
        setActiveAdd={setActiveAdd}
        drawerStatus={drawerStatus}
        setDrawerStatus={setDrawerStatus}
      />
    </>
  );
});

export default ShowAddress;
