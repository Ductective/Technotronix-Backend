const express = require("express")
const productController = require("../controllers/productController")
const {auth, admin} = require("../middleware/auth")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})
const router = express.Router()

router.post("/", auth, admin, upload.single("img"), productController.createProduct)
router.get("/", productController.getAllProducts)
router.get("/featured", productController.getFeaturedProducts)
router.get("/topSelling", productController.getTopSellingProducts)
router.get("/:id", productController.getSingleProduct)
router.put("/:id",upload.single("img"), productController.updateProduct)
router.delete("/:id",upload.single("img"), productController.deleteProduct)
module.exports = router