const Discord = require('discord.js');
const TOKEN = "TOKEN";
const PREFIX = "PREFIX";
const fs = require("fs");
const sql = require("sqlite");
sql.open("./projectname.sqlite");

var express = require('express');
var app = express();

var api = "APIKEY";

var url = "urlhere";
var projectname = "PROJECTNAME"
var hex = 'HEX';
var copyright = `© ${projectname} 2018`;
var apiref = `apiref`;
var port = 'PORT';
var dmoff = true;

function returnData(res, json) {
  if (json != "" && json != null) {
    res.json([{"success" : "true"}, {"data" : json}]);
  } else {
    res.json([{"success" : "false"}, {"error" : "No data"}]);
  }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var r = hexToRgb(hex).r;
var g = hexToRgb(hex).g;
var b = hexToRgb(hex).b;
var color = (r << 16) | (g << 8) | b;

// FUNCTIONS!!

function sendEmbed(channel, title, fields) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: color,
        author: {
          name: title,
          icon_url: bot.user.avatarURL
        },
        url: url,
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: copyright
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function sendSimpleEmbed(channel, header, content) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: color,
        author: {
          name: " ",
          icon_url: bot.user.avatarURL
        },
        url: url,
        fields: [
          {
            name: header,
            value: content
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: copyright
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function sendErrorEmbed(channel, content) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: color,
        author: {
          name: " ",
          icon_url: bot.user.avatarURL
        },
        url: url,
        fields: [
          {
            name: "An error occured",
            value: content
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: copyright
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function sendSuccessEmbed(channel, content) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: color,
        author: {
          name: "⁫ ",
          icon_url: bot.user.avatarURL
        },
        url: url,
        fields: [
          {
            name: "Success",
            value: content
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: copyright
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function permsError(channel) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: color,
        author: {
          name: "Error",
          icon_url: bot.user.avatarURL
        },
        url: url,
        fields: [
          {
            name: "Permission Denied",
            value: "You are not allowed to do this!"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: copyright
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function checkPerms(message, role) {
  if (message.member.roles.has(message.guild.roles.find('name', role).id)) {
    return true;
  } else {
    return false;
  }
}

function getTime() {
  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*+1));
  return nd.toLocaleString();
}

const global = {
    url: url,
    projectname: projectname,
    apiref: apiref
};


const helpers = {
    sendEmbed: sendEmbed,
    sendSimpleEmbed: sendSimpleEmbed,
    sendErrorEmbed: sendErrorEmbed,
    sendSuccessEmbed: sendSuccessEmbed,
    permsError: permsError,
    checkPerms: checkPerms,
    sql: sql,
    global: global,
    getTime: getTime
};

var chalk = require('chalk');
function successLog(message) {
  console.log(chalk.green(`(${helpers.getTime()}) [SUCCESS] ` + message));
}

function errorLog(message) {
  console.log(chalk.red(`(${helpers.getTime()}) [ERROR] ` + message));
}

function warnLog(message) {
  console.log(chalk.yellow(`(${helpers.getTime()}) [WARN] ` + message));
}

function log(message) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message));
}

function logCommand(message, cmd) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has successfully run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name));
}

function logErrorCommand(message, cmd) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has tried to run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name + " (Command not found)"));
}

log("-----------------[This discord bot was made by Parker Smith]-----------------");
log("This is what logging is for " + projectname + ":");
successLog("This is a success");
errorLog("This is an error");
warnLog("This is a warn");
log("-----------------------------------------------------------------------------");

commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {

  if(err) errorLog(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    errorLog("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    if (f == "includes.js") return;
    let props = require(`./cmds/${f}`);
    successLog(`./cmds/${f} loaded!`);
    commands.set(props.help.name, props);
    if (props.help.others != null) {
      props.help.others.forEach((name) => {
        commands.set(name, props);
      });
    }
  });
});

// API

// GET REQUEST

app.get(`/api/${apiref}/:variable/:api`,function(req,res) {
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var arg1 = req.params.variable;
    returnData(res, arg1);
});


// POST REQUEST

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/api/${apiref}/post/:api`, function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var arg1 = req.body.arg1;
    returnData(res, arg1);
});

// Errors

app.use(function(req, res, next) {
  console.log('test');
  res.status(404).json([{"success" : "false"}, {"error" : "Invalid API Call"}]);
});

app.use(function(req, res, next) {
  console.log('test');
  res.status(500).json([{"success" : "false"}, {"error" : "An error occured"}]);
});

app.listen(port);
successLog("Started " + projectname + "'s API on port " + port + " (http://api.yeetdev.com:" + port + "/api/" + apiref + ")");

// BOT

var bot = new Discord.Client();

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
  if (err) errorLog(err);
  successLog(`Loading a total of ${files.length} events.`);
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

  if (dmoff) {
    if (message.channel.type == "dm") {
      helpers.sendErrorEmbed(message.channel, "You can not run commands in PM!");
      return true;
    }
  }
  let prefix = PREFIX;
  if (!message.content.startsWith("-")) return;
  let messageArray = message.content.trim().split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = commands.get(cmd.slice(prefix.length));
  if(commandfile) {
    fs.readdir("./cmds/", (err, files) => {

      if(err) errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        errorLog("Couldn't find commands.");
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
        logCommand(message, cmd);
      }
    });
  } else {
    logErrorCommand(message, cmd);
  }
});

try {
    bot.login(TOKEN);
} catch(err) {
    errorLog(err);
}
