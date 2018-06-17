var Logger = require('../utils/logger.js');
var config = require('../config.js');
const fs = require("fs");
module.exports = (Client, bot, helpers) => {
  bot.user.setPresence({ game: { name: config.url, status: 'offline' } });
  Logger.log(`Set status to ${config.url}`);
  Logger.successLog(`${config.projectname} Started on ${Client.bot.guilds.size} servers`);
  Logger.majorSuccessLog(`${config.projectname} IS STARTED`);
}
