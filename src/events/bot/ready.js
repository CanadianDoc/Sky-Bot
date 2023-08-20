const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	async execute(bot) {
		console.log(`${bot.user.tag} online`);
		bot.user.setPresence({
			activities: [{ name: `over the chaos`, type: ActivityType.Watching }],
			status: "online",
		});
	},
};
