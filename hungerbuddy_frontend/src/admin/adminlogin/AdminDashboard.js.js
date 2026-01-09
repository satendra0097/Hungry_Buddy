
import { NavigationType, useNavigate } from "react-router-dom"
import { Button, Grid, AppBar, Toolbar, Avatar, ListItemButton, Divider } from "@mui/material"
import { serverURL } from "../../services/FatchNodeServices"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import fooditemimage from '../../assets/burger.png'

import Branchs from '../../assets/burger.png'
import Orders from '../branch/assets/Orders.png';
import Logout from '../branch/assets/Logout.png';
import Dashboard from '../branch/assets/dashboard.png'
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Category from "../category/Category";
import { Route, Routes } from "react-router-dom";
import Branch from "../branch/Branch";
import EmployeeDisplay from "../employee/EmployeeDisplay";
import EmployeeInterface from "../employee/employeeinterface";
import StudentInterface from "../student/studentinterface";
import StudentDisplay from "../student/studentDisplay"
import DeliveryDisplay from '../delivery/DeliveryDisplay.js'
import DeliveryIteface from '../delivery/DeliveryIterface.js'
import Batch from "../batchh/Batch"

import Section from "../section/Section";

export default function BranchDashboard() {

  var navigate = useNavigate()
  const handleClick = () => {
    navigate('/adminlogin')
  }


  const handleLogout = () => {
    localStorage.removeItem('Token')
  }
  //CDGHADGCHDC
  const sideBar = () => {
    return (<div style={{ background: "hsla(321, 36%, 91%, 1.00)", margin: 10, borderRadius: 3, height: '70%' }}>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={Dashboard} sx={{ width: 50, height: 30 }} variant="rounded">

              <DashboardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Dashboard</div>} />
        </ListItem>

        <Divider />
        <ListItemButton onClick={() => navigate('/admindashboard/branch')}>
          <ListItemAvatar>
            <Avatar src={Branchs} sx={{ width: 30, height: 30 }} variant="rounded">

            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Branch</div>} />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admindashboard/batch')}>
          <ListItemAvatar>
            <Avatar src={fooditemimage} sx={{ width: 30, height: 30 }} variant="rounded">

            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Batch</div>} />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admindashboard/section')}>
          <ListItemAvatar>
            <Avatar src={Orders} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Sections</div>} />
        </ListItemButton>


        <ListItemButton onClick={() => navigate('/admindashboard/studentdisplay')}>
          <ListItemAvatar>
            <Avatar src={Logout} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Students</div>} />
        </ListItemButton>



        <ListItemButton onClick={() => navigate('/admindashboard/employeedisplay')}>
          <ListItemAvatar>
            <Avatar src={Logout} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Employees</div>} />
        </ListItemButton>



        <ListItemButton onClick={() => navigate('/admindashboard/deliverydisplay')}>
          <ListItemAvatar>
            <Avatar src={Logout} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Delivery</div>} />
        </ListItemButton>


        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={Logout} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Logout</div>} />
        </ListItemButton>

      </List>



    </div>)

  }
  return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <AppBar position="static" style={{ background: "hsla(321, 32%, 37%, 1.00)" }}>
      <Toolbar>
        <div style={{ fontSize: 24 }}>
          HungerBuddy

        </div>
        <Avatar style={{ width: 45, height: 45, marginLeft: 'auto' }}
          alt="Remy SHarp"
          src={`${serverURL}/images/1.jpg`} />

      </Toolbar>
    </AppBar>
    <Grid container spacing={1}>
      <Grid size={2} style={{ height: '100vh', width: '40vh' }}>
        {sideBar()}
      </Grid>
      <Grid size={9.6}>
        <Routes>
          <Route element={<Branch />} path="/branch" />
          <Route element={<StudentDisplay />} path="/studentdisplay" />
          <Route element={<StudentInterface />} path="/studentinterface" />
          <Route element={<EmployeeDisplay />} path="/employeedisplay" />
          <Route element={<EmployeeInterface />} path="/employeeinterface" />
          <Route element={<Section />} path="/section" />
          <Route element={<Batch />} path="/Batch" />
          <Route element={<DeliveryDisplay />} path="/deliverydisplay" />
          <Route element={<DeliveryIteface />} path="/deliveryinterface" />

        </Routes>
      </Grid>



    </Grid >
  </div >)

}

