const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leagueroll")
    .setDescription("Let's spin the champion roulette!..."),
  async execute(interaction, bot) {
    try {
      const latestPatch = (
        await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
      ).data[0];
      const allChampionsData = (
        await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/champion.json`
        )
      ).data.data;
      const champions = Object.entries(allChampionsData);

      const randomIndex = Math.floor(Math.random() * champions.length);
      const [championName] = champions[randomIndex];
      await interaction.reply(`Your champion is: ${championName}!`);
    } catch (error) {
      console.error(error);
      await interaction.reply("League of Legends API is down at the moment.");
    }
  },
};
