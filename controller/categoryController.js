const CATEGORY = require("../model/category");



exports.createCategory = async function (req, res, next) {
  try {
    req.body.image = req.file.filename;
    // console.log(req.file);
    // console.log(req.body);
    const { name, image } = req.body;
    if (!name || !image) {
      throw new Error("fillup all filds");
    }
    const data = await CATEGORY.create(req.body);

    res.status(201).json({
      message: "category create successfull",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getCategory = async function (req, res, next) {
  try {
    const data = await CATEGORY.find();
    if (!data.length) {
      throw new Error("no data available");
    }
    res.status(200).json({
      message: "get all category",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteCategory = async function (req, res, next) {
  try {
    await CATEGORY.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      status: "Faail",
      message: error.message,
    });
  }
};
exports.updateCategory = async function (req, res, next) {
  try {
    req.body.image=req.file.filename
    // req.body.image = req.file.filename;
    console.log(req.file);
   const data= await CATEGORY.findByIdAndUpdate( req.params.id,req.body);
  //  console.log(data);
    res.status(200).json({
      message: "record update successfull",
    });
  } catch (error) {
    res.status(404).json({
      status: "Faail",
      message: error.message,
    });
  }
};
