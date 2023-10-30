const jwt = require("jsonwebtoken");
const USER=require('../model/user')

exports.userSecure = async function (req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!req.headers.authorization) {
      throw new Error("please provid token No.");
    }

    var checkToken = jwt.verify(token, "USER");

    console.log(checkToken);
    var checkUser = await USER.findById(checkToken.id);
    console.log(checkUser);

    if (!checkUser) {
      throw new Error("user not found");
    }

    next();
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
