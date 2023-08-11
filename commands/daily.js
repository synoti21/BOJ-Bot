// 사용자가 !daily를 하면 다음과 같이 작동
// 1. 먼저 사용자가 이미 시간을 등록했는지 확인하기 위해 쿼리 실행
// 2-a. 이미 있으면 "?시 ?분으로 알림이 설정된 상태입니다. 변경하시겠습니까 (버튼 메시지, 예/아니오)" 메시지 보내기
// 2-b. 없으면 바로 시간 입력 단계로 넘어가기
// 3. 사용자에게 입력 받기 "원하시는 시간을 24시간제로 다음과 같이 입력해주세요. (HH MM), 취소를 원하실 경우 X를 입력해주세요"
// 4. 형식이 잘못되면 오류 메시지 및 "다시 입력해주세요".
// 5. 쿼리 실행 후 등록

const cron = require('node-cron');
const { MessageActionRow, MessageButton } = require('discord.js');
const { getConnection } = require('../database/connect');

module.exports = {
    name: 'daily',
    async execute(message, args) {
        const { author } = message;
        const conn = getConnection();

        conn.query('SELECT notification_time FROM user_notifications WHERE discord_id = ?', [author.id], async (error, results) => {
            if (error) {
                console.error(error);
                message.reply("오류가 발생했습니다.");
                return;
            }

            if (results.length > 0) {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('yes')
                            .setLabel('예')
                            .setStyle('SUCCESS'),
                        new MessageButton()
                            .setCustomId('no')
                            .setLabel('아니오')
                            .setStyle('DANGER')
                    );

                message.reply({
                    content: `${results[0].notification_time}로 알림이 설정된 상태입니다. 변경하시겠습니까?`,
                    components: [row]
                });
            } else {
                askForTime(message);
            }
        });
    }
};

function askForTime(message) {
    message.reply("원하시는 시간을 24시간제로 다음과 같이 입력해주세요. (HH MM), 취소를 원하실 경우 X를 입력해주세요.");
    console.log("시간 묻기")
}

function scheduleNotification(time, userId) {
    cron.schedule(`${time.minutes} ${time.hours} * * *`, () => {
    console.log("알림 보내기")
    });
}
