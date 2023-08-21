const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  userId: String,
  messageId: String,
  vote: String,
});

module.exports = mongoose.model("Poll", pollSchema, "poll");
