var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.get('/branch_id_fill', function (req, res) {
  pool.query('select * from branch', function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/batch_id_fill', function (req, res) {
  pool.query('select * from batch where branchid=?', [req.body.branchid], function (error, result) {
    if (error) return res.status(500).json({ status: false, message: 'Database Error' });
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/submit_section', function (req, res) {
  try {
    pool.query('insert into section (sectionid, branchid, batchid, sectionname, createddate, createdtime, userid) values(?,?,?,?,?,?,?)',
      [req.body.sectionid, req.body.branchid, req.body.batchid, req.body.sectionname, req.body.createddate, req.body.createdtime, req.body.userid],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Section Submitted Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.get('/fetch_all_section', function (req, res) {
  try {
    pool.query('select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select G.batchname from batch G where G.batchid = S.batchid) as batchname from section S', function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ data: result, status: true, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_section', function (req, res) {
  try {
    pool.query('update section set sectionname=?, batchid=?, createddate=?, createdtime=?, userid=?, branchid=? where sectionid=?',
      [req.body.sectionname, req.body.batchid, req.body.createddate, req.body.createdtime, req.body.userid, req.body.branchid, req.body.sectionid],
      function (error, result) {
        if (error) return res.status(500).json({ status: false, message: 'Database Error' });
        res.status(200).json({ status: true, message: 'Section Updated Successfully' });
      });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/delete_section', function (req, res) {
  try {
    pool.query('delete from section where sectionid=?', [req.body.sectionid], function (error, result) {
      if (error) return res.status(500).json({ status: false, message: 'Database Error' });
      res.status(200).json({ status: true, message: 'Section Deleted Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

module.exports = router;
