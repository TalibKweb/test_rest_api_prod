let mongoose = require('mongoose');
let { prodsDB } = require('../db/db')

let prodSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    feat_img: {
        type: String,
        required: true
    },
    img_gallery: {
        type: [String],
        required: true
    },
    price: {
        reg_price: Number,
        sale_price: Number
    },
    description: {
        type: String,
        required: true
    },
    specifications: {
        type: String,
    },
    compatibility: {
        type: String,
    },
    inStock: {
        type: Boolean,
    },
    category: {
        type: String,
    },
    featured_col: {
        type: Boolean,
    },
});

module.exports = prodsDB.model('Product', prodSchema);