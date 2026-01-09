import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import { FormControl, Grid, InputLabel, TextField, Select, MenuItem, Button, FormLabel, Radio, FormControlLabel, RadioGroup, IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getData, getDate, getTime, postData, serverURL } from "../../services/FatchNodeServices";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import employee from '../../assets/student.png';
import EditIconComponent from "../../components/EditiconComponent";

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        width: '70%',
        height: 'auto',
        margin: 10,
        padding: 10,
    },
    heading: {
        width: '100%',
        height: 'auto',
        background: "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 57%, 65%, 1.00) 100%)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
    },
    subTitleStyle: {
        fontWeight: 700,
        fontSize: 14,
        color: '#fff',
        padding: 5,
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
        width: '30%',
        marginLeft: 10,
        marginBottom: 5,
    }
})
)

export default function DeliveryDisplay() {
    var navigate = useNavigate();
    const [deliveryList, setDeliveryList] = useState([]);
    const [open, setOpen] = useState(false);
    /***************delivery interface*****************/
    var classes = useStyle();
    const [deliveryId, setDeliveryId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [dob, setDob] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [gender, setGender] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [status, setStatus] = useState('');
    const [city, setCityid] = useState('');
    const [state, setStateid] = useState('');
    const [deliveryName, setDeliveryName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [cityList, setCityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [address, setAddress] = useState('');
    const [branchIdList, setBranchIdList] = useState([]);
    const [tempImage, setTempImage] = useState('');
    const [dialogState, setDialogState] = useState('');
    const [statusButton, setStatusButton] = useState(false);
    const [photograph, setPhotograph] = useState({ bytes: '', fileName: employee })

    const [error, setError] = useState({})

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const fetchAllBranch = async () => {
        var res = await getData('delivery/branch_id_fill');
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
    const handleBranchChange = (e) => {
        setBranchId(e.target.value);
    }

    const fetchAllState = async () => {
    var res = await getData('statecity/fetch_states')
    setStateList(res.data)
  }

    const fetchAllCity = async (sid) => {
    var res = await postData('statecity/fetch_cities',{stateid:sid})
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

   

    const validation = () => {
        var isError = false;
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input branchname...' }))
            isError = true;
        }
        if (deliveryName.length == 0) {
            setError((prev) => ({ ...prev, 'deliveryName': 'pls input deliveryName...' }))
            isError = true;
        }
        if (dob.length == 0) {
            setError((prev) => ({ ...prev, 'dob': 'pls input dob...' }))
            isError = true;
        }
        if (emailId.length == 0) {
            setError((prev) => ({ ...prev, 'emailId': 'pls input emailId...' }))
            isError = true;
        }
        if (mobileNo.length == 0) {
            setError((prev) => ({ ...prev, 'mobileNo': 'pls input mobileNo...' }))
            isError = true;
        }
        if (status.length == 0) {
            setError((prev) => ({ ...prev, 'status': 'pls input status...' }))
            isError = true;
        }
        if (state.length == 0) {
            setError((prev) => ({ ...prev, 'state': 'pls input state...' }))
            isError = true;
        }
        if (city.length == 0) {
            setError((prev) => ({ ...prev, 'city': 'pls input city...' }))
            isError = true;
        }
        if (address.length == 0) {
            setError((prev) => ({ ...prev, 'address': 'pls input address...' }))
            isError = true;
        }
        if (aadharNo.length == 0) {
            setError((prev) => ({ ...prev, 'aadharNo': 'pls input aadharNo...' }))
            isError = true;
        }
        if (gender.length == 0) {
            setError((prev) => ({ ...prev, 'address': 'pls input address...' }))
            isError = true;
        }
        if (vehicleNo.length == 0) {
            setError((prev) => ({ ...prev, 'vehicleNo': 'pls input vehicleNo...' }))
            isError = true;
        }

        return isError;
    }

    const handleClick = async () => {
        if (!validation()) {

            var body = {
                deliveryid: deliveryId,
                branchid: branchId,
                deliveryname: deliveryName,
                dob: dob,
                gender: gender,
                status: status,
                address: address,
                aadharno: aadharNo,
                mobileno: mobileNo,
                city: city,
                state: state,
                vehicleno: vehicleNo,
                emailid: emailId,

            }
            alert(JSON.stringify(body))
            var response = await postData('delivery/edit_record', body);

            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2500,
                    toast: true
                });
                fetchAllDelivery();
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2500,
                    toast: true
                });
            }
        }
    }
    const handleChange = (e) => {
        setPhotograph({
            bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0])

        })
        setStatusButton(true);
        // setError((prev) => ({ ...prev, 'fileError': null }))
    }

    const clearValues = () => {
        setAadharNo('');
        setMobileNo('');
        setAddress('');
        setBranchId('');
    setCityid('');
    setStateid('');
        setStatus('');
        setVehicleNo('');
        setDeliveryName('');
        setEmailId('');
        setGender('');
        setDob('');
        setPhotograph({ bytes: "", fileName: employee, })
    }
    const showDeliveryInterface = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.subTitleStyle}>
                                Delivery Interface
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <IconButton onClick={handleCloseDialog} >
                                    <CloseIcon style={{ color: '#ffff' }} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Branch Name</InputLabel>
                                <Select label="Branch Name" value={branchId} onChange={handleBranchChange} helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')} >
                                    <MenuItem>-Branch Name-</MenuItem>
                                    {fillbranch()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Delivery Person Name" onChange={(e) => setDeliveryName(e.target.value)} helperText={error?.deliveryName} error={error?.deliveryName} value={deliveryName} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" type='date'
                                onChange={(e) => setDob(e.target.value)} value={dob} onFocus={() => handleError('dob', null)} helperText={error?.dob} error={error?.dob}></TextField>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <FormControl fullWidth size="small">
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup onChange={(e) => setGender(e.target.value)} value={gender} onFocus={() => handleError('gender', null)} helperText={error?.gender} error={error?.gender} >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Emailid" fullWidth size="small" onChange={(e) => setEmailId(e.target.value)} value={emailId} onFocus={() => handleError('emailId', null)} helperText={error?.emailId} error={error?.emailId} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Aadhar No" onChange={(e) => setAadharNo(e.target.value)} value={aadharNo} onFocus={() => handleError('aadharNo', null)} helperText={error?.aadharNo} error={error?.aadharNo}></TextField>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Mobile No" fullWidth size="small" onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} onFocus={() => handleError('mobileNo', null)} helperText={error?.mobileNo} error={error?.mobileNo} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Vehicle No" fullWidth size="small" onChange={(e) => setVehicleNo(e.target.value)} value={vehicleNo} onFocus={() => handleError('vehicleNo', null)} helperText={error?.vehicleNo} error={error?.vehicleNo}></TextField>
                        </div>
                    </Grid>


                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select label="State" onChange={handleStatechange} value={state} onFocus={() => handleError('state', null)} helperText={error?.state} error={error?.state} >
                                    <MenuItem>-select State-</MenuItem>
                                    {fillStates()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select label="City" onChange={(e) => setCityid(e.target.value)} value={city} onFocus={() => handleError('city', null)} helperText={error?.city} error={error?.city} >
                                    <MenuItem>-select Cities-</MenuItem>
                                    {fillCities()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>

                    
                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Address" onChange={(e) => setAddress(e.target.value)} value={address} onFocus={() => handleError('address', null)} helperText={error?.address} error={error?.address} ></TextField>
                        </div>
                    </Grid>


                    <Grid size={4}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Status" onChange={(e) => setStatus(e.target.value)} value={status} onFocus={() => handleError('status', null)} helperText={error?.status} error={error?.status}></TextField>
                        </div>
                    </Grid>

                    <Grid size={6}>
                        <div style={{ padding: '10px 15px 0px 15px' }}>
                            <Button variant="contained" fullWidth size="small" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick}>Edit</Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: '10px 15px 0px 15px' }}>
                            <Button variant="contained" fullWidth size="small" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValues} >clear</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>

        )
    }

    /***************end delivery interface*****************/

    useEffect(function () {
        fetchAllBranch();
        fetchAllCity();
    }, []);
    const fetchAllDelivery = async () => {
        var response = await getData('delivery/fetch_all_delivery');
        setDeliveryList(response.data);
    }
    useEffect(function () {
        fetchAllDelivery();
    }, []);
   

    const handleOpenDialog = async (rowData, status) => {
        setDialogState(status);
        fetchAllCity(rowData.stateid);
        setDeliveryId(rowData.deliveryid);
        setAadharNo(rowData.aadharno);
        setMobileNo(rowData.mobileno);
        setAddress(rowData.address);
        setEmailId(rowData.emailid);
        setStateid(rowData.state);
        setCityid(rowData.cities)
        setStatus(rowData.status);
        setVehicleNo(rowData.vehicleno);
        setDob(rowData.dob);
        setGender(rowData.gender);
        setDeliveryName(rowData.deliveryname);
        setBranchId(rowData.branchid);
        setPhotograph({ fileName: `${serverURL}/images/${rowData.photograph}`, bytes: '' });
        setTempImage(`${serverURL}/images/${rowData.photograph}`);
        setCityid(rowData.city);

        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    }
    const showPictureInterface = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.titleBox}>

                                <div className={classes.titleStyle}>HungerBuddy</div>
                                <div className={classes.subTitleStyle}>Edit Picture</div>

                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <IconButton onClick={handleCloseDialog} >
                                    <CloseIcon style={{ color: '#ffff' }} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <img src={photograph.fileName} style={{ width: 150 }} />

                    </Grid>
                    <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                        {statusButton ? saveCancelButton() : <></>}
                    </Grid>

                    <Grid size={12}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <Button fullWidth component='label' variant='contained' endIcon={<CloudUploadIcon />} style={{ background: 'hsla(321, 32%, 37%, 1)' }}>
                                Student Photo
                                <input onChange={handleChange} type="file" hidden multiple />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
    useEffect(function () {
        fetchAllDelivery();
    }, []);
    const handleCancel = () => {
        setPhotograph({ fileName: tempImage, byte: '' })
        setStatusButton(false);
    }
    const saveCancelButton = () => {
        return (<div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }}>Save</Button>
            <Button onClick={handleCancel} variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }}>Cancel</Button>
        </div>)
    };
    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('deliveryid', deliveryId);
        formData.append('photograph', photograph.bytes);

        var response = await postData('delivery/edit_picture', formData)
        if (response.status) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2500,
                toast: true
            });
            setOpen(false)
            fetchAllDelivery()
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2500,
                toast: true
            });
        }

    }


    const showDialog = () => {
        return (
            <div>
                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogContent> {dialogState == 'Data' ? showDeliveryInterface() : showPictureInterface()} </DialogContent>
                </Dialog>
            </div>
        )
    }

    const handleDelete = async ( deliveryid ) => {
        Swal.fire({
            title: "Do you want to delete the selected deliveryid?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('delivery/delete_record', {  deliveryid  })
                Swal.fire(response.message);
                fetchAllBranch();
            } else if (result.isDenied) {
                Swal.fire("Changes are saved", "", "info");
            }
        });
    }

    const DeliveryDisplay = () => {
        return (
            <div>
                <MaterialTable title='List of Dlivery Person' columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'delivery Name', field: 'deliveryname' },
                    { title: 'Aadhar no', field: 'aadharno' },
                    { title: 'Email Id', field: 'emailid' },
                    { title: 'Contact', field: 'mobileno' },
                    { title: 'Vehicle No', field: 'vehicleno' },
                    { title: 'Status', field: 'status' },
                    { title: 'Gender/Dob', render: (rowData) => (<div>{rowData.gender} {rowData.dob}</div>) },
                    {
                        title: 'Address', render: (rowData) => (
                            <div>{rowData.address},{rowData.cityname},{rowData.statename}</div>
                        )
                    },
                    {
                        title: 'Photograph', render: (rowData) => (
                            <div onClick={() => handleOpenDialog(rowData, "Photograph")}>
                                <EditIconComponent image={rowData.photograph} /> </div>
                        )
                    }
                ]}

                    data={deliveryList}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => handleOpenDialog(rowData, "Data")
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => handleDelete(rowData. deliveryid)
                        },
                        {
                            icon: 'add',
                            tooltip: 'Add Food Item',
                            isFreeAction: true,
                            onClick: (event) => navigate("/admindashboard/deliveryinterface")
                        }
                    ]}
                />
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.box}>
                {DeliveryDisplay()}
            </div>
            {showDialog()}
        </div>

    )
}