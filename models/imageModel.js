const mongoose = require('mongoose')

const imageSehema = mongoose.Schema({
    images: {
        type: Array,
        required: [true, "Please add images"]
    },
    // thumbnail: {
    //     type: String,

    // }
})

module.exports = mongoose.model('allImages', imageSehema)