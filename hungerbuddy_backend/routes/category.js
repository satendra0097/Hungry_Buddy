var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/submit_category', upload.single('categoryicon'), function (req, res) {
  try {
    pool.query('insert into foodcategory(branchid,categoryname,categoryicon,createddate,createdtime,userid) values(?,?,?,?,?,?)', [req.body.branchid, req.body.categoryname, req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Category Submitted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_all_category', function (req, res) {
  try {
    pool.query('select * from foodcategory', function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ data: result, status: true, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_category', function (req, res) {
  try {
    pool.query('update foodcategory set categoryname=?,createdtime=?,createddate=?,userid=? where categoryid=?', [req.body.categoryname, req.body.createdtime, req.body.createddate, req.body.userid, req.body.categoryid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Category Updated Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/delete_category', function (req, res) {
  try {
    pool.query('delete from foodcategory where categoryid=?', [req.body.categoryid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Category Deleted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_picture', upload.single('categoryicon'), function (req, res) {
  try {
    pool.query('update foodcategory set categoryicon=?,createddate=?,createdtime=?,userid=? where categoryid=?', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Picture Updated Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

module.exports = router;
