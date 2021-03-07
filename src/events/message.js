const config = require(`../../config/config.js`);
const log = require(`../utils/log.js`);

module.exports = async (client, message) => {
    const m = `${message.author} »`;

    // Botception and prefix handling.
    if (message.author.bot || message.channel.type === `dm`) return;
    if (message.content.slice(0, config.prefix.length).toString().toLowerCase() !== config.prefix) return;

    // Lock usage to designated channel in official server.
    if (message.guild.id === `247490958374076416` & message.channel.id !== `493489353046097926`) return message.delete();

    // Parse arguments and command.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command from the handler and run it.
    const cmd = client.commands.find(cmd => cmd.name === command || (cmd.aliases && cmd.aliases.includes(command)));
    if (!cmd) return;

    if ((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
        try {
            log(`magenta`, `${message.author.tag} ran command ${command} in ${message.guild.name}.`);
            cmd.run(client, message, args);
        } catch (err) {
            log(`err`, err.stack);
        }
    }
};
