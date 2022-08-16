const request = require("request");

module.exports = {
    name: "youtube",
    description: "Search for youtube video",
    execute(message) {
        const { guild, channel } = message;
        const apiKey = "AIzaSyAYpVhFT2Ak_bVU7LGuiEDUir1-CGEMLHU";
		const slice = message.content.slice(message.content.indexOf(' ') + 1);
		console.log(slice);
        const requestUrl = "https://www.googleapis.com/youtube/v3";
        const url = `${requestUrl}/search?key=${apiKey}&chart=mostPopular&part=snippet&q=${slice}`;

		if (slice !== '!youtube') {
			request(url, function (error, response, body) {
				const data = JSON.parse(body);
	
				if (data.error) {
					console.log(data.error.message);
					return;
				}
	
				let titles = data.items.map((item, i) => {
					i++;
					return i + ") " + item.snippet.title;
				});
	
				let queries = data.items.map((item) => {
					return item;
				});
	
				// List 5 video titles and ask for number for link.
				channel
					.send({
						embed: {
							title: "Type the number of the video you want:",
							description: titles.join("\n"),
							color: "#00000",
						},
					})
					.catch((err) => console.log(err));
	
				const filter = (m) => m.author.id === message.author.id && m.content >= 1 && m.content <= queries.length;
	
				message.channel
					.awaitMessages(filter, { max: 1 })
					.then((collected) => {
						const selected = queries[collected.first().content - 1];
						message.delete()
						const embed = {
							embed: {
								author: {
									name: "Youtube Result",
									icon_url:
										"https://cdn-icons.flaticon.com/png/512/2875/premium/2875384.png?token=exp=1656479173~hmac=bc596f62daf98b9f0ef6e98fb91834ef",
								},
								title: `${selected.snippet.title}`,
								url: `https://www.youtube.com/watch?v=${selected.id.videoId}`,
								description: `${selected.snippet.description}`,
								thumbnail: {
									url: `${selected.snippet.thumbnails.default.url}`,
								},
							},
						};
						channel.send(embed);
					})
					.catch((error) => console.log(error));
			});
		}
    },
};