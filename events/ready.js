var includes = require('../includes.js');
const fs = require("fs");
module.exports = (bot, helpers) => {
  helpers.successLog(`${helpers.global.projectname} Started on ${bot.guilds.size} servers`);
  bot.user.setPresence({ game: { name: helpers.global.url, status: 'offline' } });
  helpers.successLog(`Set status to ${helpers.global.url}`);
}
