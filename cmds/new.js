const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, "Successfully ran command", args[0]);

}

module.exports.help = {
  name:"cmdname",
  others:["alt", "alt1"],
  disabled:['disabledid']
}
