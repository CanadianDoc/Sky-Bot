const fs = require("fs");

const ascii = require("ascii-table");
const tableB = new ascii().setHeading("Buttons", "Status");

module.exports = (bot) => {
  bot.eventHandler = async () => {
    const { buttons } = bot;
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "bot":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              bot.once(event.name, (...args) => event.execute(...args, bot));
            } else {
              bot.on(event.name, (...args) => event.execute(...args, bot));
            }
          }
          break;

        case "buttons":
          console.log("Loading Buttons");
          for (const file of eventFiles) {
            const button = require(`../../events/${folder}/${file}`);
            buttons.set(button.data.name, button);
            tableB.addRow(`${button.data.name}`, "loaded");
          }
          break;

        default:
          break;
      }
    }
    console.log(tableB.toString());
  };
};
