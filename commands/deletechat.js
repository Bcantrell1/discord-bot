module.exports = {
	name: 'deletechat',
	description: 'Delete a max of 99 messages in channel.',
	async execute(message) {
		const { guild, channel } = message;
		const commandArgs = message.content.split(' ');

		if (message) {
			await message.delete();
		}

		if ( /\d/.test(commandArgs[1]) === true && parseInt(commandArgs[1]) < 99) { 
			const { size, error } = await channel.bulkDelete(commandArgs[1], true);
			console.log("Error: " + error);
			console.log("Size: " + size);
		}

	}
};