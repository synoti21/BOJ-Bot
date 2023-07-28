const guideMessage = require('../bot/guideMessage')

module.exports = {
    name: 'Daily Notification',
    execute(message, args) {
        message.channel.send({embeds: [guideMessage]})
    },
};