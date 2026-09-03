var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require("./multer");

router.post("/submit_picture", upload.any(), function (req, res) {
  try {
    var files = req.files.map((item) => item.filename);
    pool.query(
      "insert into morepictures(categoryid, fooditemid, picture, createdate, createtime, userid) values(?,?,?,?,?,?)",
      [req.body.categoryid, req.body.fooditemid, files + "", req.body.createddate, req.body.createdtime, req.body.userid],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "Picture Uploaded Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.get("/fetch_fooditem/:categoryid", function (req, res) {
  pool.query("SELECT * FROM fooditems WHERE foodcategoryid = ?", [req.params.categoryid], function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: "Database Error" });
    }
    res.status(200).json({ status: true, message: "Success", data: result });
  });
});

router.post("/fetch_all_picture", function (req, res) {
  try {
    pool.query("select * from morepictures where fooditemid=?", [req.body.foodid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: "Database Error" });
      }
      res.status(200).json({ data: result[0], status: true, message: "Success" });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

module.exports = router;
