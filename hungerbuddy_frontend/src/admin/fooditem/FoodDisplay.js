import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import {
  getDate,
  getTime,
  getData,
  postData,
  serverURL,
} from "../../services/FatchNodeServices"
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import burger from "../../assets/burger.png";
import EditIconComponent from "../../components/EditiconComponent";
import CloseIcon from "@mui/icons-material/Close"
import {
  FormControl,
  Rating,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { use } from "react";
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: "70%",
    height: "auto",

    padding: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function FoodDisplay({ refresh, setRefresh }) {
  const classes = useStyle();
  var branch = JSON.parse(localStorage.getItem('Admin'))
  console.log("gfcjhgujh", branch);

  const [foodList, setFoodList] = useState([]);
  const [open, setOpen] = useState(false);
  /******************* */
  const navigate = useNavigate('')
  const [foodItemId, setFoodItemId] = useState("");
  const [Branchid, setBrancid] = useState("");
  const [dialogState, setDialogState] = useState("");
  const [Fooditemname, setFooditemname] = useState("");
  const [Fooditemtype, setFooditemtype] = useState("");
  const [Fooditemtaste, setFooditemtaste] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [Ingridients, setIngridients] = useState("");
  const [Fullprice, setFullprice] = useState("");
  const [Halfprice, setHalfprice] = useState([]);
  const [Offerprice, setOfferprice] = useState([]);
  const [Statuse, setStatuse] = useState("");
  const [Ratings, setRatings] = useState(0);
  const [statusButton, setStatusButton] = useState(false)
  const [picture, setPictures] = useState({
    bytes: "",
    fileName: burger,
  });

  const [Foodcategoryid, setFoodcategoryid] = useState("");
  const [CategoryList, setCategoryList] = useState([]);
  const [FoodItemList, setFoodItemList] = useState([]);



  useEffect(() => {
    fetchAllCategory();
    fetchAllFoodItem();
  }, []);

  const fetchAllCategory = async () => {
    let res = await getData("fooditem/fetch_all_category");
    console.log("Categories from backend:", res.data);
    setCategoryList(res.data);
  };


  const fetchAllFoodItem = async () => {
    let res = await getData("fooditem/fetch_all_fooditems");
    console.log("Categories from backend:", res.data);
    setFoodItemList(res.data);
  };

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
      var body = {
        "branchid": Branchid,
        "foodcategoryid": Foodcategoryid,
        "fooditemname": Fooditemname,
        "fooditemtype": Fooditemtype,
        "fooditemtaste": Fooditemtaste,
        "ingridients": Ingridients,
        "fullprice": Fullprice,
        "halfprice": Halfprice,
        "offerprice": Offerprice,
        "status": Statuse,
        "ratings": Ratings,
        "fooditemid": foodItemId,
        // "picture", Pictures.bytes);
      }
      var response = await postData("fooditem/editfood", body)
      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        fetchAllFoodItem()
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
  const showFoodPictureInterface = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.titleStyle}>HungerBuddy</div>
                <div className={classes.subTitleStyle}>Edit Picture</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon style={{ color: "#ffff" }} />
                </IconButton>
              </div>
            </div>
          </Grid>

          <Grid size={6}>
            <img
              src={picture.fileName}
              style={{ width: 100, borderRadius: 10 }}
            />
          </Grid>

          <Grid size={6} style={{ display: "flex", alignItems: "center" }}>
            {statusButton ? saveCancelButton() : <></>}
          </Grid>

          <Grid size={12}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <Button
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                variant="contained"
              >
                picture
                <input
                  onChange={handleEditFoodPicture}
                  type="file"
                  hidden
                  multiple
                />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };
  const showFoodInterface = () => {
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
            <Grid size={6}>
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
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  onChange={(e) => setFooditemname(e.target.value)}
                  label="Food Name"
                  value={Fooditemname}
                  fullWidth
                  helperText={error?.Fooditemname}
                  error={error?.Fooditemname}
                  onFocus={() => handleError("Fooditemname", null)}
                  size="small"
                />
              </div>
            </Grid>
            <Grid size={6}>
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
            <Grid size={6}>
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

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  onChange={(e) => setIngridients(e.target.value)}
                  label="Ingridients"
                  fullWidth
                  helperText={error?.branchname}
                  error={error?.branchname}
                  onFocus={() => handleError("branchname", null)}
                  size="small" value={Ingridients}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  onChange={(e) => setFullprice(e.target.value)}
                  label="Fullprice"
                  fullWidth
                  size="small"
                  value={Fullprice}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  onChange={(e) => setHalfprice(e.target.value)}
                  label="Halfprice"
                  fullWidth
                  size="small"
                  value={Halfprice}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  onChange={(e) => setOfferprice(e.target.value)}
                  label="Offer Price"

                  fullWidth
                  size="small"
                  value={Offerprice}
                />
              </div>
            </Grid>
            <Grid size={6}>
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
            <Grid size={2}>
              <Rating
                name="ratings"
                value={Ratings}
                onChange={(event, newValue) => setRatings(newValue)}

              />
            </Grid>



            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <Button
                  onClick={handleClick}
                  style={{ background: "hsla(321,32%,37%,1)" }}
                  fullWidth
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <Button
                  style={{ background: "hsla(321,32%,37%,1)" }}
                  fullWidth
                  variant="contained"
                >
                  Clear
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  /****************** */
  const fetchAllFoodItems = async () => {
    var response = await getData("fooditem/fetch_all_fooditems");
    setFoodItemList(response.data);
  };
  useEffect(function () {
    fetchAllFoodItems();
  }, []);

  const handleCancle = () => {
    setPictures({ fileName: tempImage, bytes: "" });
    setStatusButton(false);
  };

  const handleEditFoodPicture = async () => {
    var formData = new FormData();
    formData.append("fooditemid", foodItemId);
    formData.append("picture", picture.bytes);
    formData.append("createddate", getDate());
    formData.append("createdtime", getTime());
    formData.append("rating", "xxxxxx");

    var response = await postData("fooditems/edit_picture", formData);
    if (response.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      setOpen(false);
      fetchAllFoodItems();
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
  };

  const saveCancelButton = () => {
    return (
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleEditFoodPicture}
          style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
          variant="contained"
        >
          Save
        </Button>
        <Button
          onClick={handleCancle}
          style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    );
  };
  //fooditemid, branchid, foodcategoryid, fooditemname, fooditemtype, ingridients, fullprice, halfprice, status, rating, picture, fooditemtaste, offerprice
  const handleOpenDialog = (rowData, state) => {
    setDialogState(state);
    setFoodItemId(rowData.fooditemid);
    setBrancid(rowData.branchid);
    setFooditemtype(rowData.fooditemtype);
    setFooditemtaste(rowData.fooditemtaste);
    setIngridients(rowData.ingridients);
    setFullprice(rowData.fullprice);
    setHalfprice(rowData.halfprice);
    setOfferprice(rowData.offerprice);
    setStatuse(rowData.status);
    setRatings(rowData.ratings);
    setFooditemname(rowData.fooditemname)
    setFoodcategoryid(rowData.foodcategoryid)
    setPictures({
      fileName: `${serverURL}/images/${rowData.Picture}`,
      bytes: "",
    });
    setTempImage(`${serverURL}/images/${rowData.Picture}`);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent>{dialogState == "Data"
            ? showFoodInterface()
            : showFoodPictureInterface()}</DialogContent>
        </Dialog>
      </div>
    );
  };
  const handleDelete = async (fooditemid) => {
    Swal.fire({
      title: "Do you want to delete the selected food item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await postData("fooditem/delete_fooditem", {
          fooditemid,
        });
        Swal.fire(response.message);
        fetchAllFoodItem();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };


  const displayFoodItem = () => {
    return (
      <MaterialTable
        title={`List of FoodItems ${branch?.branchname}`}
        columns={[
          // { title: "Branch Id", field: "branchid" },
          { title: "Category", field: "foodcategoryid" },
          { title: "Food Name", render: (rowData) => (<div>{rowData.fooditemname}({rowData.fooditemtype})</div>) },

          { title: "Full/Half", render: (rowData) => (<div> &#8377;{rowData.fullprice}/&#8377;{rowData.halfprice}</div>) },

          { title: "OfferPrice", render: (rowData) => (<div> &#8377;{rowData.offerprice}</div>) },
          { title: "Status", field: "status" },
          { title: "Rating", field: "rating" },


          {
            title: "Images",
            render: (rowData) => (
              <div onClick={() => handleOpenDialog(rowData, "Picture")}>
                <EditIconComponent image={rowData.picture} />
              </div>
            ),
          },
        ]}
        data={FoodItemList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpenDialog(rowData, "Data"),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => handleDelete(rowData, foodItemId),
          },

          {
            icon: 'add',
            tooltip: 'Add Food item',
            isFreeAction: true,
            onClick: (event, rowData) => navigate('/branchdashboard/fooditem')

          }


        ]}
      />
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>{displayFoodItem()}</div>
      {showDialog()}
    </div>
  );
}
