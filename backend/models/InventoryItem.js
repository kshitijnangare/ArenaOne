const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock_count: {
    type: Number,
    default: 0
  },
  low_threshold: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventorySchema);

