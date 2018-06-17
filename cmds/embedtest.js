module.exports.run = async (Client, bot, message, args, helpers) => {

  if (args[1] == "success") {
    helpers.sendSuccessEmbed(message.channel, `Content`);
  }
  if (args[1] == "error") {
    helpers.sendErrorEmbed(message.channel, `Content`);
  }
  if (args[1] == "simple") {
    helpers.sendSimpleEmbed(message.channel, `Header`, `Content`);
  }
  if (args[1] == "normal") {
    helpers.sendEmbed(message.channel, `Title`, [
      {
        name: "Field 1",
        value: "Field 1 value"
      },
      {
        name: "Field 2",
        value: "Field 2 value"
      }
    ]);
  }
  if (args[1] == "perms") {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"embedtest",
  others:["et"]
}
