const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  return message.channel.send(`Apply on our website: https://vesp.glitch.me/apply.`);
}

module.exports.config = {
  name: `apply`
}