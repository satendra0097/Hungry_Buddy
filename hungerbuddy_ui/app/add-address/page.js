"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconButton, TextField, Button, Grid, CircularProgress, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddAddress.module.css";
import { postData, getData } from "@/app/services/FetchNodeServices";

export default function AddressDrawer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    pincode: "",
    house_no: "",
    floor_no: "",
    tower_no: "",
    building_name: "",
    address: "",
    landmark_area: "",
    receiver_name: "",
    receiver_phone: "",
    enrollmentno: "",
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("USER");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setFormData((f) => ({ ...f, enrollmentno: Object.values(user)[0]?.enrollmentno || "" }));
      }
    } catch (e) {}
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getData("address/fetch_all_user_address");
      console.log("API Response:", response.data);

      if (response.data.status) {
        setAddresses(response.data.data);
        // Auto fill first address in form fields
        if (response.data.data.length > 0) {

        }
      } else {
        setError(response.data.message || "Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    router.back();
  };

  const handleSave = async () => {
    try {
      const response = await postData("address/submit_address", formData);

      if (response.status) {
        alert(response.message);
        fetchAddresses();
        setFormData({
          pincode: "",
          house_no: "",
          floor_no: "",
          tower_no: "",
          building_name: "",
          address: "",
          landmark_area: "",
          receiver_name: "",
          receiver_phone: "",
          enrollmentno: "",
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Full Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        console.log(error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add New Address</h1>

          <IconButton onClick={handleClose} edge="end">
            <CloseIcon sx={{ fontSize: 28, color: "#005a8d" }} />
          </IconButton>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <CircularProgress />
          </div>
        )}

        {error && !loading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
            <Button size="small" onClick={fetchAddresses} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        )}

        {!loading && !error && (
          <>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Address Details</h2>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    label="Pincode"
                    variant="standard"
                    fullWidth
                    name="pincode"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label="House No."
                    variant="standard"
                    fullWidth
                    name="house_no"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label="Floor No."
                    variant="standard"
                    fullWidth
                    name="floor_no"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Tower No."
                    variant="standard"
                    fullWidth
                    name="tower_no"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Building / Apartment Name"
                    variant="standard"
                    fullWidth
                    name="building_name"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Address"
                    variant="standard"
                    fullWidth
                    name="address"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Landmark / Area"
                    variant="standard"
                    fullWidth
                    name="landmark_area"

                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Delivery Contact Details</h2>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    label="Receiver Name"
                    variant="standard"
                    fullWidth
                    name="receiver_name"

                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Receiver Phone"
                    variant="standard"
                    fullWidth
                    name="receiver_phone"

                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </div>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              sx={{
                backgroundColor: "#0078ad",
                color: "#fff",
                fontWeight: 700,
                fontSize: "16px",
                padding: "14px",
                borderRadius: "24px",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#093e57",
                  boxShadow: "none",
                },
              }}
            >
              Save & Proceed
            </Button>
          </>
        )}
      </div>
    </div>
  );
}