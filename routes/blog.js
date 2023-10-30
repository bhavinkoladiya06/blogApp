var express = require("express");
var router = express.Router();
const blogController=require('../controller/blogController')
const user=require('../middleware/usermiddleware')
const admin=require('../middleware/adminmiddleware')


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

/*API for  create blog by user*/
router.post("/create",user.userSecure, upload.single("image"), blogController.createBlog);

/*API for  read blog */
router.get("/getBlog", blogController.getBlog);

/*API for  delete blog by admin */
router.delete("/deleteBlog/admin/:id", admin.adminsecure, blogController.deleteBlog);
/*API for  update blog by admin */
router.put("/updateBlog/admin/:id",admin.adminsecure,upload.single("image"), blogController.updateBlog);

/*API for  delete blog by users */
router.delete("/deleteBlog/users/:id",user.userSecure, blogController.deleteBlog);

/*API for  update blog by admin */
router.put("/updateBlog/users/:id",user.userSecure,upload.single("image"), blogController.updateBlog);

module.exports=router