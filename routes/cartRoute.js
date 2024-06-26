const express = require("express")
const cartController = require("../controllers/cartController")
const {auth} = require("../middleware/auth")
const handleAnonymousCart = require("../middleware/anonymousCart")

const router = express.Router()
router.use(handleAnonymousCart)

router.post("/addToCart", auth, cartController.addToCart)
router.get("/cart", auth, cartController.getCart)

module.exports = router