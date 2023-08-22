const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const inventorySchema = new mongoose.Schema({
  userId: String,
  items: [itemSchema],
  money: {
    type: Number,
    default: 0.0,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema, "inventory");
