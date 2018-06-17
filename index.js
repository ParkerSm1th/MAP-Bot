const Discord = require('discord.js');
const Config = require('./config.js');
const fs = require("fs");
const sql = require("sqlite");
sql.open("./devbot.sqlite");

var express = require('express');
var app = express();

const global = {
    url: Config.url,
    projectname: Config.projectname,
    apiref: Config.apiref,
    port: Config.port,
    api: Config.api
};

const Functions = require('./utils/functions.js');

const helpers = {
    sendEmbed: Functions.sendEmbed,
    sendSimpleEmbed: Functions.sendSimpleEmbed,
    sendErrorEmbed: Functions.sendErrorEmbed,
    sendSuccessEmbed: Functions.sendSuccessEmbed,
    permsError: Functions.permsError,
    checkPerms: Functions.checkPerms,
    sql: sql,
    global: global,
    getTime: Functions.getTime
};

const Logger = require('./utils/logger.js');

Logger.log("-----------------[This discord bot was made by Parker Smith]-----------------");
Logger.log("This is what logging is for " + Config.projectname + ":");
Logger.successLog("This is a success");
Logger.errorLog("This is an error");
Logger.warnLog("This is a warn");
Logger.log("-----------------------------------------------------------------------------");

commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {

  if(err) Logger.errorLog(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    Logger.errorLog("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    if (f == "includes.js") return;
    let props = require(`./cmds/${f}`);
    Logger.successLog(`./cmds/${f} loaded!`);
    commands.set(props.help.name, props);
    if (props.help.others != null) {
      props.help.others.forEach((name) => {
        commands.set(name, props);
      });
    }
  });
});


// BOT

var bot = new Discord.Client();

// API

const APIClass = require('./utils/api.js');
APIClass.init(app, bot, helpers);

// BOT EVENTS

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on('raw', async event => {
	// `event.t` is the raw event name
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = bot.users.get(data.user_id);
	const channel = bot.channels.get(data.channel_id) || await user.createDM();

	// if the message is already in the cache, don't re-emit the event
	if (channel.messages.has(data.message_id)) return;

	// if you're on the master/v12 branch, use `channel.messages.fetch()`
	const message = await channel.fetchMessage(data.message_id);

	// custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
	// if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	bot.emit(events[event.t], reaction, user);
});

fs.readdir('./events/', (err, files) => {
  if (err) Logger.errorLog(err);
  Logger.successLog(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot, helpers));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});


var request = require('request');

bot.on("message", async message => {
  if(message.author.bot) return;
  var messagelog = `${message.author.username} (${message.author.id}) at ${message.createdAt}
${message.content}\n`;
  fs.appendFileSync(`logs/${message.channel.id}.txt`, messagelog);

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
  let commandfile = commands.get(cmd.slice(prefix.length));
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
        commandfile.run(bot, message, args, helpers);
        Logger.logCommand(message, cmd);
      }
    });
  } else {
    Logger.logErrorCommand(message, cmd);
  }
});

try {
    bot.login(Config.token);
} catch(err) {
    Logger.errorLog(err);
}
