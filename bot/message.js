const client = require("../index")
const welcomeMessage = require("./help")
const {PermissionsBitField, EmbedBuilder} = require('discord.js')


client.on("guildCreate", async(guild) => {
    let channel = guild.channels.cache.find(channel => channel.type === 0);
    if (!channel){
        console.log(":(")
        return
    }
    channel.send({embeds: [welcomeMessage]});
})

let prefix = "!"; // 백준 봇에게 명령어 전송 시, !(명령어)
client.on("messageCreate", async (message) =>{
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    if(message.content.startsWith(`${prefix}아이디 등록`)){
        message.channel.send("아이디 등록")
    }else if (message.content.startsWith(`${prefix}랜덤 문제 추천`)){
        message.channel.send("문제 추천")

    }else if (message.content.startsWith(`${prefix}스트릭 가드 알림 등록`)){
        message.channel.send("스트릭 가드 등록 ")

    }else if (message.content.startsWith(`${prefix}일일 문제 추천 알림 등록`)){
        message.channel.send("추천 알림 등록")

    }
});

