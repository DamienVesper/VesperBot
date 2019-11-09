const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  message.delete();
  let pollMsg = args.join(` `);
  let newPM = await message.channel.send(`Poll: **${pollMsg}**`);
  newPM.react(`✅`).then(() => newPM.react(`❌`));
}

module.exports.config = {
  name: `poll`
}