const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("closeattendance")
    .setDescription("Closes the attendance post. . .")
    .addStringOption((option) =>
      option
        .setName("attendanceid")
        .setDescription("The id of the attendance post you want to close")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, bot) {
    const attendanceid = interaction.options.getString("attendanceid");

    try {
      const msg = await interaction.channel.messages.cache.get(attendanceid);
      if (!msg) {
        return interaction.reply({
          content: "Attendance Post not found",
          ephemeral: true,
        });
      }

      const embed = msg.embeds[0];
      if (!embed) {
        return interaction.reply({
          content: "Attendance Post can't be closed",
          ephemeral: true,
        });
      }
      const adjustedFields = embed.fields.map((field) => {
        if (field.value === "") {
          field.value = " ";
        }
        return field;
      });

      const newEmbed = new EmbedBuilder()
        .setTitle(embed.title + " (Closed)")
        .setDescription(embed.description)
        .setColor(embed.color)
        .addFields(adjustedFields)
        .setTimestamp(Date.now());
      await msg.edit({ embeds: [newEmbed], components: [] });

      interaction.reply({
        content: "Attendance Post closed",
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
