const helperMethods = require('../common/helper');
const request = require('request');

module.exports = {
  name: 'kda',
  description: 'Dumps K-D-A in last 10 matches',
  execute(message) {
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);
    let id = helperMethods.playerLookup(member.user.id);
    let requestUrl = `http://api.opendota.com/api/players/${id}/recentMatches`;

    try {
      request(requestUrl, function(error, response, body) {
        let data = JSON.parse(body);
        let kills = 0;
        let deaths = 0;
        let assists = 0;
        data.forEach((match) => {
          kills += match.kills;
          deaths += match.deaths;
          assists += match.assists;
        })
        const kdaP = Math.round(((kills + assists) / deaths) * 1000) / 1000;
        channel.send('```' + user.username + ' K-D-A in last 20 matches: ' + kdaP + '% ratio \n' + kills + '/' + deaths + '/' + assists + '```');
      });
    } catch (e) {
      console.log(e);
    }
  }
}