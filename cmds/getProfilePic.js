const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  const firstTag = message.mentions.members.first();
  if (firstTag == null) {
    helpers.sendErrorEmbed(message.channel, "<@" + message.author.id + "> You must tag a user to use this command.");
    return true;
  }
  Client.Logger.log(firstTag.user.avatarURL);
  message.channel.send({
    files: [`https://cdn.discordapp.com/avatars/${firstTag.id}/${firstTag.user.avatar}.png`]
  }).then(msg => {
    helpers.sendSimpleEmbed(message.channel, 'Profile Picture', `I've sent <@${firstTag.id}>'s profile picture.`)
  })
}

module.exports.help = {
  name:"profilepic",
  others:['pp']
}
