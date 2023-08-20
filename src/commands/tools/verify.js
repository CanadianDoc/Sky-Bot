const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("createverify")
		.setDescription("Sets up your verification channel...")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Select your Welcome Channel")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const verifyEmbed = new EmbedBuilder()
			.setTitle("Verification")
			.setDescription(
				`Hello and Welcome!\nPlease make sure to read and follow the server rules!\nTo get started, please press the button, and follow the instruction`
			)
			.setColor(0x0824f4);
		let sendChannel = channel.send({
			embeds: [verifyEmbed],
			components: [
				new ActionRowBuilder().setComponents(
					new ButtonBuilder()
						.setCustomId("verified")
						.setLabel("Verify")
						.setStyle(ButtonStyle.Success)
				),
			],
		});
		if (!sendChannel) {
			return interaction.reply({
				content: "Error! Insufficient Permission: [Send Message]",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				content: "Verification Channel succesfully set up!",
				ephemeral: true,
			});
		}
	},
};
