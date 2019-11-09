const Discord = require(`discord.js`);
const { config, client } = require(`../bot.js`);
const bus = require(`../messageBus.js`);

bus.on(`guildMemberRemove`, member => {
	member.guild.channels.find(t => t.name == `serverfeed`).send({
		"embed": {
			"title": `Leave...`,
			"color": 14973996,
			"description": `**${member.user.username}** rage quit Vesper Clan.`,
			"timestamp": new Date(),
			"footer": {
				"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
				"text": `${config.footer}`
			}
		}
	});
});