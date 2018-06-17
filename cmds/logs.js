var Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, `API link for ${Config.projectname}`, `http://api.yeetdev.com:${Config.port}/api/${Config.apiref}/logs/${message.channel.id}`);

}

module.exports.help = {
  name:"logs"
}
