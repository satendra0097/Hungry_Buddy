var express = require('express');
var router = express.Router();
var pool = require('./pool');

var upload = require("./multer");


router.post('/submit_employees', upload.single("picture"),
  function (req, res, next) {
    // console.log(req.body)
    try  {
        pool.query('insert into employees (branchid,employeename,dob,gender,emailid,mobileno,otherno,department,current_address,current_state,current_city,current_pincode,permanent_address,permanent_state,permanent_city,permanent_pincode,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.branchid,req.body.employeename,req.body.dob,req.body.gender,req.body.emailid,req.body.mobileno,req.body.otherno,req.body.department,req.body.current_address,req.body.current_state,req.body.current_city,req.body.current_pincode,req.body.permanentaddress,req.body.permanentstate,req.body.permanentcity,req.body.permanentpincode,req.file.filename

            ],function (error, result) {
                if (error) {
                    // console.log(error)
                    res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
                }
                else {
                    //  console.log('uidfghutfhg', req.body)
                    res.status(200).json({ status: true, message: 'Employee Submitted Successfully....' })
                }
            })
    }
    catch (e) {
        // console.log(e)
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

    }
});

router.get('/fetch_all_employee', function (req, res, next) {
  pool.query("select * from employees", function (error, result) {
    console.log(req.body)
   if (error) {
     console.log(error)
     res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
    }
    else {
        console.log(result)
      res.status(200).json({ status: true, message: 'Successfully', data: result })
    }
  })
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


// router.post('/edit_employee', upload.none(), function (req, res, next) {
//    // console.log("adaf", req.body)
//    try {
//       pool.query('update employees set  branchname=?, address=?, latlong=?, cityid=?, stateid=?, emailid=?, contactnumber=?, contactperson=?, userid=? where branchid=?', [req.body.branchname, req.body.address, req.body.latlong, req.body.cityid, req.body.stateid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.userid, req.body.branchid], function (error, result) {
//          if (error) {
//             console.log(error)
//             res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
//          }
//          else {
//             res.status(200).json({ status: true, message: 'Branch Updated Successfully....' })
//          }
//       })

//    }
//    catch (e) {
//       res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

//    }
// });

module.exports = router;
