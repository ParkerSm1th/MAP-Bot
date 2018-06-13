var includes = require('../includes.js');
const fs = require("fs");
module.exports = (bot, helpers) => {
  successLog(`${helpers.global.projectname} Started on ${bot.guilds.size} servers`);
  bot.user.setPresence({ game: { name: url, status: 'offline' } });
  successLog(`Set status to ${helpers.global.url}`);
}
