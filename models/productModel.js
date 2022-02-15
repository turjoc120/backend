const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'enter the title please']
    },
    sku: {
        type: String,
        required: [true, 'enter the sku please']
    },
    description: {
        type: String,
        required: [true, 'enter the description please']
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxPrice: [10, "Price cant be longer than 10 characters"],
    },
    images: {
        type: Array,
        required: [true, "Please add product images"]
    },
    thumbnail: {
        type: Object,

    }
})

module.exports = mongoose.model('product', productSchema)