import { IconButton, Grid, TextField } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import burger from '../../assets/burger.png'
import { useState } from "react";
import { getDate, getTime, postData } from "../../services/FatchNodeServices"
import swal from "sweetalert2";
import { makeStyles } from "@mui/styles"
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



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
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: 5,
    margin: 10,
    paddingBottom: 10
  },
  heading: {
    width: "100%",
    height: "auto",
    // background:
    //   "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    // borderTopLeftRadius: 5,
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
    color: "#000",
    marginBottom: 5,
    marginTop: 5,
    size: 'big'
  },
  titleBox: {
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,

  },
}));

export default function CategoryInterface({ refresh, setRefresh }) {
  var classes = useStyle()
  var branch = JSON.parse(localStorage.getItem('Branch'))
  // alert(JSON.stringify(branch))
  const [branchid, setBranchid] = useState(branch?.branchid)
  const [branchName, setBranchName] = useState(branch?.branchname)
  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState({ bytes: '', filename: burger });
  const [error, setError] = useState({ fileError: null })
  const handelError = (label, message) => {

    setError((prev) => ({ ...prev, [label]: message }))

  }
  
  const clearValues = () => {
    // alert('rfghfg')
    setCategoryName('')
    setCategoryIcon({ bytes: '', filename: burger });
  }

  const handelChange = (e) => {
    setCategoryIcon({
      bytes: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0])
    });

  };

  const validation = () => {
    var isError = false
    if (categoryName.length == 0) {
      setError((prev) => ({ ...prev, 'categoryName': 'Pls Input CategoryName' }));
      isError = true
    }
    if (categoryIcon.bytes.length == 0) {
      setError((prev) => ({ ...prev, 'fileError': 'Pls Upload Category Icon...' }))
      isError = true
    }
    return isError
  };

  const handleClick = async () => {
    var err = validation()

    if (err == false) {
      var formData = new FormData()
      formData.append('branchid', branchid)
      formData.append('categoryname', categoryName)
      formData.append('categoryicon', categoryIcon.bytes)
      formData.append('createddate', getDate())
      formData.append('createdtime', getTime())
      formData.append('userid', 'xxxxx')

      var response = await postData('category/submit_category', formData)
      if (response.status) {
        swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
      }
      else {
        swal.fire({
          position: "center",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
      }
    }
    setRefresh(!refresh)

  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>

        <Grid container spacing={1}>
          <Grid size={12}>

            <div style={{ display: 'flex', flexDirection: 'colomn' }} className={classes.heading}>
              <div>

                <div style={{ marginLeft: 15, fontsize: 10, }} className={classes.subTitleStyle}>New Food category</div>
              </div>
            </div>
          </Grid>

          <Grid size={3} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setBranchid(e.target.value)} label='Branch Name' fullWidth size="small" value={branchName} helperText={error?.branchName}
                error={false} onFocus={() => handelError('branchName', '')} />
            </div>
          </Grid>
          <Grid size={3} >
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setCategoryName(e.target.value)} label='Category Name' fullWidth size="small"
                value={categoryName}
                helperText={error?.categoryName}
                error={error?.categoryName}
                onFocus={() => handelError('categoryName', null)} />
            </div>
          </Grid>

          <Grid size={1.5} style={{ justifyContent: 'center', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
            <img src={categoryIcon.filename} style={{ width: 40 }} />

            <div style={{ color: '#d32f2f', fontFamily: "Roboto,Helvetica, Arial,sans-serif", fontWeight: 400, fontSize: '0.75rem', lineHeight: "1.66rem" }}>{error.fileError == null ? '' : error.fileError}</div>
          </Grid>


          <Grid size={1.5}>
            <div style={{ width: '100%', padding: '5px' }}>
              <IconButton endIcon={<CloudUploadIcon />}
                fullWidth component='label'
                style={{
                  color: "hsla(321, 32%, 37%, 1.00)"
                  , display: 'flex', flexDirection: "column", component: 'label'
                }}>
                <CloudUploadIcon style={{ fontSize: 35 }} />
                <div style={{ fontSize: 14 }}>Upload</div>

                <input onChange={handelChange} type="file" hidden multiple />
              </IconButton>
            </div >
          </Grid>

          <Grid size={1.5}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box' }}>
              <IconButton onClick={handleClick} style={{ color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column", marginLeft: 10 }} >
                <SaveIcon style={{ fontSize: 35 }} />
                <div style={{ fontSize: 14 }}>Save</div>
              </IconButton>
            </div>
          </Grid>

          <Grid size={1.5}>
            <div style={{ width: '100%', padding: 5, boxSizing: 'border-box', }}>
              <IconButton onClick={clearValues} style={{ justifyContent: 'center',component:'label' ,color: "hsla(321, 32%, 37%, 1.00)", flexDirection: "column" }}>

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