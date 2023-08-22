const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getModel } = require("../../events/bot/db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Inspect Inventory. . .")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to inspect")
        .setRequired(false)
    ),
  async execute(interaction, bot) {
    const retrievedUser = interaction.options.getUser("user");
    const user = retrievedUser || interaction.user;
    const userCheck = retrievedUser ? false : true;

    if (user.id === bot.user.id) {
      const embed = new EmbedBuilder()
        .setTitle(`Sky God's Inventory`)
        .setDescription("I am a bot. Beep boop!")
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
        })
        .setTimestamp(Date.now());

      return interaction.reply({ embeds: [embed] });
    }

    const inventoryModel = getModel("inventory");
    if (!inventoryModel) {
      return interaction.reply({
        content: `Servers are down, and we can't access the database. Please inform Doc!`,
        ephemeral: true,
      });
    }

    const userInventory = await inventoryModel.findOne({ userId: user.id });

    if (!userInventory && !userCheck) {
      return interaction.reply({
        content: `They haven't signed up to join Doc's Disposables Squadron yet!`,
        ephemeral: true,
      });
    } else if (!userInventory && userCheck) {
      return interaction.reply({
        content: `You haven't signed up to join Doc's Disposables Squadron yet!`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Inventory`)
      .setDescription("Inventory:")
      .setColor(user.displayHexColor || "#0099ff")
      .setThumbnail(user.displayAvatarURL())
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
      })
      .setTimestamp(Date.now());

    let items = "";
    if (userInventory.items.length > 0) {
      userInventory.items.forEach((item) => {
        items = items + "\u200B" + `- ${item.name} x${item.quantity}\n`;
      });
    } else {
      items = "No items in inventory";
    }
    embed.addFields({ name: " ", value: items });
    embed.addFields({
      name: "Currency:",
      value: `$${userInventory.money.toFixed(2)}`,
    });

    interaction.reply({ embeds: [embed] });
  },
};
