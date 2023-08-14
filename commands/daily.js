// 사용자가 !daily를 하면 다음과 같이 작동
// 1. 먼저 사용자가 이미 시간을 등록했는지 확인하기 위해 쿼리 실행
// 2-a. 이미 있으면 "?시 ?분으로 알림이 설정된 상태입니다. 변경하시겠습니까 (버튼 메시지, 예/아니오)" 메시지 보내기
// 2-b. 없으면 바로 시간 입력 단계로 넘어가기
// 3. 사용자에게 입력 받기 "원하시는 시간을 24시간제로 다음과 같이 입력해주세요. (HH MM), 취소를 원하실 경우 X를 입력해주세요"
// 4. 형식이 잘못되면 오류 메시지 및 "다시 입력해주세요".
// 5. 쿼리 실행 후 등록

const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { getConnection } = require('../database/connect');

async function getUserCron(author, message, userCommandStatus){
    const conn = await getConnection();

    try{
        await conn.beginTransaction()

        const [rows] = await conn.execute('SELECT cron FROM user_cron WHERE discord_id = ?', [author.id])
        console.log(`returned rows: ${JSON.stringify(rows, null, 2)}`);

        if (rows.length > 0) {
            const buttonRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('yes')
                        .setLabel('예')
                        .setStyle('Success'),
                    new ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('아니오')
                        .setStyle('Danger')
                );

            message.reply({
                content: `${rows[0].cron}로 알림이 설정된 상태입니다. 변경하시겠습니까?`,
                components: [buttonRow]
            });
            conn.release();
        } else {
            conn.release();
            askForTime(message, userCommandStatus, conn);
        }
    }catch (error){
        await conn.rollback();
        console.log(error)
    }

}


function askForTime(message, userCommandStatus, conn) {
    message.reply("원하시는 시간을 24시간제로 다음과 같이 입력해주세요. (HH MM), 취소를 원하실 경우 X를 입력해주세요.");
    console.log("Asking For time")

    const botFilter = m => !m.author.bot && m.author.id === message.author.id && !m.content.startsWith('!');

    const idCollector = message.channel.createMessageCollector({filter: botFilter,max:1, time: 20000});

    idCollector.on('collect', async msg => {
        const cronMsg = msg.content;
        const isCronInserted = await insertUserCron(message.author.id, cronMsg, conn)

        console.log(`Collected Message by ${msg.author.username}: ${msg.content}, ${isCronInserted}`)
        if (isCronInserted){
            const [hour, min] = cronMsg.split(' ')
            message.reply(`성공적으로 등록되었습니다. 설정한 시간: ${hour}시 ${min}분`)
        }else{
            message.reply("오류가 발생했습니다.")
        }
        //백준 ID를 입력했으면 아이디 콜렉터 종료
        idCollector.stop();
    });

    idCollector.on('end', collected => {
        userCommandStatus[message.author.id] = false;

        //시간 초과되면 종료
        if (collected.size === 0) {
            message.reply("아직 입력해주시지 않아 시간이 만료되었어요.");
        }
    });

}

async function insertUserCron(discordId, userInput, conn) {
    const [hour, minute] = userInput.split(' ');

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        console.log("Invalid User Format")
        return false;
    }
    const userCron = `${minute} ${hour}`
    console.log(userCron)
    try{
        await conn.execute('INSERT INTO user_cron(discord_id, cron) VALUES(?, ?)', [discordId, userCron]);
        const [rows] = await conn.execute('SELECT cron FROM user_cron WHERE discord_id = ?', [discordId])
        console.log(`under returned rows: ${JSON.stringify(rows, null, 2)}`);
        return true;
    }catch (error){
        console.log(error)
        await conn.rollback();
        return false;
    }

}

module.exports = {
    name: 'daily',
    async execute(message, userCommandStatus, args) {
        const { author } = message;
        await getUserCron(author, message, userCommandStatus);

    }
};

