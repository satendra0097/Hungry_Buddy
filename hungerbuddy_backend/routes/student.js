// routes/student.js

var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');
var upload = require("./multer");

// ============================================
// 1. GET - Fetch All Students (With State & City Names)
// ============================================
router.get('/fetch_all_student', function (req, res, next) {
  pool.query(
    `SELECT 
      s.*,
      st.statename as state_name,
      c.cityname as city_name
    FROM students s
    LEFT JOIN states st ON s.current_state = st.stateid
    LEFT JOIN cities c ON s.current_city = c.cityid`,
    function (error, result) {
      if (error) {
        console.log('❌ Error:', error);
        res.status(500).json({ 
          status: false, 
          message: 'Database Error: ' + error.sqlMessage 
        });
      } else {
        console.log('Students fetched:', result.length);
        res.status(200).json({ 
          status: true, 
          message: 'Successfully', 
          data: result 
        });
      }
    }
  );
});

// ============================================
// 2. POST - Get Student by Enrollment No (With Names)
// ============================================
router.post('/fetch_student_by_enrollment', function (req, res, next) {
  const enrollmentno = req.body.enrollmentno;
  
  if (!enrollmentno) {
    return res.status(400).json({ 
      status: false, 
      message: 'Enrollment No is required' 
    });
  }
  
  pool.query(
    `SELECT 
      s.*,
      st.statename as state_name,
      c.cityname as city_name
    FROM students s
    LEFT JOIN states st ON s.current_state = st.stateid
    LEFT JOIN cities c ON s.current_city = c.cityid
    WHERE s.enrollmentno = ?`,
    [enrollmentno], 
    function (error, result) {
      if (error) {
        console.log('❌ Error:', error);
        res.status(500).json({ 
          status: false, 
          message: 'Database Error: ' + error.sqlMessage 
        });
      } else if (result.length === 0) {
        res.status(404).json({ 
          status: false, 
          message: 'Student not found with Enrollment No: ' + enrollmentno 
        });
      } else {
        console.log('✅ Student found:', result[0].studentname);
        res.status(200).json({ 
          status: true, 
          message: 'Successfully', 
          data: result[0] 
        });
      }
    }
  );
});

// ============================================
// 3. POST - Submit/Add New Student
// ============================================
router.post('/submit_students', upload.single('studenticon'), function (req, res, next) {
  console.log('📝 Student Data:', req.body);
  
  try {
    pool.query(
      `INSERT INTO students (
        enrollmentno, branchid, batchid, sectionid, studentname, dob, gender, 
        fathername, mothername, mobileno, fathercontactno, mothercontactno,
        current_address, current_state, current_city, current_pincode,
        permanent_pincode, emailid, permanent_city, permanent_state,
        permanentaddress, createddate, createdtime, userid
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      
      [
        req.body.enrollmentno,
        req.body.branchid, 
        req.body.batchid, 
        req.body.sectionid, 
        req.body.studentname, 
        req.body.dob, 
        req.body.gender, 
        req.body.fathername, 
        req.body.mothername, 
        req.body.mobileno, 
        req.body.fathercontactno, 
        req.body.mothercontactno, 
        req.body.current_address, 
        req.body.current_state, 
        req.body.current_city, 
        req.body.current_pincode, 
        req.body.permanent_pincode, 
        req.body.emailid, 
        req.body.permanent_city,
        req.body.permanent_state,
        req.body.permanentaddress, 
        req.body.createddate, 
        req.body.createdtime, 
        req.body.userid
      ], 
      
      function (error, result) {
        if (error) {
          console.log('❌ Error:', error);
          res.status(500).json({ 
            status: false, 
            message: 'Database Error: ' + error.sqlMessage 
          });
        } else {
          console.log('✅ Student Submitted:', req.body.studentname);
          res.status(200).json({ 
            status: true, 
            message: 'Student Submitted Successfully....' 
          });
        }
      }
    );
  } catch (e) {
    console.log('❌ Error:', e);
    res.status(500).json({ 
      status: false, 
      message: 'Critical Error Please Contact Backend Team...' 
    });
  }
});

// ============================================
// 4. POST - Edit/Update Student
// ============================================
router.post('/edit_students', upload.none(), function (req, res, next) {
  console.log('📝 Edit Student Data:', req.body);
  
  try {
    if (!req.body.enrollmentno) {
      return res.status(400).json({ 
        status: false, 
        message: 'Enrollment No is required for update' 
      });
    }

    pool.query(
      `UPDATE students SET 
        studentname = ?,
        fathername = ?,
        mobileno = ?,
        emailid = ?,
        gender = ?,
        current_state = ?,
        current_city = ?,
        current_pincode = ?,
        current_address = ?
      WHERE enrollmentno = ?`,
      
      [
        req.body.studentname || '',
        req.body.fathername || '',
        req.body.mobileno || '',
        req.body.emailid || '',
        req.body.gender || '',
        req.body.current_state || '',
        req.body.current_city || '',
        req.body.current_pincode || '',
        req.body.current_address || '',
        req.body.enrollmentno
      ], 
      
      function (error, result) {
        if (error) {
          console.log('❌ Database Error:', error);
          res.status(500).json({ 
            status: false, 
            message: 'Database Error: ' + error.sqlMessage 
          });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ 
            status: false, 
            message: 'Student not found with Enrollment No: ' + req.body.enrollmentno 
          });
        } else {
          console.log('✅ Student Updated:', req.body.studentname);
          res.status(200).json({ 
            status: true, 
            message: 'Student Updated Successfully....' 
          });
        }
      }
    );
  } catch (e) {
    console.log('❌ Critical Error:', e);
    res.status(500).json({ 
      status: false, 
      message: 'Critical Error Please Contact Backend Team....' 
    });
  }
});

// ============================================
// 5. GET - Fetch Branch List
// ============================================
router.get('/branch_id_fill', function (req, res, next) {
  pool.query('SELECT * FROM branch', function (error, result) {
    if (error) {
      res.status(500).json({ 
        status: false, 
        message: 'Branch Database error...' 
      });
    } else {
      res.status(200).json({ 
        status: true, 
        message: 'Branch Fill Successfully...', 
        data: result 
      });
    }
  });
});

// ============================================
// 6. POST - Fetch Batch List
// ============================================
router.post('/batch_id_fill', function (req, res, next) {
  pool.query(
    'SELECT * FROM batch WHERE branchid=?', 
    [req.body.branchid], 
    function (error, result) {
      if (error) {
        res.status(500).json({ 
          status: false, 
          message: 'Batch Database error...' 
        });
      } else {
        res.status(200).json({ 
          status: true, 
          message: 'Batch Fill Successfully...', 
          data: result 
        });
      }
    }
  );
});

// ============================================
// 7. POST - Fetch Section List
// ============================================
router.post('/section_id_fill', function (req, res, next) {
  pool.query(
    'SELECT * FROM section WHERE branchid=?', 
    [req.body.branchid], 
    function (error, result) {
      if (error) {
        res.status(500).json({ 
          status: false, 
          message: 'Section Database error...' 
        });
      } else {
        res.status(200).json({ 
          status: true, 
          message: 'Section Fill Successfully...', 
          data: result 
        });
      }
    }
  );
});

// ============================================
// 8. GET - Fetch States List
// ============================================
router.get('/fetch_states', function (req, res, next) {
  pool.query("SELECT * FROM states", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ 
        status: false, 
        message: 'Database Error Please Contact Backend Team...' 
      });
    } else {
      res.status(200).json({ 
        status: true, 
        message: 'Successfully', 
        data: result 
      });
    }
  });
});

// ============================================
// 9. POST - Delete Student
// ============================================
router.post('/delete_students', function (req, res, next) {
  try {
    pool.query(
      'DELETE FROM students WHERE enrollmentno=?', 
      [req.body.enrollmentno], 
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ 
            status: false, 
            message: 'Database Error....' 
          });
        } else {
          res.status(200).json({ 
            status: true, 
            message: 'Student Deleted Successfully.....' 
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ 
      status: false, 
      message: 'Critical Error Please Contact Backend Team....' 
    });
  }
});

// ============================================
// 10. GET - Fetch Single Student by ID
// ============================================
router.get('/fetch_student_by_id', function (req, res, next) {
  const studentId = req.query.studentid;
  
  if (!studentId) {
    return res.status(400).json({ 
      status: false, 
      message: 'Student ID is required' 
    });
  }
  
  pool.query(
    `SELECT 
      s.*,
      st.statename as state_name,
      c.cityname as city_name
    FROM students s
    LEFT JOIN states st ON s.current_state = st.stateid
    LEFT JOIN cities c ON s.current_city = c.cityid
    WHERE s.studentid = ?`,
    [studentId], 
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ 
          status: false, 
          message: 'Database Error: ' + error.sqlMessage 
        });
      } else if (result.length === 0) {
        res.status(404).json({ 
          status: false, 
          message: 'Student not found' 
        });
      } else {
        res.status(200).json({ 
          status: true, 
          message: 'Successfully', 
          data: result[0] 
        });
      }
    }
  );
});

module.exports = router;