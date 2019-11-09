const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(message.guild.me.voiceChannel == undefined) return message.channel.send(`${message.author} I am not connected to a voice channel!`);
  message.guild.me.voiceChannel.leave();
  message.channel.send(`Succesfully left the voice channel!`);
}

module.exports.config = {
  name: `disconnect`
}