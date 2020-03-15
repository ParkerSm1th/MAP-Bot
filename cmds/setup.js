module.exports.run = async (Client, bot, message, args, helpers) => {

  message.delete();
  helpers.sendSuccessEmbed(message.channel, "I've messaged you instructions on how to get started with Discord!")
  .then(msg => {
    msg.delete(4000)
  })
  .catch(err => {
    Client.Logger.errorLog(err);
  });
  helpers.sendEmbedWithPics(message.author, 'Getting started with Discord', [
    {
      name: "Intro",
      value: "Hi! I'm the **MAP Bot**! A lot of students are new to discord and are a little confused on how it works. I am here to help you with that a little bit :)"
    },
    {
      name: "Messaging",
      value: "To get started with messaging, you can click on any channel, for example #general-map-chat. Once you click on that channel you should be able to type messages in the channel. You must abide by the rules though, if you attempt to swear it will be deleted and the teachers will be notified."
    },
    {
      name: "Voice Chat",
      value: "For voice chat, any channel that you can see and has a speaker icon next to it you can click on it and you will be added to the channel. If you do not have push to talk setup you will not be able to talk."
    },
    {
      name: "Setup **Push to talk**",
      value: "To setup push to talk you need to click the settings icon next to your name and then click Voice & Video(if you are on your computer), if you are on your phone you need to click your profile picture then scroll to where it says voice, click that then from there it is the same on computer & your phone. Once to the settings page click 'Input Mode' and you can choose Voice Activity or Push to Talk. You need to choose Push to Talk for the MAP server. From there on the computer you can choose a keybind and on your phone there will be a button you can click to talk when you are in a voice channnel."
    }
  ], ['./images/img1.png', './images/img2.png']);

}

module.exports.help = {
  name:"setup",
  others:["new", "help"]
}
