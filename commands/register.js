function registerId(discordId, bojId){
    console.log(`백준 아이디 = ${discordId} : ${bojId}`);
}


module.exports = {
    name: '아이디 등록',
    execute(message, userCommandStatus, args) {
        if (userCommandStatus[message.author.id]) {
            return;
        }

        userCommandStatus[message.author.id] = true;

        message.reply(`${message.author.toString()}님. 백준 ID를 입력해주세요!`)
        const botFilter = m => !m.author.bot && m.author.id === message.author.id && !m.content.startsWith('!');
        const idCollector = message.channel.createMessageCollector({filter: botFilter,max:1, time: 20000});

        idCollector.on('collect', async msg => {
            const bojId = msg.content;
            registerId(msg.author, bojId)

            console.log(msg.content)
            message.reply("백준 아이디가 등록되었어요!")
            idCollector.stop();
        });

        idCollector.on('end', collected => {
            userCommandStatus[message.author.id] = false;
            if (collected.size === 0) {
                message.reply("아직 입력해주시지 않아 시간이 만료되었어요.");
            }
        });
    },
};