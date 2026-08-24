var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/submit_address", function (req, res) {
  pool.query(
    `INSERT INTO user_address
    (
      pincode,
      house_no,
      floor_no,
      tower_no,
      building_name,
      address,
      landmark_area,
      receiver_name,
      receiver_phone,
      active,
      enrollmentno
    )
    VALUES(?,?,?,?,?,?,?,?,?,0,?)`,
    [
      req.body.pincode,
      req.body.house_no,
      req.body.floor_no,
      req.body.tower_no,
      req.body.building_name,
      req.body.address,
      req.body.landmark_area,
      req.body.receiver_name,
      req.body.receiver_phone,
      req.body.enrollmentno
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.json({
          status: false,
          message: "Database Error",
        });
      }

      res.json({
        status: true,
        message: "Address Saved Successfully",
      });
    }
  );
});

router.post("/set_active", function (req, res) {
  pool.query(
    `Update user_address set active = ? where id = ?`, [req.body.active, req.body.id],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.json({
          status: false,
          message: "Database Error",
        });
      }

      res.json({
        status: true,
        message: "Address Saved Successfully",
      });
    }
  );
});

router.get('/fetch_all_user_address', function (req, res, next) {
  pool.query("select * from user_address", function (error, result) {
    console.log(result)
    if (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Database Error Please Contact Backend Team...' })
    }
    else {
      res.status(200).json({ status: true, message: 'Successfully', data: result })
    }
  })
});

module.exports = router;