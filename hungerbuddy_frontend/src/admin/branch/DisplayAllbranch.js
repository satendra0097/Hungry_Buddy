import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/FatchNodeServices";
import { makeStyles } from "@mui/styles"
import { IconButton, Dialog, DialogTitle, DialogContent, Button, Grid, TextField } from "@mui/material"
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, InputLabel, Select, MenuItem} from "@mui/material"

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: '74%',
    height: 'auto',
    margin: 10,
    padding: 10
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
    marginBottom: 5,
  },

}));

export default function DisplayAllBranch({refresh, setRefresh}) {
  const classes = useStyle()
  const [branchList, setBranchList] = useState([]);
  const [open, setOpen] = useState(false)
  /***********************BRANCH VIEW************* */
  const [branchid, setbranchId] = useState('')
  const [branchName, setBranchName] = useState('')
  const [address, setAddress] = useState('')
  const [latlong, setLatlong] = useState('')
  const [cityId, setCityid] = useState('')
  const [stateId, setStateid] = useState('')
  const [emailId, setEmailid] = useState('')
  const [contactNumber, setContactnumber] = useState('')
  const [contactPerson, setContactperson] = useState('')
 
 
   
  const [stateList, setStateList] = useState([])
 const [cityList, setCityList] = useState([])
  const [error, setError] = useState({ fileError: null })
  const handelError = (label, message) => {

    setError((prev) => ({ ...prev, [label]: message }))

  };

  const validation = () => {
    var isError = false
    if (branchName.length == 0) {
      setError((prev) => ({ ...prev, 'branchName': 'Pls Input BranchName' }));
      isError = true
    }

    var isError = false
    if (latlong.length == 0) {
      setError((prev) => ({ ...prev, 'latlong': 'Pls Input Latlong' }));
      isError = true
    }

    var isError = false
    if (address.length == 0) {
      setError((prev) => ({ ...prev, 'address': 'Pls Input Address' }));
      isError = true
    }


    var isError = false
    if (cityId.length == 0) {
      setError((prev) => ({ ...prev, 'city': 'Pls Input city' }));
      isError = true
    }

    var isError = false
    if (stateId.length == 0) {
      setError((prev) => ({ ...prev, 'state': 'Pls Input State' }));
      isError = true
    }

    var isError = false
    if (emailId.length == 0) {
      setError((prev) => ({ ...prev, 'emailId': 'Pls Input EmailId' }));
      isError = true
    }

    var isError = false
    if (contactNumber.length == 0) {
      setError((prev) => ({ ...prev, 'contactNumber': 'Pls Input Contact Number' }));
      isError = true
    }
    var isError = false
    if (contactPerson.length == 0) {
      setError((prev) => ({ ...prev, 'contactPerson': 'Pls Input Contact Person' }));
      isError = true
    }
    return isError
  };


  const handleClick = async () => {
    var err = validation()

    if (err == false) {
      var body = { 'branchid': branchid, 'branchname': branchName, "address": address, 'latlong': latlong,  "stateId": stateId,"cityId": cityId, 'emailid': emailId, 'contactnumber': contactNumber, 'contactperson': contactPerson, 'userid': "xxxxx" }



      // alert(formData);//
      // }
      var response = await postData('branch/edit_branch', body)
      if (response.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
        setOpen(false)
        fetchAllbranch()
      }

      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
      }
    };
  }
//************************** */

const fetchAllState = async () => {
    var res = await getData('statecity/fetch_states')
    setStateList(res.data)
  }

    const fetchAllCity = async (sid) => {
    var res = await postData('statecity/fetch_cities',{sid})
    setCityList(res.data)
  }



  const handleStatechange = (e) => {
    setStateid(e.target.value)
    fetchAllCity(e.target.value)
  }


  useEffect(function () {
    fetchAllState()
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


//**************************************** */




  useEffect(function() {
    fetchAllbranch();
  },[refresh]);

  const showBranchInterface = () => {
    return (
      <div className={classes.root}>

        <Grid container spacing={1}>
          <Grid size={12}>
            <div style={{ display: 'flex', flexDirection: 'colomn' }} className={classes.heading}>
              <div>
                <div style={{ padding: 1, marginLeft: 10, fontSize: 24 }} className={classes.titleStyle}>
                  HungerBuddy
                </div>
                <div style={{ marginLeft: 15, fontsize: 10, }} className={classes.subTitleStyle}>New Food category</div>
              </div>




            </div>
          </Grid>

          <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setBranchName(e.target.value)} label='Branch Name' fullWidth
                helperText={error?.branchName}
                error={error?.branchName}
                onFocus={() => handelError('branchname', null)} value={branchName} />
            </div>
          </Grid>

          <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setLatlong(e.target.value)} label='Latlong' fullWidth
                helperText={error?.latlong}
                error={error?.latlong}
                onFocus={() => handelError('latlong', null)} value={latlong} />
            </div>
          </Grid>

          <Grid size={12} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setAddress(e.target.value)} label='Address' fullWidth
                helperText={error?.address}
                error={error?.address}
                onFocus={() => handelError('address', null)} value={address} />
            </div>

          </Grid>
          <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
             <FormControl size="small" fullWidth>
                <InputLabel>State</InputLabel>
                <Select label="state" value={stateId} onChange={handleStatechange}>
                  <MenuItem>-Select State-</MenuItem>
                  {fillStates()}
                </Select>
              </FormControl>
              
              {/* <TextField onChange={(e) => setStateid(e.target.value)} label='State' fullWidth
                helperText={error?.state}
                error={error?.state}
                onFocus={() => handelError('state', null)} value={stateId} /> */}
            </div>
          </Grid>

           <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
                 <FormControl size="small" fullWidth>
                              <InputLabel>City</InputLabel>
                            <Select label="city" value={cityId} onChange={(e)=>setCityid(e.target.value)} >
                                <MenuItem>-Select City-</MenuItem>
                                {fillCities()}
                              </Select>
                            </FormControl>
              {/* <TextField onChange={(e) => setCityid(e.target.value)} label='City' fullWidth
                helperText={error?.city}
                error={error?.city}
                onFocus={() => handelError('city', null)} value={cityId} /> */}
            </div>
          </Grid>
          
          <Grid size={12} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setEmailid(e.target.value)} label='Email...' fullWidth
                helperText={error?.emailId}
                error={error?.emailId}
                onFocus={() => handelError('emailid', null)} value={emailId} />
            </div>
          </Grid>

          <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactnumber(e.target.value)} label='Contact Number' fullWidth
                helperText={error?.contactNumber}
                error={error?.contactNumber}
                onFocus={() => handelError('contactnumber', null)} value={contactNumber} />
            </div>
          </Grid>

          <Grid size={6} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactperson(e.target.value)} label='Contact Person' fullWidth
                helperText={error?.contactPerson}
                error={error?.contactPerson}
                onFocus={() => handelError('contactperson', null)} value={contactPerson} />
            </div>
          </Grid>


          <Grid size={6}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
              <Button onClick={handleClick} fullWidth variant="contained" style={{ background: "hsla(321, 32%, 37%, 1.00)" }} >
                Edit
              </Button>
            </div>
          </Grid>

          <Grid size={6}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
              <Button fullWidth variant="contained" style={{ justifyContent: 'center', background: "hsla(321, 32%, 37%, 1.00)" }} >
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>


      </div>
    )
  }
  /*********************************************** */
  const fetchAllbranch = async () => {
    var response = await getData('branch/fetch_all_branch');
    setBranchList(response.data);
  }

  useEffect(function () {
    fetchAllbranch();
  }, []);


  const handleOpenDialog = (rowData) => {
fetchAllCity(rowData.stateid)
    // console.log(rowData);
    setbranchId(rowData.branchid)
    setBranchName(rowData.branchname)
    setLatlong(rowData.latlong)
    setAddress(rowData.address)
    setCityid(rowData.cityid)
    setStateid(rowData.stateid)
    setEmailid(rowData.emailid)
    setContactnumber(rowData.contactnumber)
    setContactperson(rowData.contactperson)


    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }
  const showDialog = () => {
    return (<div>
      <Dialog open={open}
        onClose={handleCloseDialog}
      >

        <DialogTitle>
          <IconButton onClick={handleCloseDialog} style={{ display: 'flex', width: 'auto', marginLeft: 'auto' }}>
            <ClearIcon />
          </IconButton >
        </DialogTitle>

        <DialogContent>
          {showBranchInterface()}
        </DialogContent>

      </Dialog>
    </div>)

  }
  
  const handleDelete = async (bid) => {
    Swal.fire({
      title: "Do you want delete the selected Branch?",
      showCancelButton: true,
      confirmButtonText: "Delete",
   
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var response = await postData('branch/delete_branch', { branchid: bid })
        Swal.fire(response.message);
        fetchAllbranch();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

}
    const displayAllbranch = () => {
      return (
        <div>
          <MaterialTable
            title='List of branch'
            columns={[
              { title: 'Branch Id', field: 'branchid' },
              { title: 'Branch Name', field: 'branchname' },
              { title: ' Address', field: 'address' },
              { title: 'Latlong', field: 'latlong' },
             { title: 'State', field: 'statename' },
              { title: 'City', field: 'cityname' },
              { title: 'Emailid', field: 'emailid' },
              { title: 'Contact number', field: 'contactnumber' },
              { title: 'Contact person', field: 'contactperson' },
              { title: 'Userid', field: 'userid' },

            ]}
            data={branchList}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => handleDelete(rowData.branchid)
              }
            ]}

          />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.box}>
          {displayAllbranch()}
        </div>
        {showDialog()}
      </div>
    );
  }
