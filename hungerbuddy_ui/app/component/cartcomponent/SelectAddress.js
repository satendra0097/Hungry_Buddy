"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Button, CircularProgress } from "@mui/material";
import styles from "./SelectAddress.module.css";
import { getData } from "../../services/FetchNodeServices";

export default function SelectAddress({ setActiveAdd }) {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getData("address/fetch_all_user_address");
      if (response?.status && response.data) {
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

  const handleCardClick = (address) => {
    setActiveAdd(address);
  };

  const getFullAddress = (addr) => {
    const parts = [];
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
        <div className={styles.header}>
          <h1 className={styles.title}>Select Address</h1>
          <IconButton
            onClick={handleClose}
            className={styles.closeButton}
            sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "#0c5273" }} />
          </IconButton>
        </div>

        <h2 className={styles.sectionTitle}>Saved Addresses</h2>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <CircularProgress />
            <p>Loading addresses...</p>
          </div>
        )}

        {!loading && (
          <div className={styles.addressList}>
            {addresses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p>No saved addresses found.</p>
                <Button
                  variant="contained"
                  onClick={() => router.push("/add-address")}
                  startIcon={<AddIcon />}
                  sx={{ backgroundColor: "#0078ad", "&:hover": { backgroundColor: "#0c5273" } }}
                >
                  Add New Address
                </Button>
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className={styles.addressCard}
                  onClick={() => handleCardClick(address)}
                >
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
                      sx={{ backgroundColor: "#f5f5f5", "&:hover": { backgroundColor: "#e0e0e0" } }}
                    >
                      <EditIcon sx={{ fontSize: 18, color: "#0078ad" }} />
                    </IconButton>
                  </div>

                  <div className={styles.addressDetails}>
                    <p className={styles.addressText}>{getFullAddress(address)}</p>
                    <p className={styles.addressText}>Pincode: {address.pincode}</p>
                    <p className={styles.phoneText}>{address.receiver_phone}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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
              "&:hover": { borderColor: "#0078ad", backgroundColor: "#f5f5f5" },
            }}
          >
            Add New Address
          </Button>
        </div>
      </div>
    </div>
  );
}
