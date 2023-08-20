const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("What do you want to say to me?")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What do you want to say to me?")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    const message = interaction.options.getString("message");

    //add code here that goes from message -> model -> message

    const embed = new EmbedBuilder()
      .setTitle("Chat")
      .setDescription(message)
      .setFooter("Chat")
      .setTimestamp()
      .setColor("RANDOM");
    await interaction.reply({ embeds: [embed] });
  },
};
