const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const dbFilePath = path.join(__dirname, "..", "..", "data", "db.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("datawipe")
    .setDescription("Wipes all data from the database")
    .addStringOption((option) =>
      option
        .setName("database")
        .setDescription("The name of the database to wipe")
        .setRequired(true)
        .addChoices(
          { name: "Poll", value: "poll" },
          { name: "Attendance", value: "attendance" },
          { name: "All", value: "all" }
        )
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const database = interaction.options.getString("database");

    let dbData = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));

    if (database === "poll") {
      dbData.poll = [];
    } else if (database === "attendance") {
      dbData.attendance = [];
    } else if (database === "all") {
      dbData.poll = [];
      dbData.attendance = [];
    }

    fs.writeFileSync(dbFilePath, JSON.stringify(dbData), "utf8");

    interaction.reply({
      content: "Data has been wiped",
      ephemeral: true,
    });
  },
};
