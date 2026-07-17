var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require("./multer");

router.post(
  "/submit_picture",
  upload.any(),
  function (req, res, next) {
     
    try {
      console.log(req.body);
      var files=req.files.map((item)=>{
        return item.filename
      })
     
      pool.query(
        "insert into morepictures(categoryid, fooditemid, picture, createdate, createtime, userid)values(?,?,?,?,?,?)",
        [
          req.body.categoryid,
          req.body.fooditemid,
           files+"",
          req.body.createddate,
          req.body.createdtime,
          req.body.userid,
         
          req.body.createddate,

        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              message: "error in database contach to the admin",
            });
          } else {
            res
              .status(200)
              .json({ status: true, message: "Picture Uploaded Successfully" });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "error in database contach to the admin",
      });
    }
  }
);


router.get("/fetch_fooditem/:categoryid", function (req, res) {
  const categoryid = req.params.categoryid;

  pool.query(
    "SELECT * FROM fooditems WHERE foodcategoryid = ?",
    [categoryid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: "Database Error Please Contact Backend Team...",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    }
  );
});


router.post("/fetch_all_picture", function (req, res, next) {
  console.log(req.body)
  try {
    pool.query("select * from morepictures where fooditemid=?",[req.body.foodid], function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: "error in database contach to the admin",
        });
      } else {
        res
          .status(200)
          .json({
            data: result[0],
            status: true,
            message: "Category fetched Successfully",
          });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contach to the admin",
    });
  }
});



module.exports = router;