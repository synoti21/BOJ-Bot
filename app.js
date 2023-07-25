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
        message.reply({embeds:[new EmbedBuilder().setTitle("안녕").setDescription("나를 소개하지").addFields([{name:"이름은 디코봇", value:"직업은 Traveler"}])]})
    }else if (message.content == "뭐해"){
        message.reply("너에게 닿는 중")
    }else if (message.content == "잘가"){
        message.reply("다신 보지 말자")
    }
})
