const Logger = require('./logger.js');
const Config = require('../config.js');
module.exports = {
  init: function(app, bot, helpers) {
    Logger.log("Initializing API");
    var apiref = Config.apiref;
    var port = Config.port;
    var api = Config.api;
    // NO API Key

    app.get(`/api/${apiref}/logs/:variable`,function(req,res) {
        var arg1 = req.params.variable;
        if (bot.channels.get(arg1) != null) {
          res.sendFile('/home/bot-host/MAP-Bot/logs/' + arg1 + ".txt");
        } else {
          helpers.returnData(res, "");
        }
    });

    // GET REQUEST

    // REQUIRED API KEY

    app.get(`/api/${apiref}/:variable/:api`,function(req,res) {
        if (req.params.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var arg1 = req.params.variable;
        returnData(res, arg1);
    });

    app.get(`/api/${apiref}/guild/:variable/:api`,function(req,res) {
        if (req.params.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var arg1 = req.params.variable;
        var guild = bot.guilds.get(arg1);
        guild.fetchMembers().then(() => {
          helpers.returnData(res, guild);
        });
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
        helpers.returnData(res, arg1);
    });

    // Errors

    app.use(function(req, res, next) {
      res.status(404).json([{"success" : "false"}, {"error" : "Invalid API Call"}]);
    });

    app.use(function(req, res, next) {
      res.status(500).json([{"success" : "false"}, {"error" : "An error occured"}]);
    });
    app.listen(port);
    Logger.successLog("Started " + Config.projectname + "'s API on port " + Config.port + " (http://api.yeetdev.com:" + Config.port + "/api/" + Config.apiref + ")");
  }
}
