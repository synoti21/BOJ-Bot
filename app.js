const {Client, GatewayIntentBits, EmbedBuilder} = require('discord.js')
const client = new Client({ rest, gateway });

client.login(process.env.DISCORD_TOKEN);
//Discord 모듈 import

client.once('ready', async () => {
    console.log("BOJ Bot is ready")
})

client.on('message', async message => {
    console.log("Ping");
    console.log(message.content);
    if (message.component === '1'){
        message.channel.send('퐁')
    }
})
