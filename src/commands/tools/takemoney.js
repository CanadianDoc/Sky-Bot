const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getModel } = require("../../events/bot/db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("takemoney")
    .setDescription("How much money do you want to take?")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to take money from")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of money you want to take")
        .setMinValue(0.01)
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, bot) {
    const amount = interaction.options.getNumber("amount");
    const user = interaction.options.getUser("user");
    const inventoryModel = getModel("inventory");

    if (user.id === bot.user.id) {
      return interaction.reply({
        content: `I am a bot. Beep boop!`,
        ephemeral: true,
      });
    }
    const targetInventory = await inventoryModel.findOne({ userId: user.id });

    if (!targetInventory) {
      return interaction.reply({
        content: `${user.username} has not signed up and does not have any money.`,
        ephemeral: true,
      });
    }

    if (targetInventory.money < amount) {
      amount = targetInventory.money;
    }

    targetInventory.money -= amount;
    await targetInventory.save();

    await interaction.reply({
      content: `You have taken $${amount.toFixed(2)} from ${user.username}`,
      ephemeral: true,
    });
  },
};
