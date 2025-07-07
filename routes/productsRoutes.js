const path = require('path');
const express = require('express');
const router = express.Router();
let Product = require('../models/products');
const checkAuthAdmin = require('../middleware/auth')


// >>>>>>>>>>>>>>>>> Find All - Products
router.get('/', async (req, res) => {
    try {
        const all_prods = await Product.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
        res.status(200).send(all_prods)
    }
    catch (err) {
        console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})

// >>>>>>>>>>>>>>>>> Find by Slug - Products
router.get('/:slug', async (req, res) => {
    try {
        let single_product = await Product.findOne({ slug: req.params.slug });
        res.status(200).json(single_product);
    } catch (err) {
        console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})


// >>>>>>>>>>>>>>>>> POST Single Data
router.post('/', checkAuthAdmin, async (req, res) => {

    let img_gallery_main = req.body.img_gallery;
    let newProduct = new Product({
        id: parseInt(req.body.id),
        name: req.body.name,
        slug: req.body.slug,
        feat_img: req.body.feat_img,
        img_gallery: img_gallery_main.split(',').map(url => url.trim()),
        price: {
            reg_price: req.body.reg_price,
            sale_price: req.body.sale_price,
        },
        description: req.body.description,
        specifications: req.body.specifications,
        compatibility: req.body.compatibility,
        inStock: req.body.inStock,
        category: req.body.category,
        featured_col: req.body.featured_col
    })
    try {
        let saveProduct = await newProduct.save();
        // res.status(201).json(saveProduct);
        // res.status(201).sendFile(path.join(__dirname, 'public', 'products.html'));
        res.redirect('/all-products');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        // res.status(400).json({ message: err.message });
        console.log('err.message', err.message)
    }
});


module.exports = router;
