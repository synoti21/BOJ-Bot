module.exports = {
    name: 'Daily Notification',
    execute(message, args) {
        message.channel.send("일일 문제 알림")
    },
};