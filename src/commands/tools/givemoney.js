const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { getModel } = require("../../events/bot/db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("givemoney")
    .setDescription("Give Money to a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to give money to")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of money you want to give")
        .setMinValue(0.01)
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction, bot) {
    const amount = interaction.options.getNumber("amount");
    const user = interaction.options.getUser("user");
    const inventoryModel = getModel("inventory");
    const isAdmin = Boolean(
      interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    );

    if (user.id === bot.user.id) {
      return interaction.reply({
        content: `I am a bot. Beep boop!`,
        ephemeral: true,
      });
    } else if (!isAdmin && user.id === interaction.user.id) {
      return interaction.reply({
        content: `You can't give money to yourself!`,
        ephemeral: true,
      });
    }

    const giverInventory = await inventoryModel.findOne({
      userId: interaction.user.id,
    });
    const receiverInventory = await inventoryModel.findOne({ userId: user.id });

    if (!receiverInventory) {
      return interaction.reply({
        content: `${user.username} has not signed up and cannot receive money.`,
        ephemeral: true,
      });
    }

    if (isAdmin) {
      receiverInventory.money += amount;
      await receiverInventory.save();
    } else {
      if (!giverInventory || giverInventory.money < amount) {
        return interaction.reply({
          content: `You don't have enough money to give $${amount.toFixed(
            2
          )} to ${user.username}`,
          ephemeral: true,
        });
      }

      giverInventory.money -= amount;
      receiverInventory.money += amount;
      await giverInventory.save();
      await receiverInventory.save();
    }

    const embed = new EmbedBuilder()
      .setTitle(
        `${interaction.user.username} gave ${user.username} $${amount.toFixed(
          2
        )}`
      )
      .setColor(interaction.user.displayHexColor || "#0099ff")
      .setTimestamp(Date.now());

    await interaction.reply({ embeds: [embed] });
  },
};
