const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("signup")
    .setDescription("Makes the sign up message for DDS")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, bot) {
    const icon = "src/data/img/duckIcon.png";
    const attachment = new AttachmentBuilder(icon);
    const embed = new EmbedBuilder()
      .setTitle("Join Doc's Disposables Squadron!")
      .setDescription(
        "Sign up for Doc's Disposables Squadron, and take part in contracts to make yourself richer, or die, either or really. . ."
      )
      .setThumbnail("attachment://duckIcon.png")
      .addFields(
        { name: "Requirements", value: " " },
        { name: "1.", value: "Must own a copy of DCS" },
        { name: "2.", value: "Must be able to fly a plane" },
        { name: "3.", value: "Must follow the rules stated out in #rules" }
      )
      .setColor("#0022ff");

    const reply = await interaction.reply({
      embeds: [embed],
      files: [attachment],
      fetchReply: true,
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`signup-${reply.id}`)
        .setLabel("Sign Up")
        .setStyle(ButtonStyle.Success)
    );

    interaction.editReply({ components: [row] });
  },
};
