const log = require(`../utils/log.js`);
const logHeader = require(`../utils/logHeader.js`);

module.exports = client => {
    console.log(client.users.fetch());

    log(`green`, `${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
    logHeader();

    client.user.setPresence({
        game: {
            name: `${client.users.size} prisoners in the dungeon`,
            type: `WATCHING`
        },
        status: `dnd`
    });
};
