module.exports = {
	name: 'ping',
	description: 'Check Latency',
	execute(message, client) {
        message.channel.send('Calculating ping...').then((resultMessage) => {
            const pingMs = resultMessage.createdTimestamp - message.createdTimestamp;
            message.channel.send(`Bot latency: ${pingMs}`);
        })
	}
};