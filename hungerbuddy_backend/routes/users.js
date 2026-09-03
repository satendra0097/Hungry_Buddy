var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require("./multer");


///******* */
router.post(
  "/submit_orders",
  function (req, res, next) {
    try {
      console.log(req.body);
      pool.query(
        "insert into orders(delivery_status, payment_type,paymentid)values(?,?,?)",
        [



          req.body.delivery_status,
          req.body.payment_type,
          req.body.paymentid,

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
              .json({ status: true, orderid: result.insertId, message: "Order Added Successfully" });
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

router.post("/submit_order_details", function (req, res, next) {
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
          item.offerprice > 0
            ? item.offerprice * item.qty
            : item.fullprice * item.qty,
        ]),
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
            message: "Order Detail Submitted Successfully....",
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
});



router.post("/fetch_orders_by_enrollment", function (req, res) {
  try {
    const { enrollmentno } = req.body;
    if (!enrollmentno) {
      return res.status(400).json({
        status: false,
        message: "Enrollment No is required",
      });
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
          console.log(error);
          return res.status(500).json({
            status: false,
            message: "Database Error Please Contact Backend Team....",
          });
        }
        return res.status(200).json({
          status: true,
          message: "success",
          data: result,
        });
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Backend Team....",
    });
  }
});

/* =====================================================
   FETCH ALL CATEGORIES
   ===================================================== */
router.get('/fetch_all_category', function (req, res) {
  try {
    pool.query('SELECT * FROM foodcategory', function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: false,
          message: 'Database Error. Please contact backend team.'
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
        message: 'Success'
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: 'Critical Error. Please contact backend team.'
    });
  }
});

/* =====================================================
   FETCH ALL FOOD ITEMS BY CATEGORY NAME
   ===================================================== */
router.post('/fetch_all_fooditems_by_category', function (req, res) {
  const query = `SELECT f.* FROM fooditems f INNER JOIN foodcategory c ON f.foodcategoryid = c.categoryid WHERE c.categoryname = ?`;

  try {
    const { categoryname } = req.body;
    pool.query(query, [categoryname], function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: false,
          message: 'Database Error. Please contact backend team.'
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
        message: 'Success'
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: 'Critical Error. Please contact backend team.'
    });
  }
});

router.post("/fetch_all_fooditems_by_category_id", function (req, res) {
  console.log(req.body);
  pool.query(
    "select * from fooditems where foodcategoryid=?",
    [req.body.categoryid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: "Database Error Please Contact Backend Team....",
        });
      } else {
        res.status(200).json({ status: true, message: "success", data: result });
      }
    }
  );
});

router.get('/fetch_all_fooditems', function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F',
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: 'Database Error Please Contact Backend Team....'
        });
      } else {
        res.status(200).json({
          status: true,
          message: 'success',
          data: result
        });
      }
    }
  );
});

router.post("/fetch_all_fooditems_by_id", function (req, res) {
  pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F where fooditemid=?', [req.body.fooditemid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: 'Database Error Please Contact Backend Team....'
        });
      } else {
        res.status(200).json({
          status: true,
          message: 'success',
          data: result[0]
        });
      }
    }
  );
});

/* =====================================================
   STUDENT SIGN IN - FIXED VERSION
   ===================================================== */
router.post("/student_sign_in", function (req, res) {
  console.log("========================================");
  console.log("STUDENT SIGN IN API CALLED");
  console.log(" Request Body:", req.body);
  console.log("========================================");

  //  IMPORTANT: Handle both 'mobileNo' (frontend) and 'mobileno' (backend)
  const mobileNumber = req.body.mobileNo || req.body.mobileno;

  //  Validate mobile number
  if (!mobileNumber) {
    console.log("Mobile number missing in request");
    return res.status(400).json({
      status: false,
      message: 'Mobile number is required'
    });
  }

  console.log("📱 Searching for mobile:", mobileNumber);

  pool.query('SELECT * FROM students WHERE mobileno = ?', [req.body.mobileNo],
    function (error, result) {
      console.log("Query Executed at:", new Date().toISOString());
      console.log(" Result Length:", result ? result.length : 0);

      if (error) {
        console.log(" Database Error:", error);
        return res.status(500).json({
          status: false,
          message: 'Database Error Please Contact Backend Team....'
        });
      }

      //  No student found
      if (result.length === 0) {
        console.log("No student found with mobile:", mobileNumber);
        return res.status(404).json({
          status: false,
          message: 'You are not registered. Please contact Branch Administrator'
        });
      }

      // student found
      if (result.length === 1) {
        const student = result[0];

        console.log(" STUDENT FOUND SUCCESSFULLY");
        console.log("----------------------------------------");
        console.log("Enrollment No    :", student.enrollmentno);
        console.log("Student Name     :", student.studentname);
        console.log("Mobile No        :", student.mobileno);
        console.log("Email ID         :", student.emailid);
        console.log("Branch ID        :", student.branchid);
        console.log("Batch ID         :", student.batchid);
        console.log("Section ID       :", student.sectionid);
        console.log("Father's Name    :", student.fathername);
        console.log("Mother's Name    :", student.mothername);
        console.log("----------------------------------------");
        console.log(" Sending success response");
        console.log("========================================");

        return res.status(200).json({
          status: true,
          message: 'success',
          data: student
        });
      }

      //  Multiple students found (should not happen if mobile is unique)
      console.log(" Multiple students found:", result.length);
      return res.status(400).json({
        status: false,
        message: 'Multiple students found with this mobile number'
      });
    }
  );
});



/* =====================================================
   HOMEPAGE BUNDLE (1 request instead of 4)
   ===================================================== */
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

    return res.status(200).json({
      status: true,
      message: 'success',
      categories: categories,
      snacks: snacks,
      drinks: drinks,
      allItems: allItems
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: 'Database Error Please Contact Backend Team....'
    });
  }
});

module.exports = router;