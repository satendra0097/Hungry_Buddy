import { makeStyles } from "@mui/styles"
import { FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField } from "@mui/material"


import { useState, useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FatchNodeServices"
import Swal from "sweetalert2";




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
    border: "0.7px solid hsla(321 , 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10
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
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function BranchInterface({ refresh, setRefresh }) {
  var classes = useStyle()
  const [branchName, setBranchName] = useState('')
  const [address, setAddress] = useState('')
  const [latlong, setLatlong] = useState('')
  const [cityId, setCityid] = useState('')
  const [stateId, setStateid] = useState('')
  const [cityList, setCityList] = useState([])
  const [stateList, setStateList] = useState([])

  const [emailId, setEmailid] = useState('')
  const [contactNumber, setContactnumber] = useState('')
  const [contactPerson, setContactperson] = useState('')

  const [error, setError] = useState({ fileError: null })

  const fetchAllState = async () => {
    var res = await getData('statecity/fetch_states')
    setStateList(res.data)
  }

  const fetchAllCity = async (sid) => {
    var res = await postData('statecity/fetch_cities', { sid })
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

  const handelError = (label, message) => {

    setError((prev) => ({ ...prev, [label]: message }))

  };

  const validation = () => {
    var isError = false
    if (branchName.length == 0) {
      setError((prev) => ({ ...prev, 'branchName': 'Pls Input BranchName' }));
      isError = true
    }

    if (latlong.length == 0) {
      setError((prev) => ({ ...prev, 'latlong': 'Pls Input Latlong' }));
      isError = true
    }

    if (address.length == 0) {
      setError((prev) => ({ ...prev, 'address': 'Pls Input Address' }));
      isError = true
    }


    if (cityId.length == 0) {
      setError((prev) => ({ ...prev, 'city': 'Pls Input city' }));
      isError = true
    }

    if (stateId.length == 0) {
      setError((prev) => ({ ...prev, 'state': 'Pls Input State' }));
      isError = true
    }

    if (emailId.length == 0) {
      setError((prev) => ({ ...prev, 'emailId': 'Pls Input EmailId' }));
      isError = true
    }

    if (contactNumber.length == 0) {
      setError((prev) => ({ ...prev, 'contactNumber': 'Pls Input Contact Number' }));
      isError = true
    }
    if (contactPerson.length == 0) {
      setError((prev) => ({ ...prev, 'contactPerson': 'Pls Input Contact Person' }));
      isError = true
    }
    return isError
  };
  const generatePassword = () => {
    var sp = ['@', '#', '$', '&', '!', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    var pwd = ''
    for ( var i = 1; i <= 8; i++) {
      var j = sp[parseInt(Math.random()*14)]
      pwd += j
    }

return  pwd
  }

  const handleClick = async () => {
    // alert("Hello")
    var err = validation()

    if (err == false) {
      var formData = new FormData()
      formData.append('branchname', branchName)
      formData.append('address', address)
      formData.append('latlong', latlong)
      formData.append('cityid', cityId)
      formData.append('stateid', stateId)
      formData.append('emailid', emailId)
      formData.append('contactnumber', contactNumber)
      formData.append('contactperson', contactPerson)
      formData.append('date', getDate())
      formData.append('time', getTime())


      formData.append('userid', 'xxxxx');
      formData.append('password', generatePassword());

      // alert(formData);//
      // }
      var response = await postData('branch/submit_branch', formData)
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
          position: "center",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
      }
    };
    setRefresh(!refresh);
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div style={{ display: 'flex', flexDirection: 'colomn' }}
              className={classes.heading}>
              <div>
                <div style={{ padding: 1, marginLeft: 10, fontSize: 24 }} className={classes.titleStyle}>
                  HungerBuddy
                </div>
                <div style={{ marginLeft: 15, fontsize: 10, }} className={classes.subTitleStyle}>New Food category</div>
              </div>
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setBranchName(e.target.value)} label='Branch Name' fullWidth
                helperText={error?.branchName}
                error={error?.branchName}
                onFocus={() => handelError('branchName', null)} size="small" />
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setLatlong(e.target.value)} label='Latlong' fullWidth
                helperText={error?.latlong}
                error={error?.latlong}
                onFocus={() => handelError('latlong', null)} size="small" />
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setAddress(e.target.value)} label='Address' fullWidth
                helperText={error?.address}
                error={error?.address}
                onFocus={() => handelError('address', null)} size="small" />
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setEmailid(e.target.value)} label='Email...' fullWidth
                helperText={error?.emailId}
                error={error?.emailId}
                onFocus={() => handelError('emailId', null)} size="small" />
            </div>
          </Grid>



          <Grid size={2}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
              <Button onClick={handleClick} fullWidth variant="contained" style={{ background: "hsla(321, 32%, 37%, 1.00)" }} >
                Save
              </Button>
            </div>
          </Grid>



          <Grid size={2.5} >
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
                onFocus={() => handelError('state', null)} size="small" /> */}
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>

              <FormControl size="small" fullWidth>
                <InputLabel>City</InputLabel>
                <Select label="city" value={cityId} onChange={(e) => setCityid(e.target.value)} >
                  <MenuItem>-Select City-</MenuItem>
                  {fillCities()}
                </Select>
              </FormControl>

              {/* <TextField onChange={(e) => setCityid(e.target.value)} label='City' fullWidth
                helperText={error?.city}
                error={error?.city}
                onFocus={() => handelError('city', null)} size="small" /> */}
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactnumber(e.target.value)} label='Contact Number' fullWidth
                helperText={error?.contactNumber}
                error={error?.contactNumber}
                onFocus={() => handelError('contactNumber', null)} size="small" />
            </div>
          </Grid>

          <Grid size={2.5} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactperson(e.target.value)} label='Contact Person' fullWidth
                helperText={error?.contactPerson}
                error={error?.contactPerson}
                onFocus={() => handelError('contactPerson', null)} size="small" />
            </div>
          </Grid>




          <Grid size={2}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
              <Button fullWidth variant="contained" style={{ justifyContent: 'center', background: "hsla(321, 32%, 37%, 1.00)" }} >
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

    </div>
  )
}