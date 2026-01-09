import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import { getData, postData, getDate, getTime } from "../../services/FatchNodeServices";
import { Grid, TextField, Button, Dialog, DialogContent, DialogTitle, MenuItem, IconButton, FormControl, Select, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core";
import CloseIcon from "@mui/icons-material/Close";


const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        width: '60%',
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

export default function BatchDisplay({refresh, setRefresh}) {
    var classes = useStyle();
    const [batchList, setBatchList] = useState([]);
    const [open, setOpen] = useState(false);
    /**************************Batch********************* */

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

    const validation = () => {
        var isError = false
        if (batchName.length == 0) {
            setError((prev) => ({ ...prev, 'batchName': 'Pls input Batch Name..' }));
            isError = true;
        }
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'Pls input BranchId..' }));
            isError = true;
        }
        if (session.length == 0) {
            setError((prev) => ({ ...prev, 'session': 'Pls input Session..' }));
            isError = true;
        }
        return isError;
    }

    const handleClick = async () => {
        if (!validation()) {
            var body = {
                batchid: batchId,
                batchname: batchName,
                branchid: branchId,
                session: session,
                createddate: getDate(),
                createdtime: getTime(),
                userid: 1234
            };
            var response = await postData('batch/edit_batch', body);
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
                fetchAllBatch();
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

    useEffect( function (){
        fetchAllBatch();
    },[refresh])

    const clearValue = () => {
        setBatchName('');
        setSession('');
        setBranchId('');
    }

    const showBatchInterface = () => {
        return (
            // <div className={classes.root}>
            // <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.subTitleStyle}>
                            Add New Batch
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton onClick={handleCloseDialog} >
                                <CloseIcon style={{ color: '#ffff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>

                <Grid size={6}>
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
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField label="Batch name" size="small" fullWidth onChange={(e) => setBatchName(e.target.value)} value={batchName} helperText={error?.batchName} error={error?.batchName} onFocus={() => handleError('batchName', '')} ></TextField>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Session</InputLabel>
                            <Select label="Session" value={session} onChange={(e) => setSession(e.target.value)} helperText={error?.session} error={error?.session} onFocus={() => handleError('session', '')} >
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
                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={handleClick}>Save</Button>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth size="small" variant="contained" style={{ background: 'hsla(321, 32%, 37%, 1)' }} onClick={clearValue}>Cancel</Button>
                    </div>
                </Grid>
            </Grid>

        )
    }

    /**************************end********************* */

    const fetchAllBatch = async () => {
        var response = await getData('batch/fetch_all_batch')
        setBatchList(response.data);
    }

    useEffect(function () {
        fetchAllBatch();
    }, []);

    const handleOpenDialog = async(rowData) => {
        setBranchId(rowData.branchid);
        setBatchName(rowData.batchname);
        setSession(rowData.session);
        setuserid(rowData.userid);
        setBatchId(rowData.batchid);

        await fetchAllBranch()
        
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
                        {showBatchInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    const handleDelete = async (cid) => {
        Swal.fire({
            title: "Do you want to delete the selected batchid?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('batch/delete_batch', { batchid: cid })
                Swal.fire(response.message);
                fetchAllBatch();
            } else if (result.isDenied) {
                Swal.fire("Changes are saved", "", "info");
            }
        });
    }

    const displayBatch = () => {
        return (
            <div>
                <MaterialTable title='List of Batches' columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Session', field: 'session' },
                ]} data={batchList}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => handleOpenDialog(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => handleDelete(rowData.batchid)
                        }
                    ]}
                />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                {displayBatch()}
            </div>
            {showDialog()}
        </div>
    )
}