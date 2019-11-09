const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  // if(message.member.roles.has(config.serverRoles[`member`])) return message.delete();
  
  message.channel.send(`You have been verified!`);
  message.member.addRole(config.serverRoles.member);
}

module.exports.config = {
  name: `verify`
}