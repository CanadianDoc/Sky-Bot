const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("valorantroll")
    .setDescription("Let's spin the agent roulette!..."),
  async execute(interaction) {
    try {
      const response = await axios.get("https://valorant-api.com/v1/agents");
      const agents = response.data.data.filter(
        (agent) => agent.isPlayableCharacter
      );

      if (agents.length === 0) {
        await interaction.reply(`No playable agents found.`);
      } else {
        const randomIndex = Math.floor(Math.random() * agents.length);
        const agent = agents[randomIndex];
        await interaction.reply(`Your agent is: ${agent.displayName}`);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("Valorant API is down at the moment.");
    }
  },
};
