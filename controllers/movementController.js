const Movement = require('../models/movement');
const Product = require('../models/product');

exports.getMovements = async (req, res) => {
  try {
    const movements = await Movement.find().populate('product user');
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMovement = async (req, res) => {
  try {
    const { product, quantity, movementType, user } = req.body;

    const productToUpdate = await Product.findById(product);
    if (!productToUpdate) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (movementType === 'entry') {
      productToUpdate.quantity += quantity;
    } else if (movementType === 'exit') {
      if (productToUpdate.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
      productToUpdate.quantity -= quantity;
    } else if (movementType === 'modification') {
      productToUpdate.quantity = quantity;
    }

    await productToUpdate.save();
    const newMovement = new Movement({ product, quantity, movementType, user });
    await newMovement.save();

    res.status(201).json(newMovement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};