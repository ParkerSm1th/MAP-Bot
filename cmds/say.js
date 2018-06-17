module.exports.run = async (Client, bot, message, args, helpers) => {

  if (args.length < 2) {
    helpers.sendErrorEmbed(message.channel, "You must use -say (Message)");
    return true;
  }

  if (message.author.id != '212630637365035009') return;

  message.delete();
  var msg = args.join(" ").slice(args[0].length + 1);
  helpers.sendSimpleEmbed(message.channel, 'Message', msg);

}

module.exports.help = {
  name:"say"
}
