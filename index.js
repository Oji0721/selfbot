const { keepAlive } = require('./keepAlive');
const { Client, RichPresence } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

const client = new Client({ checkUpdate: false });

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const r = new RichPresence()
		.setApplicationId('1136560543742836746')
		.setType('PLAYING')
		.setName('Roblox')
		.setDetails('for 7 days')
		.setAssetsLargeImage('https://cdn.discordapp.com/emojis/1148873339700510751.png')
		.setAssetsLargeText('Roblox')
		//  .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1136880688709255231/1148871512795926619/n106gv8b3j.gif')
		// .setAssetsSmallText('Verified')
		.addButton('Roblox Profile', 'https://www.roblox.com/users/2243502531/profile');
	client.user.setActivity(r);
	console.log("RPC Loaded");
	client.user.setPresence({ status: "idle" });
});

client.on("messageCreate", async (message) => {
	if (message.author.id === "906345112383135765") {
		if (!message.content.startsWith("!")) return;
		const args = message.content.trim().split(/ +/g);
		const cmd = args[0].slice("!".length).toLowerCase();
		if (cmd === "join") {
			message.delete();
			if (!args[1]) return;
			await joinVC(client, args[2] || message.guild.id, args[1]);
		} else if (cmd === "leave") {
			message.delete();
			const connection = getVoiceConnection(args[1] || message.guild.id);
			if (connection) connection.disconnect();
		} else if (cmd === "status") {
			message.delete();
			if (!args[1]) return;
			client.user.setPresence({ status: args[1] });
		} else if (cmd === "bump") {
			message.delete();
			message.channel.sendSlash('302050872383242240', 'bump')
  .catch(console.error);
		}
	} else if (message.author.id === "735147814878969968") {
		if (message.channelId === "1131486127476457532" || message.channelId === "1149228332731342948") {
			if (message.content === "Thx for bumping our Server! We will remind you in 2 hours!\n<@906345112383135765>") return;
			message.channel.sendSlash('302050872383242240', 'bump')
				.catch(console.error);
		} 
	}
});

async function joinVC(client, args1, args2) {
	const guild = client.guilds.cache.get(args1);
	const voiceChannel = guild.channels.cache.get(args2);
	joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: guild.id,
		adapterCreator: guild.voiceAdapterCreator,
		selfDeaf: true,
		selfMute: true
	});
}

client.login(process.env.DISCORD_TOKEN);
keepAlive();