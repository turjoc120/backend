const product = require('../models/productModel')
const allImages = require('../models/imageModel')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// add new product //
// add product image 
exports.addImges = async (req, res) => {
    if (req.files.length > 0) {
        console.log("hit");
        const result = await allImages.create({ images: req.files })
        res.json(result)

    }
}

exports.addProduct = async (req, res) => {
    const newProduct = {
        sku: req.body.sku,
        thumbnail: req.body.thumbnail,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images
    }

    const result = await product.create(newProduct)
    res.json({ success: true, message: "product added successfully" })

}

exports.singleProduct = async (req, res) => {
    const result = await product.findById(req.params.id);

    if (!result) {
        res.json("no products found")
    }

    res.status(200).json({
        result
    });
}

// get all products
exports.products = async (req, res) => {
    const result = await product.find()
    res.json(result)
}


// get favorite products
exports.favoriteProducts = async (req, res) => {
    const idArray = req.body
    const records = await product.find({ '_id': { $in: idArray } });
    res.json(records)

}


// search products
exports.searchProduct = async (req, res) => {
    const result = await product.find({
        "title": { $regex: req.body.searchKey, $options: 'i' }
    })
    res.json(result)

}

// update a single product
exports.updateProduct = async (req, res) => {
    const result = await product.findById(req.params.id);

    if (!result) {
        res.json("no products found")
    }

    if (req.files.length < 1) {
        var updatedProduct = {
            sku: req.body.sku,
            title: req.body.title,
            description: req.body.description,
        }

    } else {
        const allImages = result.images = [...result.images, ...req.files]
        var updatedProduct = {
            sku: req.body.sku,
            title: req.body.title,
            description: req.body.description,
            images: allImages
        }
    }


    if (!result) {
        res.json("no products found")
    }

    const updatedResult = await product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true, runValidators: true })

    res.status(200).json({
        success: true
    });

}

// delete a  product
exports.deleteProduct = async (req, res) => {
    const result = await product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json({ message: "there was a error" });
        } else {
            for (let i = 0; i < result.images.length; i++) {
                await unlinkAsync(result.images[i].path)

            }
            res.json({ message: "the product deleted successfully" })
        }
    });

}


