var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post("/submit_fooditem", upload.single("picture"), function (req, res) {
  try {
    pool.query(
      "insert into fooditems(branchid,foodcategoryid, fooditemname, fooditemtype, fooditemtaste, ingridients, fullprice, halfprice, offerprice, status, rating, picture) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [req.body.branchid, req.body.foodcategoryid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingridients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.body.status, req.body.ratings, req.file.filename],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "Food Item Submitted Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.get('/fetch_all_category', function (req, res) {
  pool.query("SELECT * FROM foodcategory", function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: "Database Error" });
    }
    res.status(200).json({ status: true, data: result });
  });
});

router.get('/fetch_all_fooditems', function (req, res) {
  try {
    pool.query('select * from fooditems', function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ data: result, status: true, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/editfood', function (req, res) {
  try {
    pool.query('UPDATE fooditems SET foodcategoryid = ?, fooditemname = ?,fooditemtype = ?,fooditemtaste = ?,ingridients = ?,fullprice = ?,halfprice = ?,offerprice = ?,status = ?,rating = ? WHERE fooditemid = ?', [req.body.foodcategoryid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingridients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.body.status, req.body.ratings, req.body.fooditemid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Food Item Updated Successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/delete_fooditem', function (req, res) {
  try {
    pool.query('DELETE FROM fooditems WHERE fooditemid = ?', [req.body.fooditemid.fooditemid], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Food item deleted successfully' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/edit_picture', upload.single(''), function (req, res) {
  try {
    pool.query('update fooditems set categoryicon=?,createddate=?,createdtime=?,userid=? where categoryid=?', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {
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
