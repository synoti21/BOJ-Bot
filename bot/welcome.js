const client = require("../index")
const welcomeMessage = require("./help")

const config = require("../config.json")
client.on("guildCreate", async(guild) => {
    let channel = guild.channels.cache.find(channel => channel.type === 0);
    if (!channel){
        console.log(":(")
        return
    }
    channel.send({embeds: [welcomeMessage]});
})


