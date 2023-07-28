const client = require("../index")
const {PermissionsBitField, EmbedBuilder} = require('discord.js')

const embedWelcome = new EmbedBuilder()
    .setColor(0x3498DB)
    .setAuthor({name: 'BOJ Bot'})
    .setTitle("안녕하세요 백준 봇입니다 :)")
    .setDescription("원하시는 서비스를 !{명령어} 형식으로 입력해주세요!")
    .addFields(
        { name: '!아이디 등록', value: '백준 봇 서비스를 사용하기 위해 백준 아이디를 등록합니다.', inline: false },
        { name: '!랜덤 문제 추천', value: '클릭 시 백준에서 랜덤하게 문제를 추천해드립니다.', inline: false },
        { name: '!스트릭 가드 알림 등록', value: '매일 문제를 풀지 않았을 경우, 알림을 보내드립니다.', inline: false },
        { name: '!일일 문제 추천 알림 등록', value: '일일 맞춤형 문제를 추천 드립니다.', inline: false },
    )
    .setTimestamp()
client.on("guildCreate", async(guild) => {
    let channel = guild.channels.cache.find(channel => channel.type === 0);
    if (!channel){
        console.log(":(")
        return
    }
    channel.send({embeds: [embedWelcome]});

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

