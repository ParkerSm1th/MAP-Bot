const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {
  if (message.author.id === '212630637365035009') {
    helpers.sendSimpleEmbed(message.channel, "Log Link", "http://144.217.82.168:2052/api/mapbot/logs/" + message.channel.id)
    .then(msg => {
      msg.delete(4000)
    });
  }
}

module.exports.help = {
  name:"logs",
  others:[]
}
