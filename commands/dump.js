const helperMethods = require('../common/helper');
const request = require('request');

module.exports = {
  name: 'dump',
  description: 'Dumps K-D-A in last 10 matches',
  execute(message) {
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.member.user;
    let id = helperMethods.playerLookup(387381455107391491);
    let requestUrl = `http://api.opendota.com/api/players/${id}/recentMatches`;

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
      channel.send('```Dumps K-D-A in last 20 matches: ' + kills + '/' + deaths + '/' + assists + '```');
    });
  }
}