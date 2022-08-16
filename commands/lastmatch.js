const helperMethods = require('../common/helper');
const request = require('request');
const heroData = require('../data/heroes.json');

module.exports = {
	name: 'lastmatch',
	description: 'User\'s last dota match',
	execute(message) {
		const { guild, channel } = message;
		const user = message.mentions.users.first() || message.member.user;
		const member = guild.members.cache.get(user.id);
		let id = helperMethods.playerLookup(member.user.id);
		let requestUrl = "http://api.opendota.com/api/players/";
		let url = requestUrl.concat(id, '/recentMatches');

		request(url, function (error, response, body) {
            let data = JSON.parse(body);
            if (typeof data[0] == 'undefined') {
                channel.send('Error, invalid ID');
            } else {
                var heroName = 'Unknown';
                for (var hero of heroData['heroes']) {
                    if (data[0].hero_id == hero.id) {
                        heroName = hero.localized_name;
                    }
                }
                channel.send('https://www.opendota.com/matches/' + data[0].match_id);
                channel.send('```\nGamemode: ' + helperMethods.findGameMode(data[0].game_mode) + 
								'\nResult: ' + helperMethods.resultOfLastMatch(data[0].radiant_win, data[0].player_slot) + 
								'\nHero: ' + heroName + '\nDuration: ' + Math.round(data[0].duration/60) + ' mins' + 
								'\nLast hits: ' + data[0].last_hits + 
								'\nKills: ' + data[0].kills + 
								'\nAssists: ' + data[0].assists  + 
								'\nDeaths: ' + data[0].deaths + 
								'\nGPM: ' + data[0].gold_per_min + 
								'\nXPM: ' + data[0].xp_per_min + 
								'\nTower damage: ' + data[0].tower_damage + '```');
            }
        }); 
	}
}