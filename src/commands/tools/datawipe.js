const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const mongoose = require("mongoose");
const { getModel } = require("../../events/bot/db");

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
    const collectionNames = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionList = collectionNames.map((col) => col.name);

    try {
      if (database === "all") {
        for (const collection of collectionList) {
          const model = getModel(collection);
          await model.deleteMany({});
        }
      } else {
        if (collectionList.includes(database)) {
          const model = getModel(database);
          await model.deleteMany({});
        } else {
          return interaction.reply({
            content: "Database not found",
            ephemeral: true,
          });
        }
      }

      interaction.reply({
        content: "Data has been wiped",
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error wiping the database:", error);
      interaction.reply({
        content: "Error occurred while wiping the data. Please try again.",
        ephemeral: true,
      });
    }
  },
};
