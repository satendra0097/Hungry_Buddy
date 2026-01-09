var express = require("express");
var router = express.Router();

var upload = require("./multer");
var pool = require("./pool");
var dotenv = require("dotenv");
// var jsonwebtoken=require('jsonwebtoken')
// dotenv.config()
// var verifyToken = require("./authMiddleware");

router.post(
  "/submit_fooditem",
  upload.single("picture"),
  function (req, res, next) {
    try {
      // console.log(req.body);
      pool.query(
        "insert into fooditems(foodcategoryid, fooditemname, fooditemtype, fooditemtaste, ingridients, fullprice, halfprice, offerprice, status, rating, picture) values(?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.foodcategoryid,
          req.body.fooditemname,
          req.body.fooditemtype,
          req.body.fooditemtaste,
          req.body.ingridients,
          req.body.fullprice,
          req.body.halfprice,
          req.body.offerprice,
          req.body.status,
          req.body.ratings,
          req.file.filename,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              message: "Database Error Please Contact Bankend Team....",
            });
          } else {
            res.status(200).json({
              status: true,
              message: "Branch Submitted Successfully....",
            });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Critical Error Please Contact Bankend Team....",
      });
    }
  }
);

router.get("/fetch_all_category", function (req, res) {
  pool.query("SELECT * FROM foodcategory", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Database Error Please Contact Backend Team....",
      });
    } else {
      res.status(200).json({
        status: true,
        data: result,
      });
    }
 });
});



router.get('/fetch_all_fooditems', function (req, res, next) {
  // console.log("adaf",req.file)
  try {
    pool.query('select * from fooditems', function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
      }
      else {
        res.status(200).json({ data: result, status: true, message: 'Success' })
      }
    })

  }
  catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

  }
});




router.post('/editfood', function (req, res, next) {
  try {
    console.log(req.body)
    pool.query ('UPDATE fooditems SET foodcategoryid = ?, fooditemname = ?,fooditemtype = ?,fooditemtaste = ?,ingridients = ?,fullprice = ?,halfprice = ?,offerprice = ?,status = ?,rating = ? WHERE fooditemid = ?',[req.body.foodcategoryid,
          req.body.fooditemname,
          req.body.fooditemtype,
          req.body.fooditemtaste,
          req.body.ingridients,
          req.body.fullprice,
          req.body.halfprice,
          req.body.offerprice,
          req.body.status,
          req.body.ratings,
        req.body.fooditemid],
       

      function (error, result) {
         
        if (error) {

          console.log(error)
          res.status(300).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
        } else {
          res.status(200).json({ status: true, message: 'Category Updated Successfully....' })
        }
      }
    )
  } catch (e) {
    // console.log(e)
    res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })
  }
});



router.post('/delete_fooditem', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query(
      'DELETE FROM fooditems WHERE fooditemid = ?',
      [req.body.fooditemid.fooditemid], 
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: 'Database error — please contact backend team.',
          });
        } else {
          res.status(200).json({
            status: true,
            message: 'Food item deleted successfully.',
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: 'Critical error — please contact backend team.',
    });
  }
});



router.post('/edit_picture', upload.single(''), function (req, res, next) {
  try {
      console.log(req.body);
    pool.query('update fooditems set categoryicon=?,createddate=?,createdtime=?,userid=? where categoryid=?', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid,  req.body.categoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
      }
      else {
        res.status(200).json({ status: true, message: 'Picture Upadate Successfully....' })
      }
    })

  }
  catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error Please Contact Backend Team...' })

  }
});


module.exports = router;
