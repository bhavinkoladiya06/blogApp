const jwt = require("jsonwebtoken");
const ADMIN=require('../model/admin')
exports.adminsecure = async function (req, res, next) {
  try {
    let token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new Error("please provide token");
    }

    const checkToken = await jwt.verify(token, "ADMIN");
    // console.log(checkToken);
    const checkAdmin = await ADMIN.findById(checkToken.id);
    // console.log(checkAdmin);

    if (!checkAdmin) {
      throw new Error("user not fount");
    }

    next();
  } catch (error) {
    res.status(404).json({
      status: "Fails",
      message: error.message,
    });
  }
};
