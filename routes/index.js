var express = require('express');
var router = express.Router();

const userController = require("../controller/userController");

/* GET users listing. */
router.post("signup", userController.createUser);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
