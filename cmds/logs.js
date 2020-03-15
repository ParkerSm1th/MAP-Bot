const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, "Log Link", "http://144.217.82.168:4000/api/mapbot/logs/" + message.channel.id);

}

module.exports.help = {
  name:"logs",
  others:[]
}
