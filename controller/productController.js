const mongoose = require('mongoose');
const productModel = require('../model/productModel');


// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Product name is required and must be a non-empty string.' });
        }

        if (description && typeof description !== 'string') {
            return res.status(400).json({ message: 'Description must be a string if provided.' });
        }

        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ message: 'Price must be a positive number.' });
        }

        if (!category || typeof category !== 'string' || category.trim() === '') {
            return res.status(400).json({ message: 'Category is required and must be a non-empty string.' });
        }

        if (typeof quantity !== 'number' || quantity < 0 || !Number.isInteger(quantity)) {
            return res.status(400).json({ message: 'Quantity must be a non-negative integer.' });
        }

        // Create and save the new product if all validations pass
        const newProduct = new productModel({ name, description, price, category, quantity });
        const savedProduct = await newProduct.save();
        
        res.status(201).json({
            message: `New product created successfully`,
            data: savedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};



// Retrieve product by name
exports.getProductByName = async (req, res) => {
    try {
        const { name } = req.query;

        // Validate that the product name is provided and is a non-empty string
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                message: 'Product name is required and must be a non-empty string.'
            });
        }

        const product = await productModel.findOne({ name: name.trim() });

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found'
            });
        }

        // Respond with the retrieved product
        res.status(200).json({
            message: 'Product retrieved successfully',
            data: product
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Retrieve product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID.'
            });
        }

        const product = await productModel.findById(id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({
                message: 'Product not found.'
            });
        }

        // Return the retrieved product
        res.status(200).json({
            message: 'Product retrieved successfully.',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update product by name
exports.updateProductByName = async (req, res) => {
    try {
        const { name } = req.query; 
        const { newName, description, price, category, quantity } = req.body; 

        // Validate that name is provided and is a non-empty string
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ 
                message: 'Current product name is required and must be a non-empty string.'
            });
        }

        // Prepare the update object
        const updateData = {};
        if (newName) updateData.name = newName; // Update name if newName is provided
        if (description) updateData.description = description; // Update description if provided
        if (price !== undefined) updateData.price = price; // Update price if provided
        if (category) updateData.category = category; // Update category if provided
        if (quantity !== undefined) updateData.quantity = quantity; // Update quantity if provided

        // Find the product by current name and update it
        const updatedProduct = await productModel.findOneAndUpdate(
            { name: name.trim() }, // Find by current name
            updateData, 
            { new: true }
        );

        // If product not found, return 404 error
        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found.'
            });
        }

        // Respond with the updated product
        res.status(200).json({
            message: 'Product updated successfully.',
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Update product by ID
exports.updateProductById = async (req, res) => {
    try {

        const id  = req.params.id

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID.'
            });
        }

        const { name, description, price, category, quantity } = req.body; 
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, quantity }, 
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found'
            });
        }
        res.status(200).json({
            message: 'Product updated successfully.',
            data: product
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message
         });
    }
};





// Delete product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const id  = req.params.id

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID.'
            });
        }

        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                 message: 'Product not found' 
                });
        }
        res.status(200).json({ 
            message: 'Product deleted successfully.' 
        }); 
    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
};



exports.deleteProductByName = async (req, res) => {
    try {
        const { name } = req.query; 

        // Validate that name is provided and is a non-empty string
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ 
                message: 'Product name is required and must be a non-empty string.' 
            });
        }

        // Delete the product by name
        const product = await productModel.findOneAndDelete({ name: name.trim() });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

