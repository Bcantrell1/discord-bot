const helperMethods = require('../common/helper');
const request = require('request');

module.exports = {
	name: 'winloss',
	description: 'Win Loss Record',
	async execute(message) {
		const { guild, channel } = message;
		
		const user = message.mentions.users.first() || message.member.user;
		const member = guild.members.cache.get(user.id);
		const id = helperMethods.playerLookup(member.user.id);

		const requestUrl = "https://api.opendota.com/api/players/";
		const url = requestUrl.concat(id, '/counts');

		request(url, function (error, response, body) {
            const data = JSON.parse(body);
            if (typeof data.leaver_status[0] == 'undefined') {
                channel.send('Error, invalid ID');
            } else {
                channel.send('```Total matches completed: ' 
                                    + data.leaver_status[0].games + 
                                    '\nWins: ' + data.leaver_status[0].win + 
                                    '\nLosses: ' + (data.leaver_status[0].games - data.leaver_status[0].win) + 
                                    '\nWon: ' + Math.round((data.leaver_status[0].win / data.leaver_status[0].games)*100) +'% ```');
            }
        });
	}
};