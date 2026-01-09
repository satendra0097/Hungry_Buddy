var express = require('express');
var router = express.Router();
var pool=require("./pool")
var dotenv = require('dotenv');
var jsonwebtoken = require('jsonwebtoken')

dotenv.config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Expresss'});
});



router.post('/chk_admin_login', function (req, res, next) {

   try {
      pool.query('select * from admins where emailid=? and password=?', [req.body.emailid, req.body.password], function (error, result) {
         if (error) {
            // console.log(e)
            res.status(500).json({ status: false, message: 'Database Error Please Contact Bankend Team....' })
         }
         else {
            // console.log(result);

            if (result.length == 1) {
               var sk = process.env.JWT_KEY
               var token = jsonwebtoken.sign({ branch_admin: result[0] }, sk, { expiresIn: '5h' })
            //    console.log('token', token)
// console.log(e)
               res.status(200).json({ token, data: result[0], status: true, message: 'success' })
            }
            
            else {
               res.status(200).json({ status: false, message: 'Invalid emailid/password' })
            }
         }

      })

   }
   catch (e) {

      res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' })
   }
});


module.exports = router;
