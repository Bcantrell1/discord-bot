const helperMethods = require('../common/helper');
const request = require('request');

module.exports = {
  name: 'dota-info',
  description: 'User Dota Info',
  execute(message) {
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);
    
    let requestUrl = "http://api.opendota.com/api/players/";
    let id = helperMethods.playerLookup(member.user.id);

    if(id) {
      let url = requestUrl.concat(id);
  
      request(url, function(error, response, body) {
        try {
          if(response.statusCode === 200) {
            let data = JSON.parse(body);
            if (data.error == 'Internal Server Error' || typeof data.profile == 'undefined') {
              channel.send('Error, invalid ID');
            } else {
              channel.send('```Name: ' + data.profile.personaname +
                '\nRank: ' + helperMethods.findRankTier(data.rank_tier) +
                '\nMMR estimate: ' + data.mmr_estimate.estimate +
                '```', { files: [data.profile.avatarmedium] });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
    
  }
}