const dotenv = require("dotenv");

const {Client, GatewayIntentBits, EmbedBuilder} = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

dotenv.config();

client.login(process.env.DISCORD_TOKEN);
//Discord 모듈 import

client.once('ready', async () => {
    console.log("BOJ Bot is ready")
})

client.on('messageCreate', async (message) => {
    console.log("Ping");
    console.log(message.content);
    if (message.content === "안녕"){
        message.reply({embeds:[new EmbedBuilder().setTitle("하이").setDescription("안녕").addFields([{name:"나는", value:"봇"}])]})
    }
})
