const mongoose = require("mongoose");

const getModel = (type) => {
  try {
    return mongoose.model(type.charAt(0).toUpperCase() + type.slice(1));
  } catch (error) {
    console.error(`Model for type '${type}' not found.`);
    return null;
  }
};

const loadData = async (collectionName) => {
  const Model = getModel(collectionName);
  if (!Model) return new Map();

  try {
    const data = await Model.find();
    return new Map(
      data.map((item) => [`${item.userId}-${item.messageId}`, item])
    );
  } catch (error) {
    console.error(
      `Error loading data for collection '${collectionName}':`,
      error
    );
    return new Map();
  }
};

const saveData = async (item, collectionName) => {
  const Model = getModel(collectionName);
  if (!Model) return;

  try {
    await Model.findOneAndUpdate(
      { userId: item.userId, messageId: item.messageId },
      item,
      { upsert: true }
    );
  } catch (error) {
    console.error(
      `Error saving data to collection '${collectionName}':`,
      error
    );
  }
};
module.exports = { loadData, saveData, getModel };
