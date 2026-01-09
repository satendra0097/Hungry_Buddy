import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles"
import { serverURL } from "../../services/FatchNodeServices";
import burger from '../../assets/burger.png'
import { Dialog, DialogTitle, DialogContent, Button, Grid, TextField } from "@mui/material"
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { getData, getTime, getDate, postData } from "../../services/FatchNodeServices";
import IconButton from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import EditiconComponent from "../../components/EditiconComponent";
import { use } from "react";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: '70%',
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
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));
export default function DisplayAll({ refresh, setRefresh }) {
  const classes = useStyle()
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false)
  //-------------Category view-------------------------***//

  const [categoryid, setCategoryId] = useState('')
  const [branchid, setBranchid] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState({ bytes: '', filename: burger });

  const [dialogstate, setdialogstate] = useState('')
  const [statusButton, setStatusButton] = useState(false)
  const [tempImage, setTempImage] = useState('')
  const [error, setError] = useState({ fileError: null })



  const handelError = (label, message) => {

    setError((prev) => ({ ...prev, [label]: message }))

  }

  const validation = () => {
    var isError = false
    if (categoryName.length == 0) {
      setError((prev) => ({ ...prev, 'categoryName': 'Pls Input CategoryName' }));
      isError = true
    }

    return isError
  };

  useEffect(function () {
    fetchAllcategory()
  }, [refresh])

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var body = {
        categoryid: categoryid,
        categoryname: categoryName,
        createddate: getDate(),
        createdtime: getTime(),
        userid: "xxxx",
      };
      var response = await postData('category/edit_category', { categoryname: categoryName, createdtime: getTime(), createddate: getDate(), userid: 'xxxx', categoryid })
      if (response.status) {
        fetchAllcategory()
        handleCloseDialog()
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
        // (sir ka message me close popclosure)////setOpen(false)
        // fetchAllcategory()
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

    }

  };
  const showPictureInterface = () => {

    return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 400 }}>

      <Grid size={12}>


        <div style={{ display: 'flex' }} className={classes.heading}>
          <div>
            <div style={{ padding: 1, marginLeft: 10, fontSize: 24 }} className={classes.titleStyle}>
              HungerBuddy
            </div>

            <div style={{ marginLeft: 15, fontsize: 10, }} className={classes.subTitleStyle}>Edit Picture </div>

          </div>
          <IconButton onClick={handleCloseDialog} style={{ display: 'flex', width: 'auto', marginLeft: 'auto', marginRight: 10, paddingTop: 5, }}>
            <CloseIcon style={{ color: '#8e44ad' }} />
          </IconButton>
        </div>

      </Grid>
      <Grid style={{ display: 'flex', marginTop: 10, marginBottom: 10 }} size={6}>
        <img src={categoryIcon.filename} style={{ maxHeight: 150, maxWidth: 200, borderRadius: 10, }} />
      </Grid>

      <Grid size={6}>
        {statusButton ? saveCancelButton() : <></>}
      </Grid>

      <Grid size={12}>
        <div style={{ padding: '0px 5px 0px 5px', }}>
          <Button endIcon={<CloudUploadIcon />} fullWidth component='label' variant="contained" style={{ background: "hsla(321, 32%, 37%, 1.00)" }}>Category Icon

            <input onChange={handelChange} type="file" hidden multiple />
          </Button>
        </div >
      </Grid>
    </div>
  }
  const handelChange = (e) => {
    setCategoryIcon({
      bytes: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
    setStatusButton(true)
  };

  const showCategoryInterface = () => {
    return (
      <Grid container spacing={1}>
        <Grid size={12}>

          <div style={{ display: 'flex' }} className={classes.heading}>
            <div>
              <div style={{ padding: 1, marginLeft: 10, fontSize: 24 }} className={classes.titleStyle}>
                HungerBuddy
              </div>

              <div style={{ marginLeft: 15, fontsize: 10, }} className={classes.subTitleStyle}>Edit Category</div>

            </div>
            <IconButton onClick={handleCloseDialog} style={{ display: 'flex', width: 'auto', marginLeft: 'auto', marginRight: 10, paddingTop: 5, }}>
              <CloseIcon style={{ color: '#8e44ad' }} />
            </IconButton>
          </div>

        </Grid>

        <Grid size={12} >
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setBranchid(e.target.value)} label='Branch Name' fullWidth value={branchid} />
          </div>
        </Grid>

        <Grid size={12} >
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setCategoryName(e.target.value)} label='Category Name' fullWidth value={categoryName}
              helperText={error?.categoryName}
              error={error?.categoryName}
              onFocus={() => handelError('categoryName', null)} />
          </div>
        </Grid>

        <Grid size={6}>
          <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
            <Button onClick={handleClick} fullWidth variant="contained" style={{ background: "hsla(321, 32%, 37%, 1.00)" }} >
              Save
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
    );
  }
  //----------------fetchAllCategory----------------------***//

  const fetchAllcategory = async () => {
    var response = await getData('category/fetch_all_category');
    setCategoryList(response.data);
  }

  useEffect(function () {
    fetchAllcategory();
  }, []);
  const handelCancel = () => {
    setCategoryIcon({ filename: tempImage, bytes: '' })
    setStatusButton(false)
  }
  const handelEditPicture = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryid)
    formData.append('categoryicon', categoryIcon.bytes)
    formData.append('createddate', getDate())
    formData.append('createdtime', getTime())
    formData.append('userid', "xxxx")

    var response = await postData('category/edit_picture', formData);
    if (response.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true
      });
      setOpen(false);
      fetchAllcategory();
      // (sir ka message me close popclosure)////setOpen(false)
      // fetchAllcategory()
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
  }

  const saveCancelButton = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "16px",
          padding: "10px"
        }}
      >
        <Button onClick={handelEditPicture} style={{ width: "30%", background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Save</Button>
        <Button onClick={handelCancel} style={{ width: "30%", background: "hsla(321, 32%, 37%, 1.00)" }} variant="contained">Cancel</Button>
      </div>
    );

  }
  const handleOpenDialog = (rowData, status) => {
    setdialogstate(status)
    setCategoryId(rowData.categoryid)
    setBranchid(rowData.branchid)
    setCategoryName(rowData.categoryname);
    setCategoryIcon({
      filename: `${serverURL}/images/${rowData.categoryicon}`, bytes: '',
    });
    setTempImage(`${serverURL}/images/${rowData.categoryicon}`);
    setOpen(true);
  };

  const handleCloseDialog = (rowData) => {
    setOpen(false)
  }
  const showDialog = () => {
    return (<div>
      <Dialog open={open}
        onclose={handleCloseDialog}>
        <DialogContent>
          {dialogstate == 'Data' ? showCategoryInterface() : showPictureInterface()}
        </DialogContent>

      </Dialog>
    </div>)

  }
  const handleDelete = async (cid) => {

    Swal.fire({
      title: "Do you want to delete the selected category ?",

      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var response = await postData('category/delete_category', { categoryid: cid })

        Swal.fire(response.message);

        fetchAllcategory()

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });


  }



  const DisplayCategory = () => {
    return (
      <div>
        <MaterialTable
          title='List of food categories'
          columns={[
            { title: 'Branch Id', field: 'branchid' },
            { title: 'Category Name', field: 'categoryname' },
            {
              title: 'Icon', render: (rowData) => (<div onClick={() => handleOpenDialog(rowData)}><EditiconComponent image={rowData.categoryicon} /></div>

              )
            }

          ]}
          data={categoryList}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
            },

            {
              icon: 'delete',
              tooltip: 'Delete',
              onClick: (event, rowData) => handleDelete(rowData.categoryid)
            },

          ]}

        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {DisplayCategory()}
      </div>
      {showDialog()}
    </div>
  );
}