var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');
var dotenv = require('dotenv');
var jsonwebtoken = require('jsonwebtoken');
var verifyToken = require('./authMiddleware');
dotenv.config();

router.post('/submit_branch', upload.none(), function (req, res) {
  try {
    pool.query('insert into branch(branchname, address, latlong, cityid, stateid, emailid, contactnumber, contactperson, userid, createddate, createdtime, password) values(?,?,?,?,?,?,?,?,?,?,?,?)',
      [req.body.branchname, req.body.address, req.body.latlong, req.body.cityid, req.body.stateid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.userid, req.body.date, req.body.time, req.body.password],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Branch Submitted Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_all_branch', verifyToken, function (req, res) {
  try {
    pool.query('select B.*,(select S.statename from states S where S.stateid=B.stateid) as statename, (select C.cityname from cities C where C.cityid=B.cityid) as cityname from branch B', function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ data: result, status: true, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_branch', upload.none(), function (req, res) {
  try {
    pool.query('update branch set branchname=?, address=?, latlong=?, cityid=?, stateid=?, emailid=?, contactnumber=?, contactperson=?, userid=? where branchid=?',
      [req.body.branchname, req.body.address, req.body.latlong, req.body.cityid, req.body.stateid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.userid, req.body.branchid],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Branch Updated Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/delete_branch', upload.none(), function (req, res) {
  try {
    pool.query('delete from branch where branchid=?', [req.body.branchid], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ status: true, message: 'Branch Deleted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/chk_branch_login', function (req, res) {
  try {
    pool.query('select * from branch where emailid=? and password=?', [req.body.emailid, req.body.password], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      if (result.length === 1) {
        var token = jsonwebtoken.sign({ branch_admin: result[0] }, process.env.JWT_KEY, { expiresIn: '5h' });
        res.status(200).json({ token, data: result[0], status: true, message: 'success' });
      } else {
        res.status(200).json({ status: false, message: 'Invalid emailid/password' });
      }
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

module.exports = router;
