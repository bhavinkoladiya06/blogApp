var express = require("express");
var router = express.Router();
const adminController=require('../controller/adminController')
const admin=require('../middleware/adminmiddleware')


/* create admin account API*/ 

router.post('/register',adminController.createAdmin);
router.post('/login',adminController.loginAdmin);


module.exports = router;
