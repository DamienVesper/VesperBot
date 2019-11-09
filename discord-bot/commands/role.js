const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!args[1] || typeof args[1] != `string`) return message.channel.send(`Please specify the nickname of the role!`);
  let actionType = args[0];
  let actionRole = args[1];
  
  const roleSys = {
    "io": config.serverRoles.customizable.ioGames,
    "mob": config.serverRoles.customizable.mobileGames,
    "pc": config.serverRoles.customizable.pcGames
  }
  
  if(!roleSys[actionRole]) return message.channel.send(`Please specify the nickname of the role!`);
  if(actionType == `add`) {
    if(message.member.roles.has(roleSys[actionRole])) return message.channel.send(`You already have that role!`);
    message.member.addRole(roleSys[actionRole]);
    return message.channel.send(`Changed roles for **${message.author.username}#${message.author.discriminator}**.`);
  }
  else if(actionType == `remove`) {
   if(!message.member.roles.has(roleSys[actionRole])) return message.channel.send(`You do not have that role!`);    
    message.member.removeRole(roleSys[actionRole]);
    return message.channel.send(`Changed roles for **${message.author.username}#${message.author.discriminator}**.`);
  }
  else return message.channel.send(`${message.author} Please specify whether you are adding or removing a role!`);
}

module.exports.config = {
  name: `role`
}