const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userId: String,
  messageId: String,
  vote: String,
});

module.exports = mongoose.model("Inventory", inventorySchema, "inventory");
