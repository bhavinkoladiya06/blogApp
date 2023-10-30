const ADMIN = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdmin = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please fillup all details");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await ADMIN.create(req.body);
    const token = await jwt.sign({ id: data._id }, "ADMIN");

    res.status(201).json({
      message: "Account create successfull",
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.loginAdmin =async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('please enter email and password')

    }
    const data=await ADMIN.findOne({email:req.body.email})
    if(!data){
      throw new Error('please enter valid email address')
    }
    const checkpass=await bcrypt.compare(req.body.password,data.password)

    if(!checkpass){
      throw new Error('wrong password ')
    }

    res.status(200).json({
      message:'welcome to admin',
      data
    })
  } catch (error) {

    res.status(404).json({
      status:'Fail',
      message:error.message
    })
  }
};

exports.adminsecure=async function(req,res,next){
  try {
      let token = req.headers.authorization;
      // console.log(token);
      if(!token){
        throw new Error('please provide token')
      }

      const checkToken = await jwt.verify(token, "ADMIN");
      // console.log(checkToken);
      const checkAdmin=await ADMIN.findById(checkToken.id)
      // console.log(checkAdmin);

      if (!checkAdmin) {
        throw new Error('user not fount')
      }

        next()
  } catch (error) {
    res.status(404).json({
      status:'Fails',
      message:error.message
    })
  }
}
