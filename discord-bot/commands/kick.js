const Discord = require(`discord.js`);
const { config } = require(`../bot.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(`${message.author} You're not allowed to use that!`);
  
  let kickMember = message.mentions.members.first();
  if(!kickMember) return message.channel.send(`${message.author} Please specify a valid member of this server!`);
  if(!kickMember.kickable) return message.channel.send(`${message.author} That user is a mod / admin.`);
  
  let kickReason = args.slice(1).join(` `);
  if(!kickReason) kickReason = `No reason provided.`;
  
  kickMember.send(`You were kicked from **${message.guild.name}**for **${kickReason}**.`).catch(err => console.log(err));
  
  await kickMember.kick(kickReason).catch(err => {
    message.channel.send(`Failed to kick ${kickMember}.`);
    console.log(err);
  });
  message.channel.send(`**${kickMember.user.username}** was kicked: **${kickReason}**`);
}

module.exports.config = {
  name: `kick`
}