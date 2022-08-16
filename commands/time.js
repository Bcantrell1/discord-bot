module.exports = {
  name: 'time',
  description: 'Channel Meme',
  execute(message) {
    const d = new Date();
    const datetime = d.toLocaleString();
    message.channel.send(datetime);
  }
};
