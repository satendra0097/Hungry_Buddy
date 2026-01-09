var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
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
router.get('/fetch_states', function (req, res, next) {
    pool.query("select * from states", function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: 'Database Error Pls contact in backend...' })
        }
        else {
            res.status(200).json({ status: true, message: ' Successfully..', data: result })
        }
    })
});
router.post('/fetch_cities', function (req, res, next) {
    pool.query("select * from cities where stateid=?", [req.body.stateid], function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: 'Database Error Pls contact in backend...' })
        }
        else {
            res.status(200).json({ status: true, message: ' Successfully..', data: result })
        }
    })
});

router.post('/submit_record', upload.single('photograph'), function (req, res, next) {
    console.log(req.body)
    try {
        pool.query('INSERT INTO deliverybody (branchid, deliveryname, dob, gender, mobileno,state, city, aadharno, status, vehicleno, photograph, password,emailid, address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.branchid,
                req.body.deliveryname,
                req.body.dob,
                req.body.gender,
                req.body.mobileno,
                req.body.city,
                req.body.state,
                req.body.aadharno,
                req.body.status,
                req.body.vehicleno,
                req.file?.filename,
                req.body.password,
                req.body.emailid,
                req.body.address,
            ], function (error, result) { 
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: false, message: 'Database Error....' });
                }
                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Food Delivery Succssfully....' });
                }
            })
    }

    catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: 'Critical Error in backend...' });
    }
});

// display the Delivery records...

router.get('/fetch_all_delivery', function (req, res, next) {

    try {
        pool.query('SELECT D.*,(SELECT B.branchname FROM branch B WHERE B.branchid = D.branchid) AS branchname,(SELECT ST.statename FROM states ST WHERE ST.stateid = D.state)AS statename,(SELECT C.cityname FROM cities C WHERE C.cityid = D.city) AS cityname FROM deliverybody D', function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({ status: false, message: 'Database Error....' });
            }
            else {
                // console.log(result);
                res.status(200).json({ data: result, status: true, message: 'Successfully.....' });
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Database Error....' });
    }
})


router.post('/edit_picture', upload.single('photograph'), function (req, res, next) {
    // console.log(req.body,req.file)
    try {
        pool.query('update deliverybody set photograph=? where deliveri_id=?', [req.file.filename, req.body.deliveri_id], function (error, result) {
            // console.log(req.file)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error Please Contact backend Team....' })
            }
            else {
                // console.log(result)
                res.status(200).json({ status: true, message: 'Picture Updated Successfully...' })
            }
        })
    }

    catch (e) {
        console.log(e)
        res.status(500).json({ status: false, message: 'Critical Error Please Contact backend Team....' })
    }
});

router.post('/delete_record', function (req, res, next) {
    try {

        pool.query('delete from deliverybody where deliveri_id=?', [req.body.deliveri_id], function (error, result) {
            console.log(req.body)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error....' });
            }
            else {
                console.log(result)
                res.status(200).json({ status: true, message: 'Delivery Record Deleted Successfully.....' });
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' });
    }
});

router.post('/edit_record', function (req, res, next) {
    console.log('hi ', req.body)
    try {
        pool.query('UPDATE deliverybody SET branchid=?, deliveryname=?,emailid=?,mobileno=?,address=?,city=?,state=?,status=?,vehicleno=?,aadharno=?,dob=?,gender=? WHERE deliveri_id=?',
            [
                
                req.body.branchid,
                req.body.deliveryname,
                req.body.emailid,
                req.body.mobileno,
                req.body.address,
                req.body.city,
                req.body.state,
                req.body.status,
                req.body.vehicleno,
                req.body.aadharno,
                req.body.dob,
                req.body.gender,
                req.body.deliveri_id

            ], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ status: false, message: 'Database Error Please Contact Bankend Team....' })
                }
                else {
                    console.log(result)
                    res.status(200).json({ status: true, message: 'Delivery Record Updated Successfully....' })
                }
            }
        )
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' })
    }
})

module.exports = router;