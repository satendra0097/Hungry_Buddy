import { makeStyles } from "@mui/styles";
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Select,
  Dialog,
  DialogContent,
  MenuItem,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MaterialTable from "@material-table/core";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { getData, postData, getDate, getTime } from "../../services/FatchNodeServices";
import student from "../../assets/student.png";

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    height: '100%',

  },
  box: {
    width: '80%',
    height: 'auto',
    border: '0.7px solid hsla(321, 41%, 24%, 1)',
    margin: 10,
    borderRadius: 5,
    paddingBottom: 10,
    
  },
  heading: {
    width: '100%',
    height: 'auto',
    background: "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 57%, 65%, 1.00) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: '#fff',
    padding: 5,
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '30%',
    marginLeft: 10,
    marginBottom: 5,
  }
}))



export default function StudentInterface() {
  const classes = useStyle();
 var navigate = useNavigate("");
  const [open, setOpen] = useState(false);
  const [studentList, setStudentList] = useState([]);

  //********************************************************************************************************************
   const [batchId, setBatchId] = useState('');
      const [branchId, setBranchId] = useState('');
      const [studentName, setStudentName] = useState('');
      const [fatherName, setFatherName] = useState('');
      const [motherName, setMotherName] = useState('');
      const [gender, setGender] = useState('');
      const [emailid, setEmailid] = useState('');
      const [mobileNo, setMobileno] = useState('');
      const [fathercontactNo, setFathercontactNo] = useState('');
      const [mothercontactNo, setMothercontactNo] = useState('');
      const [currentAddress, setCurrentaddress] = useState('');
      const [currentState, setCurrentState] = useState('');
  
      const [currentCity, setCurrentCity] = useState('');
      const [currentPincode, setCurrentPincode] = useState('');
      const [permanentadress, setPermanentAddress] = useState('');
      const [permanentcity, setPermanentCity] = useState('');
      const [permanentstate, setPermanentState] = useState('');
      const [permanentPincode, setPermanentPincode] = useState('');
      const [studentIcon, setStudentIcon] = useState({ bytes: '', filename: student });
      const [stateList, setStateList] = useState([]);
      const [cityList, setCityList] = useState([]);
  
      const [permanentcityList, setPermanentCityList] = useState([]);
      const [permanentStateList, setPermanentStateList] = useState([]);
      const [batchIdList, setBatchIdList] = useState([]);
      const [branchIdList, setBranchIdList] = useState([]);
      const [sectionList, setSectionIdList] = useState([]);
      const [dob, setdob] = useState([])
  
      const [sectionName, setSectionName] = useState('');
      const [enrollmentNo, setEnrollmentNo] = useState('');
      const [sectionid, setSectionId] = useState('');
      const [createddate, setCreateddate] = useState(getDate());
      const [createdtime, setCreatedtime] = useState(getTime());
      const [userid, setuserid] = useState('');
      const [error, setError] = useState({})
      const handleError = (label, message) => {
          setError((prev) => ({ ...prev, [label]: message }));
      }
  
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
  
  
      const fetchAllBatch = async (bid) => {
          var res = await postData('student/batch_id_fill', { branchid: bid });
          setBatchIdList(res.data);
      }
      const fillbatch = () => {
          return batchIdList.map((item) => {
              return (
                  <MenuItem value={item.batchid}>{item.batchname}</MenuItem>
              )
          })
      }
  
      const fetchAllSection = async (bid) => {
          var res = await postData('student/section_id_fill', { branchid: bid });
          setSectionIdList(res.data);
      }
      const fillsection = () => {
          return sectionList.map((item) => {
              return (
                  <MenuItem value={item.sectionid}>{item.sectionname}</MenuItem>
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
          fetchAllBatch(e.target.value);
          fetchAllSection(e.target.value);
      }
  
  
      const handelChange = (e) => {
          setStudentIcon({
              bytes: e.target.files[0],
              filename: URL.createObjectURL(e.target.files[0])
          });
  
      };
  
  
      const clearValues = () => {
          // alert('rfghfg')
          setStudentName('')
          setStudentIcon({ bytes: '', filename: student });
      }
      const validation = () => {
          var isError = false
          if (enrollmentNo.length == 0) {
              setError((prev) => ({ ...prev, 'enrollmentNo': 'Pls input Student Name..' }));
              isError = true;
          }
          if (studentName.length == 0) {
              setError((prev) => ({ ...prev, 'studentName': 'Pls input Student Name..' }));
              isError = true;
          }
          if (branchId.length == 0) {
              setError((prev) => ({ ...prev, 'branchId': 'Pls input BranchId..' }));
              isError = true;
          }
          if (batchId.length == 0) {
              setError((prev) => ({ ...prev, 'batchId': 'Pls input Batch Id..' }));
              isError = true;
          }
          return isError;
      }
      const handleClick = async () => {
  
  
          var formData = new FormData();
          formData.append("enrollmentno", enrollmentNo);
          formData.append("branchid", branchId);
          formData.append("batchid", batchId);
          formData.append("sectionid", sectionid);
          formData.append("studentname", studentName);
          formData.append("dob", dob);
          formData.append("gender", gender);
          formData.append("fathername", fatherName);
          formData.append("mothername", motherName);
          formData.append("mobileno", mobileNo);
          formData.append("fathercontactno", fathercontactNo);
          formData.append("mothercontactno", mothercontactNo);
          formData.append("current_address", currentAddress);
          formData.append("current_state", currentState);
          formData.append("current_city", currentCity);
          formData.append("current_pincode", currentPincode);
          formData.append("emailid", emailid);
          formData.append("permanent_state", permanentstate);
          formData.append("permanent_city", permanentcity);
          formData.append("permanentaddress", permanentadress);
          formData.append("permanent_pincode", permanentPincode);
          formData.append("createddate", createddate);
          formData.append("createdtime", createdtime);
          formData.append("userid", 'xxxx');
  
  
          var response = await postData('student/submit_students', formData);
          if (response.status) {
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 3000,
                  toast: true,
              });
          }
          else {
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
      }
      const clearValue = () => {
          setSectionName('');
          setBatchId('');
          setBranchId('');
          setSectionId('');
      }
  const showStudentInterface=()=>{
      return (
          <div className={classes.root}>
              <div className={classes.box}>
                  <Grid container spacing={1}>
                      <Grid size={12}>
                          <div className={classes.heading}>
                              <div className={classes.subTitleStyle}>
                                  Add New Student
                              </div>
                              <IconButton onClick={handleCloseDialog} style={{ display: 'flex', width: 'auto', marginLeft: 'auto', marginRight: 10, paddingTop: 5, }}>
                                            <CloseIcon style={{ color: '#8e44ad' }} />
                                          </IconButton>
                          </div>
                      </Grid>

                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <FormControl fullWidth size="small">
                                  <InputLabel>Branch Name</InputLabel>
                                  <Select label="Branch Name" value={branchId} onChange={handleBranchChange} >
                                      <MenuItem>-Branch Name-</MenuItem>
                                      {fillbranch()}
                                  </Select>
                              </FormControl>
                          </div>
                      </Grid>
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <FormControl fullWidth size="small">
                                  <InputLabel>Batch Name</InputLabel>
                                  <Select label="Batch Name" value={batchId} onChange={(e) => setBatchId(e.target.value)}  >
                                      <MenuItem>-Batch Name-</MenuItem>
                                      {fillbatch()}
                                  </Select>
                              </FormControl>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <FormControl fullWidth size="small">
                                  <InputLabel>Section Name</InputLabel>
                                  <Select label="Section Name" value={sectionid} onChange={(e) => setSectionId(e.target.value)}  >
                                      <MenuItem>-Section Name-</MenuItem>
                                      {fillsection()}
                                  </Select>
                              </FormControl>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Enrollment No" onChange={(e) => setEnrollmentNo(e.target.value)} helperText={error?.enrollmentNo} error={error?.enrollmentNo}
                                  onFocus={() => handleError('enrollmentNo', null)} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Student Name" onChange={(e) => setStudentName(e.target.value)} helperText={error?.setStudentName} error={error?.studentName}
                                  onFocus={() => handleError('studentName', null)} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} onChange={(e) => setdob(e.target.value)} helperText={error?.setdob} error={error?.dob}
                                  onFocus={() => handleError('dob', null)} ></TextField>
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
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Father Name" onChange={(e) => setFatherName(e.target.value)} helperText={error?.setFatherName} error={error?.setFatherName} onFocus={() => handleError('fatherName', '')} value={fatherName} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Mother Name" onChange={(e) => setMotherName(e.target.value)} helperText={error?.setMotherName} error={error?.setMotherName} onFocus={() => handleError('motherName', '')} value={motherName} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Emailid" onChange={(e) => setEmailid(e.target.value)} helperText={error?.setEmailid} error={error?.setEmailid} onFocus={() => handleError('emailid', '')} value={emailid} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Mobile No" onChange={(e) => setMobileno(e.target.value)} helperText={error?.setMobileno} error={error?.setMobileno} onFocus={() => handleError('mobileNo', '')} value={mobileNo} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Father Contact No" onChange={(e) => setFathercontactNo(e.target.value)} helperText={error?.setFathercontactNo} error={error?.setFatherrcontactNo} onFocus={() => handleError('fathercontactNo', '')} value={fathercontactNo} ></TextField>
                          </div>
                      </Grid>
  
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Mother Contact No" onChange={(e) => setMothercontactNo(e.target.value)} helperText={error?.setMothercontactNo} error={error?.setMothercontactNo} onFocus={() => handleError('mothercontactNo', '')} value={mothercontactNo} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Current Address" onChange={(e) => setCurrentaddress(e.target.value)} helperText={error?.setCurrentaddress} error={error?.setCurrentaddress} onFocus={() => handleError('currentAddress', '')} value={currentAddress} ></TextField>
                          </div>
                      </Grid>
  
  
  
  
                      <Grid size={6}>
                          <div style={{ paddingLeft: "5px" }}>
                              <FormControl size="small" fullWidth>
                                  <InputLabel>Current State</InputLabel>
                                  <Select
                                      label="Currrent State"
                                      value={currentState}
                                      onChange={handleStatechange}>
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
                                      onChange={(e) => { setCurrentCity(e.target.value) }}>
                                      <MenuItem>-Select Current City-</MenuItem>
                                      {fillCities()}
                                  </Select>
                              </FormControl>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Current Pincode" onChange={(e) => setCurrentPincode(e.target.value)} helperText={error?.setCurrentPincode} error={error?.setCurrentPincode} onFocus={() => handleError('currentPincode', '')} value={currentPincode} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Permanent Address" onChange={(e) => setPermanentAddress(e.target.value)} helperText={error?.setPermanentAddress} error={error?.setPermanentAddress} onFocus={() => handleError('permanentadress', '')} value={permanentadress} ></TextField>
                          </div>
                      </Grid>
  
                      <Grid size={6}>
                          <div style={{ paddingLeft: "5px" }}>
                              <FormControl size="small" fullWidth>
                                  <InputLabel>Permanent State</InputLabel>
                                  <Select
                                      label="Currrent State"
                                      value={permanentstate}
                                      onChange={handlePStatechange}>
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
                                      onChange={(e) => { setPermanentCity(e.target.value) }}>
                                      <MenuItem>-Select Permanent City-</MenuItem>
                                      {fillPCities()}
                                  </Select>
                              </FormControl>
                          </div>
                      </Grid>
                      <Grid size={6}>
                          <div style={{ padding: '0px 5px 0px 5px' }}>
                              <TextField fullWidth size="small" label="Permanent Pincode" onChange={(e) => setPermanentPincode(e.target.value)} helperText={error?.setPermanentPincode} error={error?.setPermanentPincode} onFocus={() => handleError('permanentPincode', '')} value={permanentPincode} ></TextField>
                          </div>
                      </Grid>
                      <Grid size={1.5} style={{ justifyContent: 'center', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                          <img src={studentIcon.filename} style={{ width: 70, margin: '10px', marginBottom: '50%' }} />
  
                          <div style={{ color: '#d32f2f', fontFamily: "Roboto,Helvetica, Arial,sans-serif", fontWeight: 400, fontSize: '0.75rem', lineHeight: "1.66rem" }}>{error.fileError == null ? '' : error.fileError}</div>
                      </Grid>
  
  
                      <Grid size={1}>
                          <div style={{ width: '100%', padding: '5px' }}>
                              <IconButton endIcon={<CloudUploadIcon />}
                                  fullWidth component='label'
                                  style={{
                                      color: "hsla(321, 32%, 37%, 1.00)"
                                      , display: 'flex', flexDirection: "column", component: 'label'
                                  }}>
                                  <CloudUploadIcon style={{ fontSize: 35, marginRight: '50%' }} />
                                  <div style={{ fontSize: 17, marginRight: '50%' }}>Student Icon</div>
  
                                  <input onChange={handelChange} type="file" hidden multiple />
                              </IconButton>
                          </div >
                      </Grid>
  
  
  
                      <Grid size={1}>
  
                          <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
                              <IconButton onClick={handleClick} style={{ color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column" }} >
                                  <SaveIcon style={{ fontSize: 35, marginRight: '50%' }} />
                                  <div style={{ fontSize: 14, marginRight: '70%' }}>Save</div>
                              </IconButton>
                          </div>
                      </Grid>
  
                      <Grid size={1}>
                          <div style={{ width: '100%', padding: 5, boxSizing: 'border-box', }}>
                              <IconButton onClick={clearValues} style={{ justifyContent: 'center', component: 'label', color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column" }}>
  
                                  <DeleteForeverIcon onclick={clearValues} style={{ fontSize: 35 }} />
                                  <div style={{ fontSize: 14 }}>Clear</div>
                              </IconButton>
                          </div>
                      </Grid>
  
  
                  </Grid>
              </div>
          </div>
      )
  }
//***************************************************************************************************************************** */
  const fetchAllStudent = async () => {
    const response = await getData("student/fetch_all_student");
    setStudentList(response.data);
  };

 
 
  

  useEffect(() => {
    fetchAllStudent();
   
  }, []);



  const handleOpenDialog = async (rowData) => {
    setStudentName(rowData.studentname);
    setGender(rowData.gender);
    setBranchId(rowData.branchid);
    setBatchId(rowData.batchid);
    setSectionId(rowData.sectionid);
    setFatherName(rowData.fathername);
    setMotherName(rowData.mothername);
    setEmailid(rowData.emailid);
     setMobileno(rowData.mobileno);
    setOpen(true);
  };

  const handleCloseDialog = () => setOpen(false);



 

  
  const displayStudent = () => {
    return (
      <MaterialTable
        title="List of Students"
        columns={[
          { title: "Enrollment No", field: "enrollmentno" },
          { title: "Branch Name", field: "branchid" },
          { title: "Batch Name", field: "batchid" },
          { title: "Section Name", field: "sectionid" },
          { title: "Student Name", field: "studentname" },
          { title: "Father Name", field: "fathername" },
          { title: "Mother Name", field: "mothername" },
          { title: "Gender", field: "gender" },
          { title: "DOB", field: "dob" },
          { title: "Mobile No", field: "mobileno" },
          { title: "Email", field: "emailid" },
          { title: "Current Address", field: "current_address" },
          { title: "Permanent Address", field: "permanentaddress" },

        ]}

        data={studentList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Student",
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: "delete",
            tooltip: "Delete Student",
            onClick: (event, rowData) => handleDelete(rowData.studentid)
          },
          {
            icon: "add",
            tooltip: "Add Food item",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/studentinterface"),
          },
        ]}

      />
    );
  };



  const showDialog = () => (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogContent>{showStudentInterface()}</DialogContent>
    </Dialog>
  );



  const handleDelete = async (bid) => {
    Swal.fire({
      title: "Do you want delete the selected Branch?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var response = await postData('students/delete_branch', { branchid: bid })
        Swal.fire(response.message);
        fetchAllStudent();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayStudent()}
        {showDialog()}
      </div>
    </div>
  );
}
