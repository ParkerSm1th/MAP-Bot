var includes = require('../includes.js');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, "Successfully ran command", args[0]);

}

module.exports.help = {
  name:"cmdname",
  others:["alt", "alt1"],
  disabled:['disabledid']
}
