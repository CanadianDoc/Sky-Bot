const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("attendance")
    .setDescription("Check who's coming!. . .")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The name of the event")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, bot) {
    const event = interaction.options.getString("event");

    const embed = new EmbedBuilder()
      .setTitle("Attendance - " + event)
      .setDescription("React to the buttons below to indicate your attendance.")
      .setColor("Random")
      .addFields(
        { name: "Yes", value: " ", inline: true },
        { name: "No", value: " ", inline: true },
        { name: "Maybe", value: " ", inline: true }
      )
      .addFields(
        { name: "# of Yes", value: "0", inline: true },
        { name: "# of No", value: "0", inline: true },
        { name: "# of Maybe", value: "0", inline: true }
      )
      .setTimestamp(Date.now());

    const reply = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`attendance-yes-${reply.id}`)
        .setLabel("Yes")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`attendance-no-${reply.id}`)
        .setLabel("No")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId(`attendance-maybe-${reply.id}`)
        .setLabel("Maybe")
        .setStyle(ButtonStyle.Secondary)
    );

    interaction.editReply({ components: [row] });
  },
};
