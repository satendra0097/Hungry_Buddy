import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import { getData, postData, getDate, getTime } from "../../services/FatchNodeServices";
import { FormControl, Grid, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { use } from "react";

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


export default function SectionInterface() {
    var classes = useStyle();
    // const [sectionId, setSectionId] = useState('');
    const [batchId, setBatchId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [batchIdList, setBatchIdList] = useState([]);
    const [branchIdList, setBranchIdList] = useState([]);
    const [userid, setuserid] = useState('');
    const [sectionName, setSectionName] = useState('');
    

    const [error, setError] = useState({})
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }));
    }

    const fetchAllBranch = async () => {
        var res = await getData('section/branch_id_fill');
        setBranchIdList(res.data);
    }
    useEffect( function () {
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
        var res = await postData('section/batch_id_fill', { branchid: bid });
        setBatchIdList(res.data);
    }
    const fillbatch = () => {
        return batchIdList.map((item) => {
            return (
                <MenuItem value={item.batchid}>{item.batchname}</MenuItem>
            )
        })
    }

    const handleBranchChange = (e) => {
        setBranchId(e.target.value);
        fetchAllBatch(e.target.value);
    }


    const validation = () => {
        var isError = false
        if (sectionName.length == 0) {
            setError((prev) => ({ ...prev, 'sectionName': 'Pls input Section Name..' }));
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
        if (!validation()) {
            var body = {
                sectionname: sectionName,
                branchid: branchId,
                batchid: batchId,
                createddate: getDate(),
                createdtime: getTime(),
                userid: 1234
            };
            var response = await postData('section/submit_section', body);
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
        // setRefresh(!refresh);
    }
    const clearValue = () => {
        setSectionName('');
        setBatchId('');
        setBranchId('');
    }

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.subTitleStyle}>
                                Add New Section
                            </div>
                        </div>
                    </Grid>
                    <Grid size={2.5}>
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
                    <Grid size={2.5}>
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
                    <Grid size={2.5}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth size="small" label="Section Name" onChange={(e) => setSectionName(e.target.value)} helperText={error?.sectionName} error={error?.sectionName} onFocus={() => handleError('sectionName', '')} value={sectionName} ></TextField>
                        </div>
                    </Grid>
                    <Grid size={2.2}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick} >Save</Button>
                        </div>
                    </Grid>
                    <Grid size={2.2}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValue} >Cancel</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}