const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: String,
  messageId: String,
  vote: String,
  username: String,
});

module.exports = mongoose.model("Attendance", attendanceSchema, "attendance");
