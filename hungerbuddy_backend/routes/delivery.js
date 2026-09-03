var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.get('/branch_id_fill', function (req, res) {
  pool.query('select * from branch', function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.get('/fetch_states', function (req, res) {
  pool.query("select * from states", function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/fetch_cities', function (req, res) {
  pool.query("select * from cities where stateid=?", [req.body.stateid], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/submit_record', upload.single('photograph'), function (req, res) {
  try {
    pool.query('INSERT INTO deliveryboy (branchid, deliveryname, dob, gender, mobileno, state, city, aadharno, status, vehicleno, photograph, password, emailid, address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [req.body.branchid, req.body.deliveryname, req.body.dob, req.body.gender, req.body.mobileno, req.body.city, req.body.state, req.body.aadharno, req.body.status, req.body.vehicleno, req.file?.filename, req.body.password, req.body.emailid, req.body.address],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Delivery Submitted Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_all_delivery', function (req, res) {
  try {
    pool.query('SELECT D.*,(SELECT B.branchname FROM branch B WHERE B.branchid = D.branchid) AS branchname,(SELECT ST.statename FROM states ST WHERE ST.stateid = D.state) AS statename,(SELECT C.cityname FROM cities C WHERE C.cityid = D.city) AS cityname FROM deliveryboy D', function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ data: result, status: true, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_picture', upload.single('photograph'), function (req, res) {
  try {
    pool.query('update deliveryboy set photograph=? where deliveri_id=?', [req.file.filename, req.body.deliveri_id], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ status: true, message: 'Picture Updated Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/delete_record', function (req, res) {
  try {
    pool.query('delete from deliveryboy where deliveryid=?', [req.body.deliveryid], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ status: true, message: 'Delivery Record Deleted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_record', function (req, res) {
  try {
    pool.query('update deliveryboy set branchid=?,deliveryname=?,dob=?,gender=?,mobileno=?,state=?,city=?,aadharno=?,status=?,vehicleno=?,photograph=?,password=?,emailid=?,address=?,createdate=?,createtime=? where deliveryid=?',
      [req.body.branchid, req.body.deliveryname, req.body.dob, req.body.gender, req.body.mobileno, req.body.state, req.body.city, req.body.aadharno, req.body.status, req.body.vehicleno, req.body.photograph, req.body.password, req.body.emailid, req.body.address, req.body.createdate, req.body.createtime, req.body.deliveryid],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Delivery Updated Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

module.exports = router;
