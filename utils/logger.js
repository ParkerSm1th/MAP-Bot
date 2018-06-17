const chalk = require("chalk");
function getTime() {
  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*+1));
  return nd.toLocaleString();
}

module.exports = {
  successLog: function (message) {
    console.log(chalk.green(`(${getTime()}) [SUCCESS] ` + message));
  },

  majorSuccessLog: function (message) {
    console.log(chalk.green(chalk.bold(`(${getTime()}) [SUCCESS] ` + message)));
  },

  errorLog: function (message) {
    console.log(chalk.red(`(${getTime()}) [ERROR] ` + message));
  },

  warnLog: function (message) {
    console.log(chalk.yellow(`(${getTime()}) [WARN] ` + message));
  },

  log: function (message) {
    console.log(chalk.cyan(`(${getTime()}) [LOG] ` + message));
  },

  logCommand: function (message, cmd) {
    console.log(chalk.cyan(`(${getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has successfully run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name));
  },

  logErrorCommand: function (message, cmd) {
    console.log(chalk.cyan(`(${getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has tried to run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name + " (Command not found)"));
  }
}
