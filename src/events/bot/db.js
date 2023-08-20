const fs = require("fs");
const path = require("path");

const votesFilePath = path.join(__dirname, "..", "..", "data", "db.json");

const loadData = (type) => {
  const data = fs.readFileSync(votesFilePath, "utf8");
  const parsedData = JSON.parse(data);
  return new Map(parsedData[type]);
};

const saveData = (data, type) => {
  const existingData = JSON.parse(fs.readFileSync(votesFilePath, "utf8"));
  existingData[type] = [...data];
  fs.writeFileSync(votesFilePath, JSON.stringify(existingData), "utf8");
};

module.exports = { loadData, saveData };
