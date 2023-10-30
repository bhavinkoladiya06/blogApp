var express = require("express");
var router = express.Router();
const categoryController=require('../controller/categoryController')
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

/*API for create category */
router.post('/create',admin.adminsecure,upload.single("image"),categoryController.createCategory)

/*API for read category */
router.get('/showCategory',categoryController.getCategory)

/*API for delete category */
router.delete('/deleteCategory/:id',admin.adminsecure,categoryController.deleteCategory)

/*API for update category */
router.put('/updateCategory/:id',admin.adminsecure,upload.single("image"),categoryController.updateCategory)



module.exports = router;
