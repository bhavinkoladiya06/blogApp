var express = require('express');
var router = express.Router();
const userController=require('../controller/userController')
const adminMiddleware=require('../middleware/adminmiddleware')
const userMiddleware=require('../middleware/usermiddleware')

/* create users account API. */
router.post('/register',userController.createUser)

/* login users account API. */
router.post('/login',userMiddleware.userSecure,userController.loginUser)


/* Delete users account API. */
router.delete('/deleteuser/:id',adminMiddleware.adminsecure,userController.deleteUser)

module.exports = router;
