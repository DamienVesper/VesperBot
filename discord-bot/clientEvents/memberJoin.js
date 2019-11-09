const Discord = require(`discord.js`);
const { config, client } = require(`../bot.js`);
const bus = require(`../messageBus.js`);

bus.on(`guildMemberAdd`, member => {
  let sEmbed = new Discord.RichEmbed()
  .setTitle(`Welcome!`)
  .setColor(`#ffa500`)
  .setDescription(`Welcome to the server, **${member.user.username}**!\n Do \`${config.prefix}verify\` to see the rest of the server!`)
  .setTimestamp(new Date())
  .setFooter(config.footer);
  
  let xEmbed = new Discord.RichEmbed()
  .setTitle(`Welcome!`)
  .setColor(`#ffa500`)
  .setDescription(`A wild **${member.user.username}** has appeared! :tada: \nThere are now **${member.guild.memberCount}** users!`)
  .setTimestamp(new Date())
  .setFooter(config.footer);

  member.guild.channels.get(`640323885946109952`).send(sEmbed);
  member.guild.channels.get(`640323386559561730`).send(xEmbed);
});
