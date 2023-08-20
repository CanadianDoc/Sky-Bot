const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  userId: String,
  messageId: String,
  vote: String,
});

module.exports = mongoose.model("Role", roleSchema);
