import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getData, postData, getTime, getDate } from "../../services/FatchNodeServices";
import Swal from "sweetalert2";
import { use } from "react";
// import {map} from "react";
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        height: '100%',
    },
    box: {
        width: '60%',
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
export default function BatchInterface({ refresh, setRefresh}) {
    var classes = useStyle();
    const [batchId, setBatchId] = useState('');
    const [batchName, setBatchName] = useState('');
    const [branchId, setBranchId] = useState('');
    const [branchIdList, setBranchIdList] = useState([]);
    const [session, setSession] = useState('');
    const [userid, setuserid] = useState('');

    const [error, setError] = useState({})
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const fetchAllBranch = async () => {
        var res = await getData('batch/branch_id_fill');
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
   
    const validation =()=> {
        var isError = false
        if(batchName.length == 0) {
            setError((prev) => ({...prev, 'batchName': 'Pls input Batch Name..'}));
            isError = true;
        }
        if(branchId.length==0) {
            setError((prev) => ({...prev, 'branchId': 'Pls input BranchId..'}));
            isError = true;
        }
        if(session.length==0) {
            setError((prev) => ({...prev, 'session': 'Pls input Session..'}));
            isError = true;
        }
        return isError;
    }

    const handleClick = async () => {
        if(!validation()) {
        var body = {
            batchname: batchName,
            branchid: branchId,
            session: session,
            createddate: getDate(),
            createdtime: getTime(),
            userid: 1234
        };
        var response = await postData('batch/submit_batch', body);
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
    }
}

const clearValue =()=>{
    setBatchName('');
    setSession('');
    setBranchId('');
}

return (
    <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.subTitleStyle}>
                            Add New Batch
                        </div>
                    </div>
                </Grid>

                <Grid size={2.5}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Branch Name</InputLabel>
                            <Select label="Branch Name" value={branchId} onChange={handleBranchChange} helperText={error?.branchId}  error={error?.branchId} onFocus={()=> handleError('branchId', '')} >
                                <MenuItem>-Branch Name-</MenuItem>
                                {fillbranch()}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField label="Batch name" size="small" fullWidth onChange={(e)=> setBatchName(e.target.value)} value={batchName} helperText={error?.batchName} error={error?.batchName} onFocus={() => handleError('batchName', '')} ></TextField>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Session</InputLabel>
                            <Select label="Session" value={session} onChange={(e)=> setSession(e.target.value)} helperText={error?.session} error={error?.session} onFocus={()=> handleError('session', '')} >
                                <MenuItem>-Session-</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                                <MenuItem value={2025}>2025</MenuItem>
                                <MenuItem value={2026}>2026</MenuItem>
                                <MenuItem value={2027}>2027</MenuItem>
                                <MenuItem value={2028}>2028</MenuItem>
                                <MenuItem value={2029}>2029</MenuItem>
                                <MenuItem value={2030}>2030</MenuItem>
                                <MenuItem value={2031}>2031</MenuItem>
                                <MenuItem value={2032}>2032</MenuItem>
                                <MenuItem value={2033}>2033</MenuItem>
                                <MenuItem value={2034}>2034</MenuItem>
                                <MenuItem value={2035}>2035</MenuItem>
                                
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={2.2}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick}>Save</Button>
                    </div>
                </Grid>
                <Grid size={2.2}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValue}>Cancel</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
)
}