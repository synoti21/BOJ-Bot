const dotenv = require("dotenv");
const {Client, GatewayIntentBits, Collection} = require('discord.js')
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
const config = require("./config.json")

dotenv.config();
client.config = config;
client.commands = new Collection();

module.exports = client;

client.login(process.env.DISCORD_TOKEN);

require('./bot/welcome')

client.once('ready', async () => {
    console.log("BOJ Bot is ready")
})

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${file}`);

    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, command);
}

client.on('messageCreate', message => {
    if (message.author.bot || !message.guild) return;

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(command)
    console.log(client.commands)

    if (!client.commands.has(command)) return;

    try {
        console.log("d")
        console.log(command)
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('명령을 실행하는 동안 오류가 발생했습니다.');
    }
});
