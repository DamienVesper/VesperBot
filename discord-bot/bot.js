/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const fs = require(`fs`);

/* Local Dependencies */
const bus = require(`./messageBus.js`);

/* Client Config */
let client = new Discord.Client({ disableEveryone: true });
var config = {
  botChannels: [
    `bot-commands`,
    `mod-commands`
  ],
	developer: `DamienVesper`,
	developerTag: `4927`,
	developerID: `386940319666667521`,
	jsonstoreToken: process.env.JSONSTORE_TOKEN,
	prefix: `!`,
  serverRoles: {
    customizable: {
      ioGames: `640324261512347659`,
      mobileGames: `640324260275027975`,
      pcGames: `640324256894287885`
    },
    member: `640324276947386368`
  },
	token: process.env.DISCORD_BOT_TOKEN,
	version: `0.2.1`,
	footer: `© DamienVesper 2019 | Failed to load version.`
}
config.footer = `© DamienVesper 2019 | v${config.version}`
module.exports = { config };

/* Client Events */
client.on(`ready`, async () => {
	console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
	client.user.setActivity(`Torn.Space`);
	refreshActivity();

  let sEmbed = new Discord.RichEmbed()
  .setTitle(`Bot Event`)
  .setColor(`#000`)
  .setDescription(`Bot has started`)
  .setTimestamp(new Date())
  .setFooter(config.footer);
  
  client.channels.get(`640666800673128453`).send(sEmbed);
});

/* Other Client Events */
let memberJoin = require(`./clientEvents/memberJoin.js`);
let memberLeave = require(`./clientEvents/memberLeave.js`);

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`./discord-bot/commands`, (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(`.`).pop() == `js`);
	if(jsfiles.length <= 0) {
		console.log(`No commands to load!`);
		return;
	}

	/* Load Commands */
	console.log(`Loading ${jsfiles.length} command(s)!`);
	jsfiles.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		client.commands.set(props.config.name, props);
	});
});

/* Client Checks */
function refreshActivity() {
	let botGame = `Vesper Clan`;
	let memberCount = client.guilds.get(`613588175025078328`).memberCount;
	client.user.setPresence({
			game: { 
					name: `${memberCount} users on ${botGame}.`,
					type: `WATCHING`
			},
			status: `dnd`
	});
}

//Refresh Activity on Member Event
client.on(`guildMemberAdd`, async () => refreshActivity());
client.on(`guildMemberRemove`, async () => refreshActivity());

//Send Message on Member Event
client.on(`guildMemberAdd`, member => bus.emit(`guildMemberAdd`, member));
client.on(`guildMemberRemove`, member => bus.emit(`guildMemberRemove`, member));

client.on(`message`, async message => {

  /* Botception & Message Handling */
	if(message.author.bot || message.channel.type == `dm`) return;
	if(message.content.slice(0, config.prefix.length) != config.prefix) return;

	/* Get Commands & Arguments */
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
  
  /* Irregular Command Handling */
  if(command == `verify`) { if(message.channel.name != `verification`) return message.delete(); }
  else if(command == `purge`) {}
  else if(message.channel.name != `bot-commands` && message.channel.name != `mod-commands`) return message.delete();

  let cmd = client.commands.get(command);
	if(cmd) cmd.run(client, message, args);
  else message.delete();
});

client.login(config.token);