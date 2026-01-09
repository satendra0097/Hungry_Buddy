import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import {
  getData,
  postData,
  getDate,
  getTime,
} from "../../services/FatchNodeServices";
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { use } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import employee from "./assets/employee.png"
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import burger from "../../assets/burger.png";
import FormLabel from "@mui/material/FormLabel";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    width: "80%",
    height: "auto",
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    margin: 10,
    borderRadius: 5,
    paddingBottom: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 57%, 65%, 1.00) 100%)",
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
    marginLeft: 10,
    marginBottom: 5,
  },
}));

export default function EmployeeInterface() {
  var classes = useStyle();
  // const [sectionId, setSectionId] = useState('');

  const [branchId, setBranchId] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");
  const [Department, setDepartment] = useState("")
  const [gender, setGender] = useState("");
  const [emailid, setEmailid] = useState("");
  const [mobileNo, setMobileno] = useState("");
  const [otherNo, setOtherno] = useState("");
  const [Statuse, setStudtus] = useState("");
  const [currentAddress, setCurrentaddress] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [Aadhaar, setAadhaar] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [permanentadress, setPermanentAddress] = useState("");
  const [permanentcity, setPermanentCity] = useState("");
  const [permanentstate, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  // const [employeeIcon, setEmployeeIcon] = useState({
  //   bytes: "",
  //   filename: employee,
  // });
   const [picture, setPicture] = useState({
       bytes: "",
       fileName: burger,
     });
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [permanentcityList, setPermanentCityList] = useState([]);
  const [permanentStateList, setPermanentStateList] = useState([]);

  const [branchIdList, setBranchIdList] = useState([]);

  const [dob, setdob] = useState([]);



  const [error, setError] = useState({});
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const fetchAllBranch = async () => {
    var res = await getData('student/branch_id_fill');
    setBranchIdList(res.data);
  }
  useEffect(function () {
    fetchAllBranch();
  }, []);

  const fillbranch = () => {
    return branchIdList.map((item) => {
      return (
        <MenuItem value={item.branchid}>{item.branchname}</MenuItem>
      )
    })
  }


  const fetchAllState = async () => {
    var res = await getData('statecity/fetch_states')
    setStateList(res.data)
  }

  const fetchAllCity = async (sid) => {
    var res = await postData('statecity/fetch_cities', { sid })
    setCityList(res.data)
  }



  const handleStatechange = (e) => {
    setCurrentState(e.target.value)
    fetchAllCity(e.target.value)
  }

  useEffect(function () {
    fetchAllState()
    fetchAllPState()
  }, [])

  const fillStates = () => {
    return stateList.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    })
  }


  const fillCities = () => {
    return cityList.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    })
  }
  const fillPStates = () => {
    return permanentStateList.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    })
  }


  const fillPCities = () => {
    return permanentcityList.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    })
  }
  const fetchAllPState = async () => {
    var res = await getData('statecity/fetch_states')
    setPermanentStateList(res.data)
  }

  const fetchAllPCity = async (sid) => {
    var res = await postData('statecity/fetch_cities', { sid })
    setPermanentCityList(res.data)
  }

  const handlePStatechange = (e) => {
    setPermanentState(e.target.value)
    fetchAllPCity(e.target.value)
  }

  const handleBranchChange = (e) => {
    setBranchId(e.target.value);

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
        EmployeeName: "Pls input Employee Name..",
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
    // alert('hhhh')
    var formData = new FormData();
    formData.append("branchid", branchId);
    formData.append("employeename", EmployeeName);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("mobileno", mobileNo);
    formData.append("otherno", otherNo);
    formData.append("current_address", currentAddress);
    formData.append("current_state", currentState);
    formData.append("current_city", currentCity);
    formData.append("current_pincode", currentPincode);
    formData.append("department", Department);
    formData.append("emailid", emailid);
    formData.append("permanentcity", permanentcity);
    formData.append("permanentaddress", permanentadress);
    formData.append("permanentstate", permanentstate);
    formData.append("permanentpincode", permanentPincode);
    formData.append("aadhaar", Aadhaar);
    formData.append("picture", picture.bytes);
    // formData.append("employeeicon", employeeIcon.bytes);

    var response = await postData("employee/submit_employees", formData);
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

   const handleChange = (e) => {
    setPicture({
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
              <div className={classes.subTitleStyle}>Add New Employee</div>
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
                  {fillbranch()}
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
              <RadioGroup value={gender}
                row
                onChange={(event) => setGender(event.target.value)}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male" />

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
              <FormControl size="small" fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Status"
                  value={Department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                  <MenuItem value="Sales">Seles</MenuItem>
                  <MenuItem value="Sales">Delivery</MenuItem>
                  <MenuItem value="Sales">A</MenuItem>
                  <MenuItem value="Sales">B</MenuItem>
                  <MenuItem value="Sales">C</MenuItem>

                </Select>
              </FormControl>
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

          <Grid
            size={1.5}
            style={{
              justifyContent: "center",
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "0px 5px 0px 5px",marginRight:'29px' }}>
              <img src={picture.fileName} style={{ width: 40 }} />
            </div>

            <div
              style={{
                color: "#d32f2f",
                fontFamily: "Roboto,Helvetica, Arial,sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: "1.66rem",
              }}
            >
              {error.fileError == null ? "" : error.fileError}
            </div>
          </Grid>

          <Grid size={1}>
            <div style={{ width: "100%", padding: "5px" }}>
              <IconButton
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)",
                  display: "flex",
                  flexDirection: "column",
                  component: "label",
                }}
              >
                <CloudUploadIcon style={{ fontSize: 35, marginRight: "50%" }} />
                <div style={{ fontSize: 17, marginRight: "50%" }}>
                  Employee Icon
                </div>

                <input onChange={handleChange} type="file" hidden multiple />
              </IconButton>
            </div>
          </Grid>

          <Grid size={1}>
            <div style={{ width: "100%", padding: 5, boxSizing: "border-box" }}>
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
            <div style={{ width: "100%", padding: 5, boxSizing: "border-box" }}>
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
}