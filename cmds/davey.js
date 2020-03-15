const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, "Davey's Website", "https://mrdaveyspage.com");

}

module.exports.help = {
  name:"davey",
  others:["web", "daveysite"],
  disabled:['disabledid']
}
