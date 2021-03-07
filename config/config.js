require(`dotenv`).config();
const pjson = require(`../package.json`);

const config = {
    developer: `DamienVesper`,
    developerTag: `0001`,
    developerID: `386940319666667521`,
    prefix: `v!`,
    token: process.env.DISCORD_BOT_TOKEN,
    db: {
        uri: process.env.MONGO_URI,
        uriParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    version: pjson.version,
    footer: `© Created by ${pjson.author}`
};

config.footer += ` | v${config.version}`;
module.exports = config;
