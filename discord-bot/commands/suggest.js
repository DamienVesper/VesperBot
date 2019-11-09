 const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  let sugMsg = args.join(` `);

  let sEmbed = new Discord.RichEmbed()
  .setTitle(`Suggestion`)
  .setDescription(`**${sugMsg}**`)
  .setTimestamp(new Date())
  .setFooter(`Requested by ${message.author.name}#${message.author.discriminator}`);
  message.guild.channels.get(``).send(sEmbed);
}

module.exports.config = {
  name: `suggest`
}