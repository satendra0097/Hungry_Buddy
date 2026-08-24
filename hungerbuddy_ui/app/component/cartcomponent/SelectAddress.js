"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Button, CircularProgress } from "@mui/material";
import styles from "./SelectAddress.module.css";
import { getData } from "../../services/FetchNodeServices";

export default function SelectAddress({ setActiveAdd }) {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from API
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getData("address/fetch_all_user_address");
      console.log("Fetched Addresses:", response.data);

      if (response.status) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleCardClick = (addressId) => {
    setActiveAdd(addressId)
  };

  // Convert API data to match your original structure
  const formatAddress = (addr) => {
    return {
      id: addr.id,
      name: addr.receiver_name,
      phone: addr.receiver_phone,
      address: addr.address,
      pincode: addr.pincode,
      city: addr.city || "City", // If you have city field
      state: addr.state || "State", // If you have state field
      building: addr.building_name,
      landmark: addr.landmark_area,
      house: addr.house_no,
      floor: addr.floor_no,
      tower: addr.tower_no,
    };
  };

  // Build full address string
  const getFullAddress = (addr) => {
    let parts = [];
    if (addr.house_no) parts.push(addr.house_no);
    if (addr.floor_no) parts.push(`Floor ${addr.floor_no}`);
    if (addr.tower_no) parts.push(`Tower ${addr.tower_no}`);
    if (addr.building_name) parts.push(addr.building_name);
    if (addr.address) parts.push(addr.address);
    if (addr.landmark_area) parts.push(addr.landmark_area);
    return parts.join(", ");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Header - YOUR ORIGINAL CODE */}
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

        {/* Saved Addresses Label - YOUR ORIGINAL CODE */}
        <h2 className={styles.sectionTitle}>Saved Addresses</h2>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <CircularProgress />
            <p>Loading addresses...</p>
          </div>
        )}

        {/* Address Cards - YOUR ORIGINAL LOGIC WITH REAL DATA */}
        {!loading && (
          <div className={styles.addressList}>
            {addresses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p>No saved addresses found.</p>
                <Button
                  variant="contained"
                  onClick={() => router.push("/add-address")}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#0078ad",
                    "&:hover": {
                      backgroundColor: "#0c5273",
                    },
                  }}
                >
                  Add New Address
                </Button>
              </div>
            ) : (
              addresses.map((address, i) => {
                const fullAddr = getFullAddress(address);

                return (
                  <div
                    key={address.id}
                    className={`${styles.addressCard}`}
                    onClick={() => handleCardClick(i)}
                  >
                    {/* Name and Type Row - YOUR ORIGINAL CODE */}
                    <div className={styles.nameRow}>
                      <div className={styles.nameContainer}>
                        <span className={styles.name}>{address.receiver_name}</span>
                      </div>

                      <IconButton
                        className={styles.editButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/add-address?edit=${address.id}`);
                        }}
                        sx={{
                          backgroundColor:"#f5f5f5",
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
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

                    {/* Address Details - YOUR ORIGINAL CODE WITH REAL DATA */}
                    <div className={styles.addressDetails}>
                      <p className={styles.addressText}>
                        {fullAddr}
                      </p>
                      <p className={styles.addressText}>
                        Pincode: {address.pincode}
                      </p>
                      <p className={styles.phoneText}>{address.receiver_phone}</p>
                    </div>

                    {/* Deliver Here Button - YOUR ORIGINAL CODE
                    {isSelected && (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          console.log("Selected Address:", address);
                          router.push("/order-review");
                        }}
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
                    )} */}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Add New Address Button - YOUR ORIGINAL CODE */}
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