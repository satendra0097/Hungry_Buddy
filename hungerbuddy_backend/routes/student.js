var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require("./multer");

router.get('/fetch_all_student', function (req, res) {
  pool.query(`SELECT s.*, st.statename as state_name, c.cityname as city_name FROM students s LEFT JOIN states st ON s.current_state = st.stateid LEFT JOIN cities c ON s.current_city = c.cityid`, function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/fetch_student_by_enrollment', function (req, res) {
  const enrollmentno = req.body.enrollmentno;
  if (!enrollmentno) return res.status(400).json({ status: false, message: 'Enrollment No is required' });
  pool.query(`SELECT s.*, st.statename as state_name, c.cityname as city_name FROM students s LEFT JOIN states st ON s.current_state = st.stateid LEFT JOIN cities c ON s.current_city = c.cityid WHERE s.enrollmentno = ?`, [enrollmentno], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    if (result.length === 0) return res.status(404).json({ status: false, message: 'Student not found' });
    res.status(200).json({ status: true, message: 'Success', data: result[0] });
  });
});

router.post('/submit_students', upload.single('studenticon'), function (req, res) {
  try {
    pool.query(`INSERT INTO students (enrollmentno, branchid, batchid, sectionid, studentname, dob, gender, fathername, mothername, mobileno, fathercontactno, mothercontactno, current_address, current_state, current_city, current_pincode, permanent_pincode, emailid, permanent_city, permanent_state, permanentaddress, createddate, createdtime, userid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [req.body.enrollmentno, req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.permanent_pincode, req.body.emailid, req.body.permanent_city, req.body.permanent_state, req.body.permanentaddress, req.body.createddate, req.body.createdtime, req.body.userid],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Student Submitted Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_students', upload.none(), function (req, res) {
  try {
    if (!req.body.enrollmentno) return res.status(400).json({ status: false, message: 'Enrollment No is required' });
    pool.query(`UPDATE students SET studentname=?, fathername=?, mobileno=?, emailid=?, gender=?, current_state=?, current_city=?, current_pincode=?, current_address=? WHERE enrollmentno=?`,
      [req.body.studentname || '', req.body.fathername || '', req.body.mobileno || '', req.body.emailid || '', req.body.gender || '', req.body.current_state || '', req.body.current_city || '', req.body.current_pincode || '', req.body.current_address || '', req.body.enrollmentno],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        if (result.affectedRows === 0) return res.status(404).json({ status: false, message: 'Student not found' });
        res.status(200).json({ status: true, message: 'Student Updated Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/branch_id_fill', function (req, res) {
  pool.query('SELECT * FROM branch', function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/batch_id_fill', function (req, res) {
  pool.query('SELECT * FROM batch WHERE branchid=?', [req.body.branchid], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/section_id_fill', function (req, res) {
  pool.query('SELECT * FROM section WHERE branchid=?', [req.body.branchid], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.get('/fetch_states', function (req, res) {
  pool.query("SELECT * FROM states", function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/delete_students', function (req, res) {
  try {
    pool.query('DELETE FROM students WHERE enrollmentno=?', [req.body.enrollmentno], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ status: true, message: 'Student Deleted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_student_by_id', function (req, res) {
  const studentId = req.query.studentid;
  if (!studentId) return res.status(400).json({ status: false, message: 'Student ID is required' });
  pool.query(`SELECT s.*, st.statename as state_name, c.cityname as city_name FROM students s LEFT JOIN states st ON s.current_state = st.stateid LEFT JOIN cities c ON s.current_city = c.cityid WHERE s.studentid = ?`, [studentId], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    if (result.length === 0) return res.status(404).json({ status: false, message: 'Student not found' });
    res.status(200).json({ status: true, message: 'Success', data: result[0] });
  });
});

module.exports = router;
