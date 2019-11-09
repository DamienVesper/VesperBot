const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission(`DELETE_MESSAGES`)) return message.channel.send(`${message.author} You can't use that!`);

  if(!args[0]) return message.channel.send(`${message.author} Specify the number of messages to be deleted!`);
  let msgAmount = parseInt(args[0]);
  if(isNaN(msgAmount)) return message.channel.send(`${message.author} MessageCount has to be a number.`);
  
  if(msgAmount > 100) return message.channel.send(`${message.author} MessageCount cannot go over 100!`);
  else if(msgAmount < 1) return message.channel.send(`${message.author} MessageCount cannot go below 1!`);
  
  await message.channel.fetchMessages({ limit: msgAmount }).then(messages => {
    message.channel.bulkDelete(messages);
  });  
}

module.exports.config = {
  name: `purge`
}