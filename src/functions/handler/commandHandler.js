const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

const ascii = require("ascii-table");
const tableC = new ascii().setHeading("Commands", "Status");

module.exports = (bot) => {
	bot.commandHandler = async () => {
		const commandFolders = fs.readdirSync(`./src/commands`);
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith(".js"));

			const { commands, commandArray } = bot;
			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
				tableC.addRow(`${command.data.name}`, "loaded");
			}
		}

		const rest = new REST({ version: "10" }).setToken(process.env.token);
		try {
			console.log("Loading Commands");

			await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
				body: bot.commandArray,
			});

			console.log(tableC.toString());
		} catch (err) {
			console.error(err);
		}
	};
};
