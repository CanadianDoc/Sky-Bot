const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Roll the dice!...")
		.addIntegerOption((option) =>
			option
				.setName("dice")
				.setDescription("Which dice would you like to roll?")
				.setRequired(true)
				.setMinValue(1)
		)
		.addIntegerOption((option) =>
			option
				.setName("number")
				.setDescription("How many would you like to roll?")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(20)
		),
	async execute(interaction, bot) {
		const d = interaction.options.getInteger("dice");
		const num = interaction.options.getInteger("number");
		//const roll = Math.floor(Math.random() * d);

		const rolls = [];
		let total = 0;
		let min = 99999999999999999999999999999999999999999999999999999999;
		let max = 0;

		for (let i = 0; i < num; i++) {
			const roll = Math.floor(Math.random() * d) + 1;
			rolls.push(" " + roll);
			total += roll;
			if (min > roll) {
				min = roll;
			}
			if (max < roll) {
				max = roll;
			}
		}

		const embed = new EmbedBuilder()
			.setTitle(`Rolling D${d}, ${num} time(s)`)
			.setDescription(`${rolls}`)
			.addFields([
				{
					name: `Total Value:`,
					value: `${total}`,
					inline: true,
				},
			])
			.addFields([
				{
					name: "Highest Roll:",
					value: `${max}`,
					inline: true,
				},
			])
			.addFields([
				{
					name: "Lowest Roll:",
					value: `${min}`,
					inline: true,
				},
			])
			.setColor("Random")
			.setTimestamp(Date.now())
			.setFooter({
				iconURL: `${interaction.user.displayAvatarURL()}`,
				text: `Rolled by ${interaction.user.tag}`,
			});

		await interaction.reply({
			embeds: [embed],
		});
	},
};
