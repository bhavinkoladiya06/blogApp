const BLOG = require("../model/blog");
const USER = require("../model/blog");

exports.createBlog = async function (req, res, next) {
  try {
    req.body.image = req.file.filename;
    const { title, description, image, category, user } = req.body;
    if (!title || !description || !image || !category || !user) {
      throw new Error("fillup all filds");
    }
    const data=await USER.create(req.body)
    res.status(201).json({
        message:'blog added',
        data
    })
  } catch (error) {
    res.status(404).json({
        status:'Fail',
        message:error.message,
    })
  }
};

exports.getBlog=async function (req,res,next) {
    try {
        const data=await USER.find().populate('category').populate('user')

        if(!data.length){
            throw new  Error('no record found')
        }
        res.status(200).json({
            message:'record fount',
            data
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

exports.deleteBlog=async function(req,res,next){
    try {
        await BLOG.findByIdAndDelete(req.params.id)
        res.status(204).json()
    } catch (error) {
        res.status(404).json({
            status:'Fails',
            message:error.message
        })
    }
}

exports.updateBlog=async function (req,res,next) {
    try {
        req.body.image=req.file.filename
     const data=await BLOG.findByIdAndUpdate(req.params.id,req.body)
     if(!data){
        throw new Error('no data found')
     }

        res.status(200).json({
          message: "update",
        });
    } catch (error) {
         res.status(404).json({
           message: error.message,
           
         });
    }
}
