module.exports = {
	name: 'help',
	description: 'Channel Meme',
	execute(message) {
		const embed = {
			color: "#E3DA1A",
			author: {
				name: "Donger Bot created by Ziggy",
				icon_url: 'https://i.ibb.co/QP4FZ6H/Cantrell-Logo-Orange.png',
				url: 'https://github.com/Bcantrell1'
			},
			title: 'Commands',
			description: 'Current listed commands',
			fields: [
				{
					name: '!help',
					value: 'Shows all commands',
					inline: true,
					color: '#E3DA1A'
				},
				{
					name: '!info',
					value: 'Show discord information',
					inline: true,
				},
				{
					name: '!dota-info',
					value: 'Show overview of Dota 2 info.',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B' },
				{
					name: '!winloss',
					value: 'Shows Dota 2 all time win loss record.',
					inline: true,
				},
				{
					name: '!lastmatch',
					value: 'Link to last Dota 2 match & Player info.',
					inline: true,
				},
				{
					name: '!dong',
					value: 'Probably a false alarm.....',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B' },
				{
					name: '!boner',
					value: 'Call for the boner bros.',
					inline: true,
				},
				{
					name: '!youtube (search text)',
					value: 'Look up youtube video.',
					inline: true,
				},
				{
					name: '!dump',
					value: 'Dumps K-D-A over last 20 matches.',
					inline: true,
				},
			],
		};
		message.channel.send({ embed });
	}
};