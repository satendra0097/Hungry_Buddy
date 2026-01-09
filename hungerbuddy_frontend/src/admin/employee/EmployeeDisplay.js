import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import {
  getDate,
  getTime,
  getData,
  postData,
  serverURL,
} from "../../services/FatchNodeServices";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import burger from "../../assets/burger.png";
import EditIconComponent from "../../components/EditiconComponent";
import student from "../../assets/student.png";

import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
import CloseIcon from "@mui/icons-material/Close";
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

export default function EmployeeDisplay({ refresh, setRefresh }) {
  const classes = useStyle();
  var navigate = useNavigate("");

  const [open, setOpen] = useState(false);
  /*********** */
  const [branchId, setBranchId] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeid] = useState("")
  const [gender, setGender] = useState("");
  const [emailid, setEmailid] = useState("");
  const [mobileNo, setMobileno] = useState("");
  const [otherNo, setOtherno] = useState("");
  const [Department, setDepartment] = useState("");
  const [currentAddress, setCurrentaddress] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [Aadhaar, setAadhaar] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [permanentadress, setPermanentAddress] = useState("");
  const [permanentcity, setPermanentCity] = useState("");
  const [permanentstate, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [picture, setPicture] = useState({
    bytes: "",
    fileName: burger,
  });
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [tempImage, setTempImage] = useState("");
  const [dialogState, setDialogState] = useState("");
  const [permanentcityList, setPermanentCityList] = useState([]);
  const [permanentStateList, setPermanentStateList] = useState([]);
  const [branchIdList, setBranchIdList] = useState([]);
  const [statusButton, setStatusButton] = useState(false);
  const [dob, setdob] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState({});
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  useEffect(function () {
    fetchAllBranch();
    fetchAllEmployee();
  }, []);
  
      const fetchAllBranch = async () => {
          var res = await getData('student/branch_id_fill');
          setBranchIdList(res.data);
      }

  const fetchAllEmployee = async () => {
    let res = await getData("employee/fetch_all_employee ");
    console.log("Categories from backend:", res.data);
    setEmployeeList(res.data);
  };

  const fillBranch = () => {
    return branchIdList?.map((item) => (
      <MenuItem key={item.branchid} value={item.branchid}>
        {item.branchname}
      </MenuItem>
    ));
  };

  const fetchAllState = async () => {
    var res = await getData("statecity/fetch_states");
    setStateList(res.data);
  };

 const fetchAllCity = async (sid) => {
        var res = await postData('statecity/fetch_cities', { sid })
        setCityList(res.data)
    }

    const handleStatechange = (e) => {
        setCurrentState(e.target.value)
        fetchAllCity(e.target.value)
    }

  useEffect(function () {
    fetchAllState();
  }, []);

  const fillStates = () => {
    return stateList?.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>;
    });
  };

  const fillCities = () => {
    return cityList?.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };

  /*******state*************************************************************/
  const fetchAllPState = async () => {
    var res = await getData("statecity/fetch_states");
    setPermanentStateList(res.data);
  };

  const fetchAllPCity = async (sid) => {
    var res = await postData("statecity/fetch_cities", { stateid: sid });
    setPermanentCityList(res.data);
  };

  const handlePStatechange = (e) => {
    setPermanentState(e.target.value);
    fetchAllPCity(e.target.value);
  };

  useEffect(function () {
    fetchAllPState();
  }, []);

  const fillPStates = () => {
    return permanentStateList?.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>;
    });
  };

  const fillPCities = () => {
    return permanentcityList?.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };

  const handleBranchChange = (e) => {
    setBranchId(e.target.value);
  };

  const handleChange = (e) => {
    setPicture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setError((prev) => ({ ...prev, fileError: null }));
  };

  const clearValues = () => {
    // alert('rfghfg')
    setEmployeeName("");

  };
  const validation = () => {
    var isError = false;

    if (EmployeeName.length == 0) {
      setError((prev) => ({
        ...prev,
        EmployeeName: "Pls input Student Name..",
      }));
      isError = true;
    }
    if (branchId.length == 0) {
      setError((prev) => ({ ...prev, branchId: "Pls input BranchId.." }));
      isError = true;
    }

    return isError;
  };
  const handleClick = async () => {
    var formData = new FormData();

    formData.append("branchid", branchId);
    formData.append("employeeid", employeeId);
    formData.append("employeename", EmployeeName);
    formData.append("dob", dob);
    formData.append("gender", gender);

    formData.append("mobileno", mobileNo);
    formData.append("otherno", otherNo);
    formData.append("department", Department);
    formData.append("current_address", currentAddress);
    formData.append("current_state", currentState);
    formData.append("current_city", currentCity);
    formData.append("current_pincode", currentPincode);
    formData.append("emailid", emailid);
    formData.append("permanentcity", permanentcity);
    formData.append("permanentaddress", permanentadress);
    formData.append("permanentstate", permanentstate);
    formData.append("permanentpincode", permanentPincode);
    formData.append("aadhaar", Aadhaar);
    formData.append("picture", picture.bytes);

    var response = await postData("employee/edit_employee", formData);
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
      fetchAllEmployee();
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
    // setRefresh(!refresh);
  };

  const showPictureInterface = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.titleStyle}>HungerBuddy</div>
                <div className={classes.subTitleStyle}>New Employee</div>
              </div>
              <div style={{ margin: "auto" }}>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon style={{ color: "#fff" }} />
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
                Picture
                <input onChange={handleChange} type="file" hidden />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const showEmployee = () => {
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div className={classes.heading}>
                <div className={classes.subTitleStyle}>Add New Employee</div>
                <IconButton onClick={handleCloseDialog} style={{ display: 'flex', width: 'auto', marginLeft: 'auto', marginRight: 10, paddingTop: 5, }}>
                              <CloseIcon style={{ color: '#8e44ad' }} />
                            </IconButton>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Branch Name</InputLabel>
                  <Select
                    label="Branch Name"
                    value={branchId}
                    onChange={handleBranchChange}
                  >
                    <MenuItem>-Branch Name-</MenuItem>
                    {fillBranch()}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="employee Name"
                  onChange={(e) => setEmployeeName(e.target.value)}
                  helperText={error?.setEmployeeName}
                  error={error?.setEmployeeName}
                  onFocus={() => handleError("setEmployeeName", null)}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setdob(e.target.value)}
                  helperText={error?.setdob}
                  error={error?.dob}
                  onFocus={() => handleError("dob", null)}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <RadioGroup
                  value={gender}
                  row
                  onChange={(event) => setGender(event.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Aadhaar Number"
                  onChange={(e) => setAadhaar(e.target.value)}
                  helperText={error?.setsetAadhaar}
                  error={error?.setAadhaar}
                  onFocus={() => handleError("Aadhaar", "")}
                  value={Aadhaar}
                ></TextField>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    value={Department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Emailid"
                  onChange={(e) => setEmailid(e.target.value)}
                  helperText={error?.setEmailid}
                  error={error?.setEmailid}
                  onFocus={() => handleError("emailid", "")}
                  value={emailid}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Mobile No"
                  onChange={(e) => setMobileno(e.target.value)}
                  helperText={error?.setMobileno}
                  error={error?.setMobileno}
                  onFocus={() => handleError("mobileNo", "")}
                  value={mobileNo}
                ></TextField>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="other No"
                  onChange={(e) => setOtherno(e.target.value)}
                  helperText={error?.setOtherno}
                  error={error?.setOtherno}
                  onFocus={() => handleError("setOtherno", "")}
                  value={otherNo}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Current Address"
                  onChange={(e) => setCurrentaddress(e.target.value)}
                  helperText={error?.setCurrentaddress}
                  error={error?.setCurrentaddress}
                  onFocus={() => handleError("currentAddress", "")}
                  value={currentAddress}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ paddingLeft: "5px" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Current State</InputLabel>
                  <Select
                    label="Currrent State"
                    value={currentState}
                    onChange={handleStatechange}
                  >
                    <MenuItem>-Select Current State-</MenuItem>
                    {fillStates()}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ paddingLeft: "5px" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Current City</InputLabel>
                  <Select
                    label="Currrent State"
                    value={currentCity}
                    onChange={(e) => {
                      setCurrentCity(e.target.value);
                    }}
                  >
                    <MenuItem>-Select Current City-</MenuItem>
                    {fillCities()}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Current Pincode"
                  onChange={(e) => setCurrentPincode(e.target.value)}
                  helperText={error?.setCurrentPincode}
                  error={error?.setCurrentPincode}
                  onFocus={() => handleError("currentPincode", "")}
                  value={currentPincode}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Permanent Address"
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  helperText={error?.setPermanentAddress}
                  error={error?.setPermanentAddress}
                  onFocus={() => handleError("permanentadress", "")}
                  value={permanentadress}
                ></TextField>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ paddingLeft: "5px" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Permanent State</InputLabel>
                  <Select
                    label="Currrent State"
                    value={permanentstate}
                    onChange={handlePStatechange}
                  >
                    <MenuItem>-Select Permanent State-</MenuItem>
                    {fillPStates()}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid size={6}>
              <div style={{ paddingLeft: "5px" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Permanent City</InputLabel>
                  <Select
                    label="Currrent State"
                    value={permanentcity}
                    onChange={(e) => {
                      setPermanentCity(e.target.value);
                    }}
                  >
                    <MenuItem>-Select Permanent City-</MenuItem>
                    {fillPCities()}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid size={6}>
              <div style={{ padding: "0px 5px 0px 5px" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Permanent Pincode"
                  onChange={(e) => setPermanentPincode(e.target.value)}
                  helperText={error?.setPermanentPincode}
                  error={error?.setPermanentPincode}
                  onFocus={() => handleError("permanentPincode", "")}
                  value={permanentPincode}
                ></TextField>
              </div>
            </Grid>

            <Grid size={1}>
              <div
                style={{ width: "100%", padding: 5, boxSizing: "border-box" }}
              >
                <IconButton
                  onClick={handleClick}
                  style={{
                    color: "hsla(321, 32%, 37%, 1.00)",
                    flexDirection: "column",
                  }}
                >
                  <SaveIcon style={{ fontSize: 35, marginRight: "50%" }} />
                  <div style={{ fontSize: 14, marginRight: "70%" }}>Save</div>
                </IconButton>
              </div>
            </Grid>

            <Grid size={1}>
              <div
                style={{ width: "100%", padding: 5, boxSizing: "border-box" }}
              >
                <IconButton
                  onClick={clearValues}
                  style={{
                    justifyContent: "center",
                    component: "label",
                    color: "hsla(321, 32%, 37%, 1.00)",
                    flexDirection: "column",
                  }}
                >
                  <DeleteForeverIcon
                    onclick={clearValues}
                    style={{ fontSize: 35 }}
                  />
                  <div style={{ fontSize: 14 }}>Clear</div>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  /************ */


  const handleCancel = () => {
    setPicture({ fileName: tempImage, bytes: "" });
    setStatusButton(false);
  };
  const handleEditPicture = async () => {
    var formData = new FormData();

    formData.append("employeeid", employeeId);
    formData.append("picture", picture.bytes);

    var response = await postData("employee/edit_Picture", formData);

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
      fetchAllEmployee();
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
          onClick={handleEditPicture}
          style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
          variant="contained"
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    );
  };
  const handleOpenDialog = (rowData, status) => {
    setDialogState(status);

    setEmployeeid(rowData.employeeid);
    setBranchId(rowData.branchid);
    setEmployeeName(rowData.employeename);
    setdob(rowData.dob);
    setGender(rowData.gender);
    setMobileno(rowData.mobileno);
    setOtherno(rowData.otherno);
    setDepartment(rowData.department);
    setCurrentaddress(rowData.current_address);
    setCurrentState(rowData.current_state);
    setCurrentCity(rowData.current_city);
    setCurrentPincode(rowData.current_pincode);
    setEmailid(rowData.emailid);
    setPermanentCity(rowData.permanentcity);
    setPermanentAddress(rowData.permanentaddress);
    setPermanentState(rowData.permanentstate);
    setPermanentPincode(rowData.permanentpincode);
    setAadhaar(rowData.aadhaar);

    setPicture({
      fileName: `${serverURL}/images/${rowData.employeeicon}`,
      bytes: "",
    });
    setTempImage(`${serverURL}/images/${rowData.employeeicon}`);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent>
            {dialogState == "Data" ? showEmployee() : showPictureInterface()}
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  const handleDelete = async (cid) => {
    Swal.fire({
      title: "Do you want to delete the selected Employee?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var response = await postData("employee/delete_employee", { cid });
        Swal.fire(response.message);
        fetchAllEmployee();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const displayEmployee = () => {
    return (
      <MaterialTable
        style={{ width: "100%" }}
        title={`List of Employee`}
        columns={[
          { title: "Branch Id", field: "branchid" },
          { title: "Employee ID", field: "employeeid" },
          { title: "Name", field: "employeename" },
          { title: "Branch", field: "branchid" },
          { title: "Department", field: "department" },
          { title: "Gender", field: "gender" },
          { title: "Mobile", field: "mobileno" },
          { title: "Email", field: "emailid" },
          {
            title: "Image",
            render: (rowData) => (
              <div onClick={() => handleOpenDialog(rowData, "picture")}>
                <EditIconComponent image={rowData.picture} />
              </div>
            ),
          },
        ]}
        data={EmployeeList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpenDialog(rowData, "Data"),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => handleDelete(rowData, employeeId),
          },
          {
            icon: "add",
            tooltip: "Add Food item",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/employeeinterface"),
          },
        ]}
      />
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.box}>{displayEmployee()}</div>
      {showDialog()}
    </div>
  );
}