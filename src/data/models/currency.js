const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  userId: String,
  messageId: String,
  vote: String,
});

module.exports = mongoose.model("Currency", currencySchema);
