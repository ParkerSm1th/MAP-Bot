module.exports.run = async (Client, bot, message, args, helpers) => {

  let currentTime = new Date().getTime();
    let difference = currentTime - message.timestamp;
    if (difference > 999) {
      difference = difference / 1000;
    }
  message.delete();
  helpers.sendSuccessEmbed(message.author, `Pong! Ping is ${bot.pings[0]}ms`);

}

module.exports.help = {
  name:"ping",
  others:["png"]
}
