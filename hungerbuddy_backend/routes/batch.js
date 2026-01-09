var express = require('express');
var router = express.Router();
var pool = require('./pool');
var require = require('./multer');

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

router.post('/submit_batch', function (req, res) {
    try {
        pool.query('insert into batch (batchid, batchname, branchid, session, createddate, createdtime, userid) values(?,?,?,?,?,?,?)',
            [
                req.body.batchid,
                req.body.batchname,
                req.body.branchid,
                req.body.session,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
            ],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: false, message: 'Database Error....' });
                }
                else {
                    // console.log(result);
                    res.status(200).json({ status: true, message: 'Batch Submit Successfully...' });
                }
            }
        )
    }
    catch (e) {
        // console.log(e);
        res.status(500).json({ status: false, message: 'Critical Database Error....' });
    }
})

router.get('/fetch_all_batch', function (req, res, next) {
    // G for Batch
    try {
        pool.query('select G.*,(select B.branchname from branch B where B.branchid=G.branchid) as branchname from batch G', function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'Database Error....' });
            }
            else {
                // console.log(result);
                res.status(200).json({ data: result, status: true, message: 'Successfully....'});
            }
        }
        )
    }

    catch (e) {
        res.status(500).json({ status: false, message: 'Database Error....' });
    }
})

router.post('/edit_batch', function (req, res, next) {
    try {
        pool.query('update batch set batchname=?, session=?, createddate=?, createdtime=?, userid=? , branchid=? where batchid=?', [
            req.body.batchname,
            req.body.session,
            req.body.createddate,
            req.body.createdtime,
            req.body.userid,
            req.body.branchid,
            req.body.batchid
        ], function (error, result) {
            if (error) {
                // console.log(error)
                res.status(500).json({ status: false, message: 'Database Error Please Contact Bankend Team....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Batch Updated Successfully....' })
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' })
    }
})

router.post('/delete_batch', function (req, res, next) {
    try {

        pool.query('delete from batch where batchid=?', [req.body.batchid], function (error, result) {
            if (error) {
                console(error)
                res.status(500).json({ status:false, message: 'Database Error....' });
            }
            else {
                // console(result)
                res.status(200).json({ status:true, message: 'Batch Deleted Successfully.....' });
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' });
    }
});

module.exports = router;
