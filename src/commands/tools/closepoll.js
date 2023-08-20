const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("closepoll")
    .setDescription("Closes the poll")
    .addStringOption((option) =>
      option
        .setName("pollid")
        .setDescription("The id of the poll you want to close")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, bot) {
    const pollid = interaction.options.getString("pollid");

    try {
      const msg = await interaction.channel.messages.cache.get(pollid);
      if (!msg) {
        return interaction.reply({
          content: "Poll not found",
          ephemeral: true,
        });
      }

      const embed = msg.embeds[0];
      if (!embed) {
        return interaction.reply({
          content: "Poll can't be closed",
          ephemeral: true,
        });
      }

      //console.log(embed);

      const newEmbed = new EmbedBuilder()
        .setTitle(embed.title + " (Closed)")
        .setDescription(embed.description)
        .setColor(embed.color)
        .addFields(embed.fields)
        .setTimestamp(Date.now());
      await msg.edit({ embeds: [newEmbed], components: [] });

      interaction.reply({
        content: "Poll closed",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        content:
          "Something went wrong while executing this command, please inform Doc about it thank you!",
        ephemeral: true,
      });
    }
  },
};
