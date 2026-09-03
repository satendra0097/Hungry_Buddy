var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.get('/fetch_states', function (req, res) {
  pool.query("select * from states", function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: 'Database Error' });
    }
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

router.post('/fetch_cities', function (req, res) {
  pool.query("select * from cities where stateid=?", [req.body.sid], function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: 'Database Error' });
    }
    res.status(200).json({ status: true, message: 'Success', data: result });
  });
});

module.exports = router;
