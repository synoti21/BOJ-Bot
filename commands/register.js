const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB,
    port: 5432
});

pool.on('error', (err, client) => {
    console.error('예기치 못한 에러가 발생했습니다.', err);
});

async function registerId(discordId, bojId){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const { rows } = await client.query('SELECT boj_id FROM discord.registereduser WHERE discord_id = $1', [discordId]);

        if (rows.length > 0) {
            return "이미 백준 아이디를 등록하셨습니다."
        }

        await client.query('INSERT INTO discord.registereduser(discord_id, boj_id) VALUES($1, $2)', [discordId, bojId]);
        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
        return "오류가 발생했습니다."
    } finally {
        client.release();
    }
    return "백준 아이디가 등록되었습니다.";

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
            const queryMessage = await registerId(msg.author.id, bojId)

            console.log(msg.content)
            message.reply(queryMessage)
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