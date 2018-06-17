module.exports.run = async (Client, bot, message, args, helpers) => {

  const alt = [
  'You are a liar',
  'You are telling the truth!'
  ];
  var item = alt[Math.floor(Math.random()*alt.length)];
  helpers.sendSimpleEmbed(message.channel, "Result", item)

}

module.exports.help = {
  name:"lyingtest",
  others:["lt", "lyingt"],
  disabled:['disabledid']
}
