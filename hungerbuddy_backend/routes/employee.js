var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require("./multer");

router.post('/submit_employees', upload.single("picture"), function (req, res) {
  try {
    pool.query('insert into employees (branchid,employeename,dob,gender,emailid,mobileno,otherno,department,current_address,current_state,current_city,current_pincode,permanent_address,permanent_state,permanent_city,permanent_pincode,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [req.body.branchid, req.body.employeename, req.body.dob, req.body.gender, req.body.emailid, req.body.mobileno, req.body.otherno, req.body.department, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.permanentaddress, req.body.permanentstate, req.body.permanentcity, req.body.permanentpincode, req.file.filename],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Employee Submitted Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_all_employee', function (req, res) {
  pool.query("select * from employees", function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.get('/branch_id_fill', function (req, res) {
  pool.query('select * from branch', function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

module.exports = router;
