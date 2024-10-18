// models/movement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movementSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  movementType: {
    type: String,
    enum: ['entry', 'exit', 'modification'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

const Movement = mongoose.model('Movement', movementSchema);

module.exports = Movement;