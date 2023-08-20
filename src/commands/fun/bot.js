const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Talk to the RubberDuck. . .")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What do you want to say to the RubberDuck?")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    const message = interaction.options.getString("message");
    const embed = new EmbedBuilder()
      .setTitle("RubberDuck")
      .setDescription(message)
      .setFooter("RubberDuck")
      .setTimestamp()
      .setColor("RANDOM");
    await interaction.reply({ embeds: [embed] });
  },
};
