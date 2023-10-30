const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please enter all details");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const data = await USER.create(req.body);

    const token = await jwt.sign({ id: data._id }, "USER");

    res.status(201).json({
      message: "user create successfull",
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please enter email and password");
    }
    const data = await USER.findOne({ email: email });
    if (!data) {
      throw new Error("invalid email address");
    }

    const checkPass = await bcrypt.compare(password, data.password);

    if (!checkPass) {
      throw new Error("please enter Valid Password");
    }

    res.status(200).json({
      message: "Welcome to blog app",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fails",
      message: error.message,
    });
  }
};



exports.deleteUser=async function(req,res,next){
  try {
    console.log(req.params);
    await USER.findByIdAndDelete(req.params.id)
    res.status(204).json({
    });
  } catch (error) {
    res.status(404).json({
      status:'Fail',
      message:error.message
    })
  }
}
