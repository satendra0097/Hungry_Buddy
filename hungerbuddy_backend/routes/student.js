var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');
var upload = require("./multer");

router.post('/submit_students', upload.single('studenticon'), function (req, res, next) {
    // console.log("adaf",req.file)
                    console.log('uidfghutfhg', req.body)
    try {
        pool.query('insert into students(branchid,batchid,sectionid,studentname,dob,gender,fathername,mothername,mobileno,fathercontactno,mothercontactno,current_address,current_state,current_city,current_pincode,permanent_pincode,emailid,permanent_city,permanent_state,permanentaddress,createddate,createdtime,userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [ req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.permanent_pincode, req.body.emailid, req.body.permanent_city,req.body.permanent_state,req.body.permanentaddress, req.body.createddate, req.body.createdtime, req.body.userid], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
                }
                else {
                    console.log('uidfghutfhg', req.body)
                    res.status(200).json({ status: true, message: 'Student Submitted Successfully....' })
                }
            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

    }
});

router.get('/branch_id_fill', function (req, res, next) {
    pool.query('select * from branch', function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({ status: false, message: 'Branch Database error...' });
        }
        else {
            // console.log(result);
            res.status(200).json({ status: true, message: 'Branch Fill Successfully...', data: result });
        }
    })
});

router.post('/batch_id_fill', function (req, res, next) {
    pool.query('select * from batch where branchid=?', [req.body.branchid], function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({ status: false, message: 'Batch Database error...' });
        }
        else {
            // console.log(result);
            res.status(200).json({ status: true, message: 'Batch Fill Successfully...', data: result });
        }
    })
});

router.post('/section_id_fill', function (req, res, next) {
    pool.query('select * from section where branchid=?', [req.body.branchid], function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({ status: false, message: 'Section Database error...' });
        }
        else {
            // console.log(result);
            res.status(200).json({ status: true, message: 'Section Fill Successfully...', data: result });
        }
    })
});



router.get('/fetch_states', function (req, res, next) {
  pool.query("select * from states", function (error, result) {

   if (error) {
     console.log(error)
     res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
    }
    else {
      res.status(200).json({ status: true, message: 'Successfully', data: result })
    }
  })


 });

router.get('/fetch_all_student', function (req, res, next) {
  pool.query("select * from students", function (error, result) {

   if (error) {
     console.log(error)
     res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
    }
    else {
      res.status(200).json({ status: true, message: 'Successfully', data: result })
    }
  })
 });



router.post('/edit_students', upload.none(), function (req, res, next) {
   // console.log("adaf", req.body)
   try {
      pool.query('update students set  studentname=?, address=?, latlong=?, cityid=?, stateid=?, emailid=?, contactnumber=?, contactperson=?, userid=? where branchid=?', [req.body.branchname, req.body.address, req.body.latlong, req.body.cityid, req.body.stateid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.userid, req.body.branchid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
         }
         else {
            res.status(200).json({ status: true, message: 'Branch Updated Successfully....' })
         }
      })

   }
   catch (e) {
      res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

   }
});





router.post('/delete_students', function (req, res, next) {
    try {

        pool.query('delete from students where studentid=?', [req.body.studentid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status:false, message: 'Database Error....' });
            }
            else {
                // console(result)
                res.status(200).json({ status:true, message: 'Section Deleted Successfully.....' });
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' });
    }
});


module.exports = router;
