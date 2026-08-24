"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Divider, Button } from "@mui/material";
import styles from "./ShowAddress.module.css";
import AddressDrawer from "./AddressDrawer";
import { useState } from "react";

// Sample address data (will be replaced with real data from API/Redux)
const sampleAddress = {
  studentname: "Satendra Baghel",
  mobileno: "+91-7581937175",
  current_address:
    "Mh 5, Mela Ground, Near kanhsana Hostel ,Dullpur,Thatipur",
  current_city: "Gwalior",
  current_pincode: "474010",
  current_state: "Madhya Pradesh",
};

export default function ShowAddress({
  address = sampleAddress,
  setActiveAdd
}) {
  // Local state for drawer
  const [drawerStatus, setDrawerStatus] = useState(false);
  console.log('assssd', address)
  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Delivery Address</h2>
        </div>

        {/* Address Card */}
        {address ? <div className={styles.addressCard}>
          {/* Name and Type Row */}
          <div className={styles.nameRow}>
            <div className={styles.nameContainer}>
              <span className={styles.name}>{address.receiver_name}</span>
            </div>

            <IconButton
              onClick={() => setDrawerStatus(true)}
              className={styles.editButton}
              sx={{
                backgroundColor: "#f5f5f5",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <EditIcon sx={{ fontSize: 18, color: "#333" }} />
            </IconButton>
          </div>

          {/* Divider */}
          <Divider sx={{ borderColor: "#e0e0e0" }} />

          {/* Address Details */}
          <div className={styles.addressDetails}>
            <p className={styles.addressText}>{address.address}</p>
            <p className={styles.addressText}>{address.building_name}</p>
            <p className={styles.addressText}>{address.landmark_area}</p>
            <p className={styles.addressText}>{address.pincode}</p>
            <p className={styles.phoneText}>Phone: {address.receiver_phone}</p>
          </div>
        </div>
          :
          <div>
            <Button>Add Address</Button>
          </div>}
      </div>

      {/* Address Drawer */}
      <AddressDrawer
        setActiveAdd={setActiveAdd}
        drawerStatus={drawerStatus}
        setDrawerStatus={setDrawerStatus}
      />
    </>
  );
}