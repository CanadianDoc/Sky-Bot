const fs = require("fs");
const path = require("path");
const ascii = require("ascii-table");
const tableM = new ascii().setHeading("Models", "Status");

module.exports = (bot) => {
  console.log("Loading Models");
  const modelsDirectory = path.join(__dirname, "../../data/models");

  fs.readdirSync(modelsDirectory).forEach((file) => {
    if (file.endsWith(".js")) {
      const modelName = file.split(".")[0]; // Get the model name without the file extension
      try {
        require(path.join(modelsDirectory, file));
        tableM.addRow(modelName, "Loaded");
      } catch (err) {
        tableM.addRow(modelName, "Error");
        console.error(err);
      }
    }
  });

  console.log(tableM.toString());
};
