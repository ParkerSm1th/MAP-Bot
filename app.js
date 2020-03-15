const Client = require('./client.js');
const Config = require('./config.js');
const Logger = require('./utils/logger.js');
const client = new Client();

Logger.log(`-----------------------------[${Config.projectname} - Parker Smith]--------------------------`);
Logger.log(`             This bot was created by Parker Smith, All rights reserved                    `);
Logger.log(`                         For support or any future projects:                              `);
Logger.log(`                     https://parkersmith.io - parker@parkersmith.io                       `);
Logger.log(`                                   Starting Bot..                                         `);
Logger.log(`------------------------------------------------------------------------------`);

client.init();
