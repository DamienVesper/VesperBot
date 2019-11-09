const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  message.member.voiceChannel.join().then(connection => {
    message.channel.send(`Succesfully connnected to voice channel.`);
  }).catch(err => {
    console.error(err);
  });
}

module.exports.config = {
  name: `summon`
}