const Logger = require('../utils/logger.js');
const Config = require('../config.js');
const Client = require('../client.js');
const fs = require("fs");

module.exports = (Client, bot, helpers, message) => {
  if(message.author.bot) return;
  var messagelog = `${message.author.username} (${message.author.id}) at ${message.createdAt}
${message.content}\n`;
  fs.appendFileSync(`./logs/${message.channel.id}.txt`, messagelog);

  if (Config.dmoff) {
    if (message.channel.type == "dm") {
      helpers.sendErrorEmbed(message.channel, "You can not run commands in PM!");
      return true;
    }
  }
  let prefix = Config.prefix;
  if (!message.content.startsWith("-")) return;
  let messageArray = message.content.trim().split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = Client.commands.get(cmd.slice(prefix.length));
  if(commandfile) {
    fs.readdir("./cmds/", (err, files) => {

      if(err) Logger.errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        Logger.errorLog("Couldn't find commands.");
        return;
      }

      let props = commandfile;
      var allowed = true;
      if (props.help.disabled != null) {
        props.help.disabled.forEach((guild) => {
          if (message.author.id != 212630637000365035009) {
            if (guild == message.guild.id) {
              helpers.sendErrorEmbed(message.channel, "This command is disabled for this server.");
              allowed = false;
            }
          }
        });
      }
      if (allowed) {
        commandfile.run(Client, bot, message, args, helpers);
        Logger.logCommand(message, cmd);
      }
    });
  } else {
    Logger.logErrorCommand(message, cmd);
  }
}
