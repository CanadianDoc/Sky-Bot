const { loadData, saveData, getModel } = require("../bot/db");

module.exports = {
  data: {
    name: "signup",
    description: "handles signup buttons",
  },

  async execute(interaction) {
    if (!interaction.isButton()) return;

    const arr = interaction.customId.split("-");
    if (arr[0] !== "signup") return;

    const userId = interaction.user.id;
    const role = interaction.guild.roles.cache.get(process.env.recruitRoleId);

    const inventoryModel = getModel("inventory");
    const userInventory = await inventoryModel.findOne({
      userId: userId,
    });

    if (userInventory) {
      return interaction.reply({
        content: "You already signed up for Doc's Disposables Squadron",
        ephemeral: true,
      });
    } else {
      const newInventory = new inventoryModel({
        userId: userId,
        items: [],
        money: 0.0,
      });
      await newInventory.save();

      if (!role) {
        return interaction.reply({
          content:
            "You have successfully signed up for Doc's Disposables Squadron, but something went wrong with the roles,\nPlease contact an admin to get your roles",
          ephemeral: true,
        });
      }

      const member = interaction.guild.members.cache.get(userId);
      await member.roles.add(role);

      return interaction.reply({
        content:
          "You have successfully signed up for Doc's Disposables Squadron",
        ephemeral: true,
      });
    }
  },
};
