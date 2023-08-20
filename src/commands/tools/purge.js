const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Let us purge these heretical messages!...")
		.addNumberOption((option) =>
			option
				.setName("amount")
				.setDescription("How many messages shall be purged?")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction, bot) {
		const amount = interaction.options.getNumber("amount");

		if (amount < 1) {
			return interaction.reply({
				content: "Number must be more than 1",
				ephemeral: true,
			});
		}

		try {
			await interaction.channel.bulkDelete(amount, true).size;
		} catch (err) {
			console.error(err);
		}

		interaction.reply({
			content: "Messages purged",
			ephemeral: true,
		});
	},
};
