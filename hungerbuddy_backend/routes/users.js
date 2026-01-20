var express = require('express');
var router = express.Router();
var pool = require('./pool');

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
  const query = `SELECT f.*FROM fooditems f INNER JOIN foodcategory c ON f.foodcategoryid = c.categoryid WHERE c.categoryname = ?`;


  try {
    const { categoryname } = req.body;


    if (!categoryname) {
      return res.status(400).json({
        status: false,
        message: 'categoryname is required'
      });
    }


    router.get('/fetch_all_fooditems', function (req, res) {
      pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F',
        function (error, result) {
          if (error) {
            console.log(error)
            res.status(500).json({
              status: false,
              message: 'Database Error Please Contact Backend Team....'
            });
          }
          else {
            res.status(200).json({
              status: true,
              message: 'success',
              data: result
            });
          }
        }
      );
    });





    /* =====================================================
    Bekend message errro show
       ===================================================== */
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



    router.post("/fetch_all_fooditems_by_id", function (req, res) {
      pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as categoryname from fooditems F where fooditemid=?',[req.body.fooditemid],
        function (error, result) {
        
          if (error) {
            console.log(error)
            res.status(500).json({
              status: false,
              message: 'Database Error Please Contact Backend Team....'
            });
          }
          else {
            res.status(200).json({
              status: true,
              message: 'success',
              data: result
            });
          }
        }
      );
    });


module.exports = router;
