var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.post("/submit_orders", function (req, res) {
  try {
    pool.query(
      "insert into orders(delivery_status, payment_type, paymentid) values(?,?,?)",
      [req.body.delivery_status, req.body.payment_type, req.body.paymentid],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, orderid: result.insertId, message: "Order Added Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.post("/submit_order_details", function (req, res) {
  try {
    pool.query(
      "insert into order_details(orderid,fooditemid,fooditemname,enrollmentno,emailid,mobileno,qty,fullprice,offerprice,amount) values ?",
      [
        req.body.data.map((item) => [
          req.body.orderid,
          item.fooditemid,
          item.fooditemname,
          req.body.enrollmentno,
          req.body.emailid,
          req.body.mobileno,
          item.qty,
          item.fullprice,
          item.offerprice,
          item.offerprice > 0 ? item.offerprice * item.qty : item.fullprice * item.qty,
        ]),
      ],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "Order Detail Submitted Successfully" });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.post("/fetch_orders_by_enrollment", function (req, res) {
  try {
    const { enrollmentno } = req.body;
    if (!enrollmentno) {
      return res.status(400).json({ status: false, message: "Enrollment No is required" });
    }
    pool.query(
      `SELECT d.*, o.delivery_status, o.payment_type, o.paymentid, f.picture
       FROM order_details d
       LEFT JOIN orders o ON o.orderid = d.orderid
       LEFT JOIN fooditems f ON f.fooditemid = d.fooditemid
       WHERE d.enrollmentno = ?
       ORDER BY d.orderid DESC`,
      [enrollmentno],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "success", data: result });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.get('/fetch_all_category', function (req, res) {
  try {
    pool.query('SELECT * FROM foodcategory', function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database Error' });
      }
      res.status(200).json({ status: true, data: result, message: 'Success' });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post('/fetch_all_fooditems_by_category', function (req, res) {
  try {
    const { categoryname } = req.body;
    pool.query(
      `SELECT f.* FROM fooditems f INNER JOIN foodcategory c ON f.foodcategoryid = c.categoryid WHERE c.categoryname = ?`,
      [categoryname],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: 'Database Error' });
        }
        res.status(200).json({ status: true, data: result, message: 'Success' });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post("/fetch_all_fooditems_by_category_id", function (req, res) {
  try {
    pool.query(
      "select * from fooditems where foodcategoryid=?",
      [req.body.categoryid],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: "Database Error" });
        }
        res.status(200).json({ status: true, message: "success", data: result });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: "Critical Error" });
  }
});

router.get('/fetch_all_fooditems', function (req, res) {
  try {
    pool.query(
      'select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F',
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: 'Database Error' });
        }
        res.status(200).json({ status: true, message: 'success', data: result });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post("/fetch_all_fooditems_by_id", function (req, res) {
  try {
    pool.query(
      'select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F where fooditemid=?',
      [req.body.fooditemid],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, message: 'Database Error' });
        }
        res.status(200).json({ status: true, message: 'success', data: result[0] });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Critical Error' });
  }
});

router.post("/student_sign_in", function (req, res) {
  const mobileNumber = req.body.mobileNo || req.body.mobileno;
  if (!mobileNumber) {
    return res.status(400).json({ status: false, message: 'Mobile number is required' });
  }

  pool.query('SELECT * FROM students WHERE mobileno = ?', [mobileNumber], function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, message: 'Database Error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ status: false, message: 'You are not registered. Please contact Branch Administrator' });
    }
    if (result.length === 1) {
      return res.status(200).json({ status: true, message: 'success', data: result[0] });
    }
    return res.status(400).json({ status: false, message: 'Multiple students found with this mobile number' });
  });
});

router.get('/homepage_data', async function (req, res) {
  try {
    const [categories] = await pool.promise().query('SELECT * FROM foodcategory');
    const [snacks] = await pool.promise().query(
      "SELECT f.* FROM fooditems f INNER JOIN foodcategory c ON f.foodcategoryid = c.categoryid WHERE c.categoryname = ?",
      ["Snacks"]
    );
    const [drinks] = await pool.promise().query(
      "SELECT f.* FROM fooditems f INNER JOIN foodcategory c ON f.foodcategoryid = c.categoryid WHERE c.categoryname = ?",
      ["Drinks"]
    );
    const [allItems] = await pool.promise().query(
      "select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F"
    );

    res.status(200).json({
      status: true,
      message: 'success',
      categories: categories,
      snacks: snacks,
      drinks: drinks,
      allItems: allItems
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Database Error' });
  }
});

module.exports = router;
