const express = require("express")
const { products, updateProduct, deleteProduct, addImges, searchProduct, favoriteProducts, addProduct, singleProduct } = require("../controllers/products")
const router = express.Router()
const product = require('../models/productModel')

// middlewares
const upload = require("../middlewares/multer")


// routes 
router.get('/all-products', products)

router.post('/favorite-products', favoriteProducts)

router.post('/add-product', addProduct)

router.put("/single-product/:id", upload.array('images', 3), updateProduct)

router.post("/add-images", upload.array('images', 3), addImges)

router.route("/search-products").post(searchProduct)

router.route("/single-product/:id").get(singleProduct)

router.delete("/single-product/:id", deleteProduct)

// router.route("/all-products").get(searchProduct)

module.exports = router