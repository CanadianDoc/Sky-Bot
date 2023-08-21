const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Shows all of the database models")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const embed = new EmbedBuilder()
      .setTitle("Database Models")
      .setDescription("Here are all of the database models")
      .setColor("Random")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        text: `Requested by ${interaction.user.tag}`,
      });

    const collectionNames = await mongoose.connection.db
      .listCollections()
      .toArray();

    const countPromises = collectionNames.map(async (collection) => {
      const count = await mongoose.connection
        .collection(collection.name)
        .countDocuments();
      return {
        name:
          collection.name.charAt(0).toUpperCase() + collection.name.slice(1),
        value: `${count} data${count === 1 ? "" : "s"}.`,
        inline: true,
      };
    });

    const fields = await Promise.all(countPromises);
    embed.addFields(fields);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
