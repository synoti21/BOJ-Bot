const { getConnection } = require('../database/connect')
const { getRandomProblem } = require('../commands/random')
const {EmbedBuilder} = require("discord.js");
async function sendRandomMessage(client) {

    const conn = await getConnection();
    await conn.beginTransaction()

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
            const randProblemMsg = randProblem.getEmbedMsg("일일 문제입니다.")
            console.log(user.discord_id)

            const targetUser = await client.users.fetch(user.discord_id)
            targetUser.send({embeds: [randProblemMsg]})
            console.log(targetUser)
            conn.release();
        }
    }catch (error){
        console.log(error);
    }
}

module.exports = { sendRandomMessage }