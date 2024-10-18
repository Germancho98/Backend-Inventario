const Product = require('../models/product');
const Movement = require('../models/movement');

exports.getInventoryReport = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMovementReport = async (req, res) => {
    try {
        const movements = await Movement.find().populate('product');
        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};