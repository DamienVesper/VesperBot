require(`dotenv`).config();
const config = require(`../config/config.js`);

const Discord = require(`discord.js`);
const fs = require(`fs`);
const path = require(`path`);

// Utilities.
const log = require(`./utils/log.js`);
const logHeader = require(`./utils/logHeader.js`);
const logASCII = require(`./utils/logASCII.js`);

const mongoose = require(`mongoose`);
mongoose.connect(config.db.uri, config.db.uriParams).then(() => log(`green`, `Connected to database.`)).catch(err => log(`red`, err.stack));

const client = new Discord.Client();

// Uncaught handler.
process.on(`uncaughtException`, e => log(`red`, e.stack));

// Export client.
module.exports = client;
logASCII();

// Load events.
logHeader();
const eventFiles = fs.readdirSync(path.resolve(__dirname, `./events`)).filter(file => file.endsWith(`js`));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    log(`yellow`, `Loaded event ${file}.`);
    client.on(file.split(`.`)[0], event.bind(null, client));
}

// Load commands.
logHeader();
client.commands = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, `./commands`)).filter(file => file.endsWith(`js`));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    log(`yellow`, `Loaded command ${file}.`);
    client.commands.push({
        name: file.split(`.`)[0],
        desc: command.desc,
        usage: command.usage,
        run: command.run
    });
}

logHeader();
client.login(config.token).catch(() => log(`red`, `Failed to authenticate client with application.`));
