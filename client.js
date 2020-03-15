const Discord = require('discord.js');
const Config = require('./config.js');
const fs = require("fs");
const sql = require("sqlite");
sql.open("./devbot.sqlite");

var express = require('express');

const Logger = require('./utils/logger.js');
const Loader = require('./loader.js');
const Functions = require('./utils/functions.js');
const APIClass = require('./utils/api.js');
const bannedWords = Functions.loadBannedWords();

class Client {
  constructor() {
    this.Logger = Logger;
    this.Config = Config;
    this.APIClass = APIClass;
    this.Loader = Loader;
    this.app = express();
    this.bannedWords = bannedWords;
    this.bot = new Discord.Client();
    this.global = {
        url: Config.url,
        projectname: Config.projectname,
        apiref: Config.apiref,
        port: Config.port,
        api: Config.api
    };
    this.helpers = {
        sendEmbed: Functions.sendEmbed,
        sendEmbedWithPics: Functions.sendEmbedWithPics,
        sendSimpleEmbed: Functions.sendSimpleEmbed,
        sendErrorEmbed: Functions.sendErrorEmbed,
        sendSuccessEmbed: Functions.sendSuccessEmbed,
        permsError: Functions.permsError,
        checkPerms: Functions.checkPerms,
        sql: sql,
        global: global,
        getTime: Functions.getTime
    };
    this.commands = new Discord.Collection();
  }

  init() {
    this.Loader.init(this, this.bot, this.helpers);
    this.bot.login(Config.token);
    this.APIClass.init(this.app, this.bot, this.helpers);
    this.Logger.successLog("Successfully logged in");
  }
}

module.exports = Client;
