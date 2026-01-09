import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react"
import { getData, getDate, getTime, postData, serverURL } from "../../services/FatchNodeServices";
import { FormControl, Grid, InputLabel, TextField, Select, MenuItem, Button, FormLabel, Radio, FormControlLabel, RadioGroup, Menu } from "@mui/material";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Form } from "react-router-dom";
import employee from "../../assets/student.png"

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        // height: '100%',
    },
    box: {
        width: '60%',
        // height: 'auto',
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
export default function DeliveryInterface() {
    var classes = useStyle();
    const [deliveryId, setDeliveryId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [dob, setDob] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [gender, setGender] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [status, setStatus] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [deliveryName, setDeliveryName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [cityList, setCityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [address, setAddress] = useState('');
    const [branchIdList, setBranchIdList] = useState([]);

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

    const fetchAllStates = async () => {
        var res = await getData('delivery/fetch_states');
        setStateList(res.data);
    }
    useEffect(function () {
        fetchAllStates();
    }, []);

    const fillStates = () => {
        return stateList.map((item) => {
            return (
                <MenuItem value={item.stateid}>{item.statename}</MenuItem>
            )
        })
    }
    const fetchAllCities = async (sid) => {
        var res = await postData('delivery/fetch_cities', { stateid: sid });
        setCityList(res.data);
    }
    const fillCity = () => {
        return cityList.map((item) => {
            return (
                <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
            )
        })
    }
    const handleStateChange = (e) => {
        setState(e.target.value);
        fetchAllCities(e.target.value)
    }
    const generatePassword = () => {
        var sp = ['@', '#', '$', '&', '!', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        var pwd = ''
        for (var i = 1; i <= 8; i++) {
            var j = sp[parseInt(Math.random() * 14)]
            pwd += j;
        }
        return pwd;
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
        if (photograph.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'fileError': 'Pls Upload photograph Icon...' }))
            isError = true;
        }
        return isError;
    }

    const handleClick = async () => {
        if (!validation()) {
            var pwd = generatePassword();
            var formData = new FormData()
            formData.append('branchid', branchId);
            formData.append('deliveryname', deliveryName);
            formData.append('dob', dob);
            formData.append('gender', gender);
            formData.append('status', status);
            formData.append('address', address);
            formData.append('aadharno', aadharNo);
            formData.append('mobileno', mobileNo);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('vehicleno', vehicleNo);
            formData.append('emailid', emailId);
            formData.append('photograph', photograph.bytes);
            formData.append('password', generatePassword())

            var response = await postData('delivery/submit_record', formData);

            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2500,
                    toast: true
                });
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
        setError((prev) => ({ ...prev, 'fileError': null }))
    }

    const clearValues = ()=> {
        setAadharNo('');
        setMobileNo('');
        setAddress('');
        setBranchId('');
        setCity('');
        setState('');
        setStatus('');
        setVehicleNo('');
        setDeliveryName('');
        setEmailId('');
        setGender('');
        setDob('');
        setPhotograph({bytes: "", fileName: employee,})
    }

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.subTitleStyle}>
                                Delivery Interface
                            </div>
                        </div>
                    </Grid>
                    <Grid size={3}>
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
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Delivery Person Name" onChange={(e) => setDeliveryName(e.target.value)} helperText={error?.deliveryName} error={error?.deliveryName} value={deliveryName} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" type='date'
                                onChange={(e) => setDob(e.target.value)} value={dob} onFocus={() => handleError('dob', null)} helperText={error?.dob} error={error?.dob}></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
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
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Emailid" fullWidth size="small" onChange={(e) => setEmailId(e.target.value)} value={emailId} onFocus={() => handleError('emailId', null)} helperText={error?.emailId} error={error?.emailId} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Aadhar No" onChange={(e) => setAadharNo(e.target.value)} value={aadharNo} onFocus={() => handleError('aadharNo', null)} helperText={error?.aadharNo} error={error?.aadharNo}></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Mobile No" fullWidth size="small" onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} onFocus={() => handleError('mobileNo', null)} helperText={error?.mobileNo} error={error?.mobileNo} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px', }}>
                            <TextField label="Vehicle No" fullWidth size="small" onChange={(e) => setVehicleNo(e.target.value)} value={vehicleNo} onFocus={() => handleError('vehicleNo', null)} helperText={error?.vehicleNo} error={error?.vehicleNo}></TextField>
                        </div>
                    </Grid>


                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select label="State" onChange={handleStateChange} value={state} onFocus={() => handleError('state', null)} helperText={error?.state} error={error?.state} >
                                    <MenuItem>-select State-</MenuItem>
                                    {fillStates()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select label="City" onChange={(e) => setCity(e.target.value)} value={city} onFocus={() => handleError('city', null)} helperText={error?.city} error={error?.city} >
                                    <MenuItem>-select Cities-</MenuItem>
                                    {fillCity()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Address" onChange={(e) => setAddress(e.target.value)} value={address} onFocus={() => handleError('address', null)} helperText={error?.address} error={error?.address} ></TextField>
                        </div>
                    </Grid>


                    <Grid size={3}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Status" onChange={(e) => setStatus(e.target.value)} value={status} onFocus={() => handleError('status', null)} helperText={error?.status} error={error?.status}></TextField>
                        </div>
                    </Grid>

                    <Grid size={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <img src={photograph.fileName} style={{ width: 40 }} />
                        </div>
                        <div style={{ color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: '0.75rem', lineHeight: '1.66rem', fontWeight: 400, }}>{error?.fileError == null ? '' : error.fileError}</div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '10px 15px 0px 15px' }}>
                            <Button fullWidth component='label' variant='contained' endIcon={<CloudUploadIcon />} style={{ background: 'hsla(321, 32%, 37%, 1)' }} size="small">
                                Photo
                                <input type="file" hidden multiple onChange={handleChange} />
                            </Button>
                        </div>
                    </Grid>

                    <Grid size={3}>
                        <div style={{ padding: '10px 15px 0px 15px' }}>
                            <Button variant="contained" fullWidth size="small" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick}>Save</Button>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{ padding: '10px 15px 0px 15px' }}>
                            <Button variant="contained" fullWidth size="small" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValues} >Clear</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}