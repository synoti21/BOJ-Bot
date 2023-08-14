const { getConnection } = require('../database/connect')
const { getRandomProblem } = require('../commands/random')
const {EmbedBuilder} = require("discord.js");
async function sendRandomMessage(client) {

    const conn = await getConnection();

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = `${currentHour} ${currentMinute}`
    console.log('tic tok')
    console.log(currentTime);

    try{
        const [users] = await conn.execute('SELECT discord_id FROM user_cron WHERE cron = ?',[currentTime]);

        console.log(`cron rows: ${JSON.stringify(users, null, 2)}`);

        if (!users || users.length === 0) {
            console.log("no user")
            return;
        }

        for (let user of users) {
            console.log(user.discord_id)
            const randProblem = await getRandomProblem()
            const randProblemMsg = new EmbedBuilder()
                .setColor(0x3498DB)
                .setAuthor({name: 'BOJ Bot'})
                .setTitle("랜덤 문제 입니다.")
                .addFields(
                    { name: '문제 번호:', value: `${randProblem.problemId}`, inline: false },
                    { name: '문제:', value: `${randProblem.title}`, inline: false },
                    { name: '난이도:', value: `${randProblem.getLevel()}`, inline: false },
                    { name: '알고리즘 분류:', value: randProblem.tags.length > 0 ? `${randProblem.tags.join(', ')}` : '알고리즘 분류가 되어있지 않습니다.', inline: false },
                    { name: '링크', value: `https://www.acmicpc.net/problem/${randProblem.problemId}`,inline: false}
                )
                .setTimestamp()
            client.users.fetch(user.discord_id).then(user => {
                user.send({embeds: [randProblemMsg]});
            }).catch(error => {
                console.error(`메시지를 보낼 수 없습니다: ${error}`);
            });
        }
    }catch (error){
        console.log(error);
    }


}

module.exports = { sendRandomMessage }