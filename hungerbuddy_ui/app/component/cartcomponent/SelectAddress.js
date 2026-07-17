"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Button } from "@mui/material";
import styles from "./SelectAddress.module.css";

const sampleAddresses = [
  {
    enrollmentno: 1,
    studentname: "Ayushman Gupta",
    mobileno: "+91-9583235265",
    current_address:
      "GH 755, GH 755 Deen Dayal Nagar, Near G Sector Dussehra Maidan Pani ki tanki",
    current_city: "Gwalior",
    current_pincode: "474020",
    current_state: "Madhya Pradesh",
  },
  {
    enrollmentno: 2,
    studentname: "Ayushman Gupta",
    mobileno: "+91-9583235265",
    current_address: "121, 1, none, morar, Tyagi Nagar, Morar, morar",
    current_city: "Gwalior",
    current_pincode: "474006",
    current_state: "Madhya Pradesh",
  },
  
];

export default function SelectAddress() {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleClose = () => {
    router.back();
  };

  const handleCardClick = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Select Address</h1>
          <IconButton
            onClick={handleClose}
            className={styles.closeButton}
            sx={{
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "#0c5273" }} />
          </IconButton>
        </div>

        {/* Saved Addresses Label */}
        <h2 className={styles.sectionTitle}>Saved Addresses</h2>

        {/* Address Cards */}
        <div className={styles.addressList}>
          {sampleAddresses.map((address) => {
            const isSelected = selectedAddressId === address.enrollmentno;
            return (
              <div
                key={address.enrollmentno}
                className={`${styles.addressCard} ${
                  isSelected ? styles.addressCardSelected : ""
                }`}
                onClick={() => handleCardClick(address.enrollmentno)}
              >
                {/* Name and Type Row */}
                <div className={styles.nameRow}>
                  <div className={styles.nameContainer}>
                    <span className={styles.name}>{address.studentname}</span>
                  </div>
                  
                  <IconButton
                    className={styles.editButton}
                    sx={{
                      backgroundColor: isSelected ? "#e3f2fd" : "#f5f5f5",
                      "&:hover": {
                        backgroundColor: isSelected ? "#bbdefb" : "#e0e0e0",
                      },
                    }}
                  >
                    <EditIcon
                      sx={{
                        fontSize: 18,
                        color: "#0078ad",
                      }}
                      
                    />
                    
                  </IconButton>
                  
                </div>

                {/* Address Details */}
                <div className={styles.addressDetails}>
                  <p className={styles.addressText}>
                    {address.current_address}
                  </p>
                  <p className={styles.addressText}>
                    {address.current_city},{" "}
                    {address.current_state},{" "}
                    {address.current_pincode}
                  </p>
                  <p className={styles.phoneText}>{address.mobileno}</p>
                </div>

                {/* Deliver Here Button - Only visible when selected */}
                {isSelected && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#0078ad",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "16px",
                      padding: "8px",
                      borderRadius: "24px",
                      textTransform: "none",
                      boxShadow: "none",
                      marginTop: "8px",
                      "&:hover": {
                        backgroundColor: "#0c5273",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Deliver Here
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Address Button */}
        <div className={styles.addAddressContainer}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push("/add-address")}
            startIcon={<AddIcon />}
            sx={{
              borderColor: "#e0e0e0",
              color: "#0078ad",
              fontWeight: 600,
              fontSize: "14px",
              padding: "14px 24px",
              borderRadius: "24px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#0078ad",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Add New Address
          </Button>
        </div>
      </div>
    </div>
  );
}
