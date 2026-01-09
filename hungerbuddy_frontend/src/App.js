
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './admin/category/Category';
import Branch from './admin/branch/Branch';
import BranchLogin from './admin/branch/BranchLogin';
import BranchDashboard from './admin/branch/BranchDashboard';
import FoodInterface from './admin/fooditem/FoodInterface';
import FoodDisplay from './admin/fooditem/FoodDisplay';
import BatchInterface from './admin/batchh/BatchInterface';
import BatchDisplay from './admin/batchh/BatchDisplay';
import SectionInterface from './admin/section/SectionInterface'
import SectionDisplay from './admin/section/SectionDisplay'
import StudentInterface from './admin/student/studentinterface'
import StudentDispaly from './admin/student/studentDisplay'
import AdminLogin from './admin/adminlogin/AdminLogin.js';
import AdminDashboard from './admin/adminlogin/AdminDashboard.js';
import EmployeeInterface from './admin/employee/employeeinterface.js'
import EmployeeDisplay from './admin/employee/EmployeeDisplay.js';

import { formControlClasses } from '@mui/material';
function App() {
  return (
    <div style={{ fontFamily: 'Montserrat' }}>
      <Router>
        <Routes>
          {/* <Route element={<Category />} path="/category" /> */}
          {/* <Route element={<Branch />} path="/branch" /> */}
          <Route element={<BranchLogin/>} path="/branchlogin" />
          <Route element={<BranchDashboard/>} path="/branchdashboard/*" />
         {/* <Route element={<FoodInterface/>} path="/foodInterface"/>
         <Route element={<FoodDisplay/>} path="/FoodDisplay"/> */}

         {/* <Route element={<BatchInterface/>} path="/batchinterface"/>
         <Route element={<BatchDisplay/>} path="/batchdisplay"/>
         
         <Route element={<SectionInterface/>} path="/sectioninterface"/>
         <Route element={<SectionDisplay/>} path="/sectiondisplay"/> */}

          {/* <Route element={<StudentInterface/>} path="/studentinterface"/>
          <Route element={<StudentDispaly/>} path="/studentdispaly"/> */}

          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>

            {/* <Route element={<EmployeeInterface/>} path="/employeeinterface"/>

            <Route element={<EmployeeDisplay/>} path="/employeedisplay"/> */}

         

        </Routes>
      </Router>
    </div>
  )
}
export default App