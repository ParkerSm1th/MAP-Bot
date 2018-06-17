const Logger = require('./utils/logger.js');
const Config = require('./config.js');
const fs = require("fs");
module.exports = {
  init: function(Client, bot, helpers) {
    fs.readdir("./cmds/", (err, files) => {
      Logger.log("Loading Commands");
      if(err) Logger.errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        Logger.errorLog("Couldn't find commands.");
        return;
      }
      Logger.log(`Loading a total of ${jsfile.length} commands.`);
      jsfile.forEach((f, i) =>{
        if (f == "includes.js") return;
        let props = require(`./cmds/${f}`);
        Client.commands.set(props.help.name, props);
        if (props.help.others != null) {
          props.help.others.forEach((name) => {
            Client.commands.set(name, props);
          });
        }
      });
      Logger.log("Loaded Commands");
    });
    fs.readdir('./events/', (err, files) => {
      Logger.log("Loading Events");
      if (err) Logger.errorLog(err);
      Logger.log(`Loading a total of ${files.length} events.`);
      files.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        Client.bot.on(eventName, event.bind(null, Client, Client.bot, Client.helpers));
        delete require.cache[require.resolve(`./events/${file}`)];
      });
      Logger.log("Loaded Events");
    });
  }
}
