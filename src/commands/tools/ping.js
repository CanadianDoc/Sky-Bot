const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping... Pong..."),
  async execute(interaction, bot) {
    const embed = new EmbedBuilder()
      .setDescription(`API Latency: ${Math.round(bot.ws.ping)}ms`)
      .setColor("Random")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        text: `Requested by ${interaction.user.tag}`,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
