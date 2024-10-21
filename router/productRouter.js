const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();


// POST /products - Create a new product
router.post('/create', productController.createProduct);

// GET /products?name=example - Retrieve product by name
router.get('/product', productController.getProductByName);

// GET /products/:id - Retrieve product by ID
router.get('/product/:id', productController.getProductById);

// PUT /products?oldName=example - Update product by name
router.put('/update', productController.updateProductByName);

// PUT /products/:id - Update product by ID
router.put('/update/:id', productController.updateProductById);

// DELETE /products?name=example - Delete product by name
router.delete('/delete', productController.deleteProductByName);

// DELETE /products/:id - Delete product by ID
router.delete('/delete/:id', productController.deleteProductById);

module.exports = router;
