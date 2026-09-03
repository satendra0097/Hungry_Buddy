var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.post("/submit_address", function (req, res) {
  try {
    pool.query(
      `INSERT INTO user_address (pincode, house_no, floor_no, tower_no, building_name, address, landmark_area, receiver_name, receiver_phone, active, enrollmentno) VALUES(?,?,?,?,?,?,?,?,?,0,?)`,
      [req.body.pincode, req.body.house_no, req.body.floor_no, req.body.tower_no, req.body.building_name, req.body.address, req.body.landmark_area, req.body.receiver_name, req.body.receiver_phone, req.body.enrollmentno],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "Address Saved Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.post("/edit_address", function (req, res) {
  try {
    pool.query(
      `UPDATE user_address SET pincode=?, house_no=?, floor_no=?, tower_no=?, building_name=?, address=?, landmark_area=?, receiver_name=?, receiver_phone=? WHERE id=?`,
      [req.body.pincode, req.body.house_no, req.body.floor_no, req.body.tower_no, req.body.building_name, req.body.address, req.body.landmark_area, req.body.receiver_name, req.body.receiver_phone, req.body.id],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "Address Updated Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.post("/set_active", function (req, res) {
  try {
    pool.query(`Update user_address set active = ? where id = ?`, [req.body.active, req.body.id], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: "Database Error" });
      }
      res.status(200).json({ status: true, message: "Address Updated Successfully" });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.get('/fetch_all_user_address', function (req, res) {
  try {
    pool.query("select * from user_address", function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, message: 'Success', data: result });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

module.exports = router;
