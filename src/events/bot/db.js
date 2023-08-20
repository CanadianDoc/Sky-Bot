const mongoose = require("mongoose");

const getModel = (type) => {
  try {
    return mongoose.model(type.charAt(0).toUpperCase() + type.slice(1));
  } catch (error) {
    console.error(`Model for type '${type}' not found.`);
    return null;
  }
};

const loadData = async (type) => {
  const Model = getModel(type);
  if (!Model) return new Map();

  const data = await Model.find();
  return new Map(
    data.map((item) => [`${item.userId}-${item.messageId}`, item])
  );
};

const saveData = async (item, type) => {
  const Model = getModel(type);
  if (!Model) return;

  await Model.findOneAndUpdate(
    { userId: item.userId, messageId: item.messageId },
    item,
    { upsert: true }
  );
};

module.exports = { loadData, saveData };
