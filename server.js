/* Discord Bot */
const DiscordBot = require(`./discord-bot/bot.js`);

/* Website */
const fs = require(`fs`);

const express = require(`express`);
const bodyParser  = require(`body-parser`);
const app = express();


//Main Site
app.get(`/`, (req, res) => {
  fs.readFile(`./site/index.html`, `utf-8`, (err, data) => {
    if(err) console.log(err);
    res.send(data);
  });
});

app.get(`/about`, (req, res) => {
  fs.readFile(`./site/pages/about.html`,  `utf-8`, (err, data) => {
    res.send(data);
  });
});
app.get(`/documentation`, (req, res) => {
  fs.readFile(`./site/pages/faq.html`,  `utf-8`, (err, data) => {
    res.send(data);
  });
});
app.get(`/apply`, (req, res) => {
  fs.readFile(`./site/pages/apply.html`,  `utf-8`, (err, data) => {
    res.send(data);
  });
});
app.get(`/faq`, (req, res) => {
  fs.readFile(`./site/pages/faq.html`,  `utf-8`, (err, data) => {
    res.send(data);
  });
});
app.get(`/discord`, (req, res) => {
  fs.readFile(`./site/pages/discord.html`,  `utf-8`, (err, data) => {
    res.send(data);
  });
});

const listener = app.listen(process.env.NODE_PORT, () => console.log(`Server is listening on port ${process.env.NODE_PORT}.`));