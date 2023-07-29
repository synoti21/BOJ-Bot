const {EmbedBuilder} = require('discord.js')
const axios = require('axios')
const {bojProblem} = require("../models/problem");

async function getRandomProblem() {
    const randomId = Math.floor(Math.random() * (28400 - 1000)) + 1000;
    const response = await axios.get('https://solved.ac/api/v3/problem/show', {
        params: {
            problemId: randomId,
        },
    });
    if (response.data.problemId && response.data.titleKo) {
        return new bojProblem(response.data.problemId, response.data.titleKo, response.data.level, response.data.tags);
    }

    return getRandomProblem();
}

module.exports = {
    name: '문제 랜덤 추천',
    async execute(message, args) {
        const randProblem = await getRandomProblem();
        console.log(randProblem.problemId)
        console.log(randProblem.title)
        console.log(randProblem.getLevel())
        console.log(randProblem.tags)
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
        message.channel.send({embeds: [randProblemMsg]})
    }
};