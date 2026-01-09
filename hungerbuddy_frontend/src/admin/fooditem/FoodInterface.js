import {
  Rating,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";
import { useState, useEffect } from "react";
import {
  getData,
  getDate,
  getTime,
  postData,
} from "../../services/FatchNodeServices"
import Swal from "sweetalert2";
import Branch from "../branch/Branch";
import { use } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",

    justifyContent: "center",
    width: '100%',
    height: "100%",
  },
  box: {
    width: "90%",
    height: "auto",
    border: "0.7px solid hsla(321,41%,24%,1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10,
    alignItems:'center'
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg,hsla(321,41%,24%,1) 0%, hsla(330,53%,77%,1) 100%)",

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
    padding: 5,
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));
export default function FoodInterface() {
  var classes = useStyle();
  var branch = JSON.parse(localStorage.getItem('Branch'))
  // alert(JSON.stringify(branch))
  const [branchid, setBranchid] = useState(branch?.branchid)
  const [branchName, setBranchName] = useState(branch?.branchname)
 
  const [Fooditemname, setFooditemname] = useState("");
  const [Fooditemtype, setFooditemtype] = useState("");
  const [Fooditemtaste, setFooditemtaste] = useState("");

  const [Ingridients, setIngridients] = useState("");
  const [Fullprice, setFullprice] = useState("");
  const [Halfprice, setHalfprice] = useState([]);
  const [Offerprice, setOfferprice] = useState([]);
  const [Statuse, setStatuse] = useState("");
  const [Ratings, setRatings] = useState(0);
  const [Pictures, setPictures] = useState({
    bytes: "",
    fileName: burger,
  });
  const [Foodcategoryid, setFoodcategoryid] = useState("");
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    let res = await getData("fooditem/fetch_all_category");
    console.log("Categories from backend:", res.data);
    setCategoryList(res.data);
  };
   const clearValues = () => {
      // alert('rfghfg')
      setFoodcategoryid('')
      setPictures({ bytes: '', filename: burger });
    }

  const fillCategory = () => {
    return CategoryList?.map((item) => (
      <MenuItem key={item.categoryid} value={item.categoryid}>
        {item.categoryname}
      </MenuItem>
    ));
  };


  const handleStateChange = (e) => {
    setFooditemtype(e.target.value);
  };

  const [error, setError] = useState({ fileError: null });
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validation = () => {
    var isError = false;
    if (Fooditemname.length == 0) {
      setError((prev) => ({
        ...prev,
        Fooditemname: "Pls Input Food Name",
      }));
      isError = true;
    }
    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var formData = new FormData();
      formData.append("branchid",branchid);
      formData.append("foodcategoryid", Foodcategoryid);
      formData.append("fooditemname", Fooditemname);
      formData.append("fooditemtype", Fooditemtype);
      formData.append("fooditemtaste", Fooditemtaste);
      formData.append("ingridients", Ingridients);
      formData.append("fullprice", Fullprice);
      formData.append("halfprice", Halfprice);
      formData.append("offerprice", Offerprice);
      formData.append("status", Statuse);
      formData.append("ratings", Ratings);
      formData.append("picture", Pictures.bytes);

      var response = await postData("fooditem/submit_fooditem", formData);

      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
      }
    }
  };
  const handleChange = (e) => {
    setPictures({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setError((prev) => ({ ...prev, fileError: null }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.titleStyle}>HungerBuddy</div>
                <div className={classes.subTitleStyle}>New food Category</div>
              </div>
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Food Category </InputLabel>
                <Select
                  label="FoodCategoryID"
                  value={Foodcategoryid}
                  onChange={(e) => setFoodcategoryid(e.target.value)}
                >
                  <MenuItem>-Select Food Category ID-</MenuItem>
                  {fillCategory()}
                </Select>
              </FormControl>
            </div>
          </Grid>

           <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setBranchName(e.target.value)}
                label="Branch name" value={branchName}
                fullWidth
              ></TextField>

            </div>
          
          </Grid>

          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setFooditemname(e.target.value)}
                label="Food Name"
                fullWidth
                helperText={error?.Fooditemname}
                error={error?.Fooditemname}
                onFocus={() => handleError("Fooditemname", null)}
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Food Item Type</InputLabel>
                <Select
                  label="Food Item Type"
                  value={Fooditemtype}
                  onChange={handleStateChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="veg">Veg</MenuItem>
                  <MenuItem value="nonveg">Non Veg</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Food Taste</InputLabel>
                <Select
                  label="Food Taste"
                  value={Fooditemtaste}
                  onChange={(e) => setFooditemtaste(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="spicy">Spicy</MenuItem>
                  <MenuItem value="nonspicy">Non Spicy</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setIngridients(e.target.value)}
                label="Ingridients"
                fullWidth
                helperText={error?.branchname}
                error={error?.branchname}
                onFocus={() => handleError("branchname", null)}
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setFullprice(e.target.value)}
                label="Fullprice"
                fullWidth
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setHalfprice(e.target.value)}
                label="Halfprice"
                fullWidth
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setOfferprice(e.target.value)}
                label="Offer Price"
                fullWidth
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={Statuse}
                  onChange={(e) => setStatuse(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Avl">Avl</MenuItem>
                  <MenuItem value="NotAvl">NotAvl</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          
          {/* <Grid size={2}>
            <Rating
              name="ratings"
              value={Ratings}
              onChange={(event, newValue) => setRatings(newValue)}
            />
          </Grid> */}

          <Grid
            size={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0px 5px 0px 5px",marginRight:'29px' }}>
              <img src={Pictures.fileName} style={{ width: 40 }} />
            </div>
            <div
              style={{
                color: "#d32f2f",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: "1.66rem",
              }}
            >
              {error?.fileError == null ? "" : error.fileError}
            </div>
          </Grid>

          <Grid size={2}>
            <div style={{ padding: "0px 5px 0px 5px", width: "100%" }}>
              <IconButton
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CloudUploadIcon style={{ fontSize: 35 }} />
                <div style={{ fontSize: 14 }}>Upload</div>

                <input onChange={handleChange} type="file" hidden multiple />
              </IconButton>

            </div>
          </Grid>

          <Grid size={2}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
                          <IconButton onClick={handleClick} style={{ color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column", marginLeft: 10 }} >
                            <SaveIcon style={{ fontSize: 35 }} />
                            <div style={{ fontSize: 14 }}>Save</div>
                          </IconButton>
                        </div>
          </Grid>
          <Grid size={2}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box', }}>
              <IconButton  style={{ justifyContent: 'center',component:'label' ,color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column" }}>

                <DeleteForeverIcon onClick={clearValues} style={{ fontSize: 35 }} />
                <div style={{ fontSize: 14 }}>Clear</div>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
