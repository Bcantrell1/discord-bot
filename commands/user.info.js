const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'info',
	description: 'User information',
	execute(message) {
        const {guild, channel} = message;

        const user = message.mentions.users.first() || message.member.user;
    console.log(user.tag);
        const member = guild.members.cache.get(user.id);
        const embed = new MessageEmbed().setAuthor(
            `User info for ${user.username}`, 
            user.displayAvatarURL()).addFields(
                {
                    name: 'User tag',
                    value: user.tag,
                },
                {
                    name: 'Is bot',
                    value: user.bot ? 'Yep' : 'Nope',
                },
                {
                    name: 'Nickname',
                    value: member.nickname || 'has not set nickname',
                },
                {
                    name: 'Joined Discord',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                },
                {
                    name: 'Joined server',
                    value: new Date(member.joinedTimestamp).toLocaleDateString(),
                }
            )
        channel.send(embed);
	}
};