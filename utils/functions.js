function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
const Discord = require('discord.js');
var bot = new Discord.Client();
const Config = require('../config.js');
var url = Config.url;
var projectname = Config.projectname;
var hex = Config.hex;
var copyright = Config.copyright;
var apiref = Config.apiref;
var port = Config.port;
var dmoff = Config.dmoff;
var fs = require('fs');
var readLine = require('readline');

var r = hexToRgb(hex).r;
var g = hexToRgb(hex).g;
var b = hexToRgb(hex).b;
var color = (r << 16) | (g << 8) | b;

module.exports = {
  returnData: function(res, json) {
    if (json != "" && json != null) {
      res.json([{"success" : "true"}, {"data" : json}]);
    } else {
      res.json([{"success" : "false"}, {"error" : "No data"}]);
    }
  },
  sendEmbed: function (channel, title, fields) {
    return new Promise((resolve, reject)=>{
      channel.send({embed: {
          color: color,
          author: {
            name: title,
            icon_url: Config.avatar
          },
          url: url,
          fields: fields,
          timestamp: new Date(),
          footer: {
            text: copyright
          }
        }
      }).then(message => {
        resolve(message);
      }).catch(err => {
        reject(err);
      });
    });
  },
  sendSimpleEmbed: function (channel, header, content) {
    return new Promise((resolve, reject)=>{
      channel.send({embed: {
          color: color,
          author: {
            name: " ",
            icon_url: Config.avatar
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
            icon_url: Config.avatar,
            text: copyright
          }
        }
      }).then(message => {
        resolve(message);
      }).catch(err => {
        reject(err);
      });
    });
  },
  sendErrorEmbed: function (channel, content) {
    return new Promise((resolve, reject)=>{
      channel.send({embed: {
          color: color,
          author: {
            name: " ",
            icon_url: Config.avatar
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
            icon_url: Config.avatar,
            text: copyright
          }
        }
      }).then(message => {
        resolve(message);
      }).catch(err => {
        reject(err);
      });
    });
  },
  sendSuccessEmbed: function (channel, content) {
    return new Promise((resolve, reject)=>{
      channel.send({embed: {
          color: color,
          url: url,
          fields: [
            {
              name: "⁫Success",
              value: content
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: Config.avatar,
            text: copyright
          }
        }
      }).then(message => {
        resolve(message);
      }).catch(err => {
        reject(err);
      });
    });
  },
  permsError: function (channel) {
    return new Promise((resolve, reject)=>{
      channel.send({embed: {
          color: color,
          author: {
            name: "Error",
            icon_url: Config.avatar
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
            icon_url: Config.avatar,
            text: copyright
          }
        }
      }).then(message => {
        resolve(message);
      }).catch(err => {
        reject(err);
      });
    });
  },
  checkPerms: function (message, role) {
    if (message.member.roles.has(message.guild.roles.find('name', role).id)) {
      return true;
    } else {
      return false;
    }
  },
  getTime: function () {
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*+1));
    return nd.toLocaleString();
  },
  loadBannedWords: function(){
        var bannedWords = [];
        var filename = './banned.txt';
        readLine.createInterface({
            input: fs.createReadStream(filename),
            terminal: false
        })
        .on('line', function(line){
            bannedWords.push(line);
        });
        return bannedWords;
    }

}
