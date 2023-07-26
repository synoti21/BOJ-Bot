const dotenv = require("dotenv");
const {Client, GatewayIntentBits} = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

dotenv.config();
module.exports = client;

client.login(process.env.DISCORD_TOKEN);

client.once('ready', async () => {
    console.log("BOJ Bot is ready")
})