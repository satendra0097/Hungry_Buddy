import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import { getData, postData, getDate, getTime } from "../../services/FatchNodeServices";
import { Grid, TextField, Button, Dialog, DialogContent, DialogTitle, MenuItem, IconButton, FormControl, Select, InputLabel } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { use } from "react";
import CloseIcon from "@mui/icons-material/Close";

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
        display: 'flex',
        flexDirection: 'row'
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


export default function SectionDisplay({ refresh, setRefresh }) {
    var classes = useStyle();
    const [sectionList, setSectionList] = useState([]);
    const [open, setOpen] = useState(false);
    /************************Section*****************************/

    const [sectionId, setSectionId] = useState('');
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
                sectionid: sectionId,
                sectionname: sectionName,
                branchid: branchId,
                batchid: batchId,
                createddate: getDate(),
                createdtime: getTime(),
                userid: 1234
            };
            var response = await postData('section/edit_section', body);
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
                fetchAllSection();
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

    useEffect(function () {
        fetchAllSection();
    }, [refresh]);

    const clearValue = () => {
        setSectionName('');
        setBatchId('');
        setBranchId('');
    }

    const showSectionInterface = () => {
        return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                           
                        <div className={classes.subTitleStyle}>
                            Edit Section
                        </div>
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
                            <Select label="Branch Name" value={branchId} onChange={handleBranchChange} >
                                <MenuItem>-Branch Name-</MenuItem>
                                {fillbranch()}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Batch Name</InputLabel>
                            <Select label="Batch Name" value={batchId} onChange={(e) => setBatchId(e.target.value)} >
                                <MenuItem>-Batch Name-</MenuItem>
                                {fillbatch()}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth size="small" label="Section Name" onChange={(e) => setSectionName(e.target.value)} helperText={error?.sectionName} error={error?.sectionName} onFocus={() => handleError('sectionName', '')} value={sectionName} ></TextField>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick} >Save</Button>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValue} >Cancel</Button>
                    </div>
                </Grid>
            </Grid>
            </div>
        )
    }

    /************************End*****************************/

    const fetchAllSection = async () => {
        var response = await getData('section/fetch_all_section');
        setSectionList(response.data);
    }
    useEffect(function () {
        fetchAllSection();
    }, []);

    const handleOpenDialog = async (rowData) => {
       
        setSectionName(rowData.sectionname);
        setBatchId(rowData.batchid);
        setBranchId(rowData.branchid);
        setuserid(rowData.userid);
        setSectionId(rowData.sectionid);

        await fetchAllBranch()
       await fetchAllBatch(rowData.branchid);
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }
    const showDialog = () => {
        return (
            <div>
                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogContent>
                        {showSectionInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    const handleDelete = async (cid) => {
        Swal.fire({
            title: "Do you want to delete the selected sectionid?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('section/delete_section', { sectionid: cid })
                Swal.fire(response.message);
                fetchAllSection();
            } else if (result.isDenied) {
                Swal.fire("Changes are saved", "", "info");
            }
        });
    }

    const displaySection = () => {
        return (
            <div>
                <MaterialTable title='List of Sections' columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Section Name', field: 'sectionname' },
                    { title: 'Batch Name', field: 'batchname' },
                ]} data={sectionList}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => handleOpenDialog(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => handleDelete(rowData.sectionid)
                        }
                    ]}
                />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                {displaySection()}
            </div>
            {showDialog()}
        </div>
    )
}