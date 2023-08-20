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
    .setName("poll")
    .setDescription("Create a poll. . .")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What do you want to poll? True or False Only")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    const question = interaction.options.getString("question");

    const embed = new EmbedBuilder()
      .setTitle("Poll by " + interaction.user.username)
      .setDescription("**Questions**\n" + question)
      .setColor("Random")
      .addFields([
        { name: "Yes", value: "0", inline: true },
        { name: "No", value: "0", inline: true },
      ])
      .setTimestamp(Date.now());

    const reply = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`poll-yes-${reply.id}`)
        .setLabel("Yes")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`poll-no-${reply.id}`)
        .setLabel("No")
        .setStyle(ButtonStyle.Danger)
    );

    interaction.editReply({ components: [row] });
  },
};
