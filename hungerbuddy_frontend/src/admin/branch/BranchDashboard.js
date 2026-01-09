
import { NavigationType, useNavigate } from "react-router-dom"
import { Button, Grid, AppBar, Toolbar, Avatar, ListItemButton, Divider } from "@mui/material"
import { serverURL } from "../../services/FatchNodeServices"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Foodcategory from '../branch/assets/Foodcategory.png'
import FoodDisplay from '../../admin/fooditem/FoodDisplay';

import Fooditem from "../fooditem/FoodInterface";

import fooditemimage from './assets/fooditem.png'


import Orders from '../branch/assets/Orders.png';
import Logout from '../branch/assets/Logout.png';
import Dashboard from '../branch/assets/dashboard.png'
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Category from "../category/Category";
import { Route, Routes } from "react-router-dom";

export default function BranchDashboard() {

  var navigate = useNavigate()
  const handleClick = () => {
    navigate('/branch')
  }


  const handleLogout = () => {
    localStorage.removeItem('Token')
  }
  const sideBar = () => {
    return (<div style={{ background: "hsla(321, 36%, 91%, 1.00)", margin: 10, borderRadius: 3, height: '70%' }}>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={Dashboard} sx={{ width: 30, height: 30 }} variant="rounded">

              <DashboardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Dashboard</div>} />
        </ListItem>

        <Divider />
        <ListItemButton onClick={()=>navigate('/branchdashboard/category')}>
          <ListItemAvatar>
            <Avatar src={Foodcategory} sx={{ width: 30, height: 30 }} variant="rounded">

            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Food Category</div>} />
        </ListItemButton>

        <ListItemButton  onClick={()=>navigate('/branchdashboard/fooddisplay')}>
          <ListItemAvatar>
            <Avatar src={fooditemimage} sx={{ width: 30, height: 30 }} variant="rounded">

            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Food Item</div>} />
        </ListItemButton>

        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={Orders} sx={{ width: 30, height: 30 }} variant="rounded">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<div style={{ fontFamily: 'Montserrat' }}>Orders</div>} />
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
          <Route element={<Category />} path="/category" />
         <Route element={<FoodDisplay />} path="/fooddisplay" />
        <Route element={<Fooditem />} path="/fooditem" />
        </Routes>
      </Grid>



    </Grid >
  </div >)
  
}

