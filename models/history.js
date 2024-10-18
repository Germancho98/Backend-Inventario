const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  action: {
    type: String,
    // para la acción realizada
    enum: ['add', 'update', 'delete'],  
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model('History', historySchema);

module.exports = History;