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
  const [editId, setEditId] = useState(null);

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

    const params = new URLSearchParams(window.location.search);
    const eid = params.get("edit");
    if (eid) {
      setEditId(eid);
      fetchAddresses(eid);
    } else {
      fetchAddresses();
    }
  }, []);

  const fetchAddresses = async (editIdToFill) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getData("address/fetch_all_user_address");
      console.log("API Response:", response);

      if (response.status) {
        const list = response.data || [];
        setAddresses(list);

        // Edit mode: auto fill form from database record
        if (editIdToFill) {
          const addr = list.find((a) => String(a.id) === String(editIdToFill));
          if (addr) {
            setFormData((f) => ({
              ...f,
              pincode: addr.pincode || "",
              house_no: addr.house_no || "",
              floor_no: addr.floor_no || "",
              tower_no: addr.tower_no || "",
              building_name: addr.building_name || "",
              address: addr.address || "",
              landmark_area: addr.landmark_area || "",
              receiver_name: addr.receiver_name || "",
              receiver_phone: addr.receiver_phone || "",
              enrollmentno: addr.enrollmentno || f.enrollmentno,
            }));
          }
        }
      } else {
        setError(response.message || "Failed to fetch addresses");
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
      const isEdit = Boolean(editId);
      const payload = isEdit ? { ...formData, id: editId } : formData;
      const response = await postData(
        isEdit ? "address/edit_address" : "address/submit_address",
        payload
      );

      if (response.status) {
        alert(response.message);
        if (isEdit) {
          router.back();
          return;
        }
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
        alert(response.message);
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
          <h1 className={styles.title}>{editId ? "Edit Address" : "Add New Address"}</h1>

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
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label="House No."
                    variant="standard"
                    fullWidth
                    name="house_no"
                    value={formData.house_no}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label="Floor No."
                    variant="standard"
                    fullWidth
                    name="floor_no"
                    value={formData.floor_no}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Tower No."
                    variant="standard"
                    fullWidth
                    name="tower_no"
                    value={formData.tower_no}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Building / Apartment Name"
                    variant="standard"
                    fullWidth
                    name="building_name"
                    value={formData.building_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Address"
                    variant="standard"
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Landmark / Area"
                    variant="standard"
                    fullWidth
                    name="landmark_area"
                    value={formData.landmark_area}
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
                    value={formData.receiver_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Receiver Phone"
                    variant="standard"
                    fullWidth
                    name="receiver_phone"
                    value={formData.receiver_phone}
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
              {editId ? "Update Address" : "Save & Proceed"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}