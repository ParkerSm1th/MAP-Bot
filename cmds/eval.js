const Discord = require('discord.js');
const hastebin = require('hastebin');

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
      return text;
  }
}

module.exports.run = async (Client, bot, message, args, helpers) => {
  if (message.author.id !== '212630637365035009') return;
  message.delete();
  try {
    const code = args.slice(1).join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled);
    }
    if (evaled == '') {
      message.author.send("ERROR EMPTY MESSAGE", {code:"xl"});
      return;
    }
    if (evaled.length > 1500) {
      hastebin.createPaste(`${evaled}`, {
        raw: false,
        contentType: 'text/plain',
        server: 'http://paste.parkersmith.io'
      }).then(r => {
        Client.Logger.log(r);
        helpers.sendErrorEmbed(message.author, `The output was over 1.5k characters, I have uploaded to hastebin. Uploaded to ${r}.`);
      }).catch(err => Client.Logger.errorLog(err));
    } else {
      message.author.send(clean(evaled), {code:"xl"});
    }
  } catch (err) {
    message.author.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

}

module.exports.help = {
  name:"eval",
  others:[]
}
