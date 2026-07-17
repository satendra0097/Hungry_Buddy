import {
  IconButton,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";
import { useState, useEffect } from "react";
import { getDate, getTime, postData, getData } from "../../services/FatchNodeServices";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: '70%',
    height: 200,
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10
  },
  heading: {
    width: "100%",
    height: "auto",
    color: "white",
    background: "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
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
  },
  titleBox: {
    display: "flex",
    // justifyContent: "center",
    //alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));
export default function PictureInterface({ refresh, setRefresh }) {
  var classes = useStyle();
  const [categoryId, setcategoryId] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [foodId, setfoodId] = useState("");
  const [foodList, setfoodlist] = useState([]);
  const [picture, setpicture] = useState([burger]);

  const showPictureList = () => {
    return picture?.map((item, index) => {
      let imageSrc;

      if (item instanceof File) {
        imageSrc = URL.createObjectURL(item); // file case
      } else {
        imageSrc = item; // string path case
      }

      return (
        <div key={index} style={{ display: "inline", width: 40, height: 40 }}>
          <img src={imageSrc} style={{ width: 30, height: 30 }} />
        </div>
      );
    });
  };

  const fetchAllCategory = async () => {
    var res = await getData("category/fetch_all_category");
    setcategoryList(res.data);
  };
  const fetchAllfood = async (categoryid) => {
    var res = await getData("pictures/fetch_fooditem/" + categoryid);
    setfoodlist(res.data);
  };

  const handleCategoryChange = (e) => {
    setcategoryId(e.target.value);
    fetchAllfood(e.target.value);
  };


  const [error, setError] = useState({ fileError: null })
  const handleError = (label, message) => {

    setError((prev) => ({ ...prev, [label]: message }))

  }


  const validation = () => {
    var isError = false
    if (categoryId.length == 0) {
      setError((prev) => ({ ...prev, categoryId: 'Pls Input CategoryId...' }))
      isError = true
    }
    if (foodId.length == 0) {
      setError((prev) => ({ ...prev, foodId: "Pls Input FoodId..." }));
      isError = true;
    }

    if (picture.length == 0) {
      setError((prev) => ({ ...prev, 'fileError': 'Pls Upload Picture...' }))
      isError = true
    }

    return isError
  }



  useEffect(function () {
    fetchAllCategory();
  }, []);
  const fillcategory = () => {
    return categoryList?.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fillfooditem = () => {
    return foodList?.map((item) => {
      return <MenuItem value={item.fooditemid}>{item.fooditemname}</MenuItem>;
    });
  };
 const clearValues = () => {
    // alert('rfghfg')
   setpicture([burger]);
  }
  const handleClick = async () => {
    var err = validation()
    if (err == false) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("fooditemid", foodId)
      picture.map((item, i) => {
        formData.append(`f${i}`, item)
      })
      formData.append("createddate", getDate());
      formData.append("createdtime", getTime());
      formData.append("userid", 'xxxxx');

      //var body={categoryid:categoryIcon,categoryname:categoryName}
      var response = await postData('pictures/submit_picture', formData)
      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });


      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
      }
    }

  };

  const handleChange = (e) => {
    setpicture(Object.values(e.target.files))
    setError((prev) => ({ ...prev, 'fileError': null }))
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>Picture Upload For Fooditems</div>
              </div>
            </div>
          </Grid>
          <Grid size={6} className={classes.fields}>
            <div style={{ padding: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={(error?.categoryId)}
                error={error?.categoryId}
                onFocus={() => handleError("categoryId", null)}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem>-Select Category-</MenuItem>
                  {fillcategory()}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid size={6} className={classes.fields}>
            <div style={{ padding: "5px" }}>
              <FormControl
                size="small"
                fullWidth
                helperText={Boolean(error?.foodId)}
                error={error?.foodId}
                onFocus={() => handleError("foodId", null)}
              >
                <InputLabel>Food Item</InputLabel>
                <Select
                  label="Food Item"
                  onChange={(e) => setfoodId(e.target.value)}
                >
                  <MenuItem value=''>-Select Food Item-</MenuItem>
                  {fillfooditem()}
                </Select>
              </FormControl>
            </div>
          </Grid>

          {/* <Grid size={4}>
                <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                    onChange={(e) => setBranchId(e.target.value)}
                    label="Branch Name"
                    fullWidth
                    size="small"
                    value={branchName}
                    />
                </div>
            </Grid> */}

          <Grid
            size={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: 'flex', flexDirection: "row", padding: "0px 5px 0px 5px" }}>
              {showPictureList()}
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
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <IconButton
                component="label"
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CloudUploadIcon style={{ fontSize: 34 }} />
                <div style={{ fontSize: 12 }}>Upload</div>
                <input onChange={handleChange} type="file" hidden multiple />
              </IconButton>
            </div>
          </Grid>

          <Grid size={2}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <IconButton
                onClick={handleClick}
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SaveIcon style={{ fontSize: 34 }} />
                <div style={{ fontSize: 12 }}>Save</div>
              </IconButton>
            </div>
          </Grid>
          <Grid size={2}>
              <div style={{ width: '100%', padding: 5, boxSizing: 'border-box', }}>
                          <IconButton onClick={clearValues} style={{ justifyContent: 'center',component:'label' ,color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column" }}>
            
                            <DeleteForeverIcon onclick={clearValues} style={{ fontSize: 35 }} />
                            <div style={{ fontSize: 14 }}>Clear</div>
                          </IconButton>
                        </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
