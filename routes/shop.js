const path = require('path');

const express = require('express');

const rootDir = require('../util/path')
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const produncts = adminData.products;
    res.render('shop', { prods: produncts, pageTitle: 'Shop', path: '/', hasProducts: produncts.length > 0, activeShop: true, productCSS: true });
});

module.exports = router;