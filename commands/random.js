const {EmbedBuilder} = require('discord.js')
const axios = require('axios')
const {bojProblem} = require("../models/problem");

async function getRandomProblem(attempts = 0) {
    if (attempts >= 5) {
        return new bojProblem(-1, "알 수 없는 오류가 발생했습니다.", 0, [])
    }
    //TODO 현재는 숫자로 범위를 지정해줬는데, 나중에 백준 사이트를 통해 직접 문제 수를 받아야 함.
    const randomId = Math.floor(Math.random() * (28415 - 1000)) + 1000;
    try {
        const response = await axios.get('https://solved.ac/api/v3/problem/show', {
            params: {
                problemId: randomId,
            },
        });
        return new bojProblem(response.data.problemId, response.data.titleKo, response.data.level, response.data.tags);

    } catch (error) {
        //가끔 번호가 배정이 안된 경우가 있음
        console.error(error.response.data);
        console.error("Retrying...")
        //최대 5번 시도
        return await getRandomProblem(attempts + 1);
    }
}


module.exports = {
    name: '문제 랜덤 추천',
    async execute(message, userCommandStatus, args) {
        const randProblem = await getRandomProblem();
        console.log(randProblem.problemId)
        console.log(randProblem.title)
        console.log(randProblem.getLevel())
        console.log(randProblem.tags)

        const randProblemMsg = randProblem.getEmbedMsg("랜덤 문제입니다.")

        message.channel.send({embeds: [randProblemMsg]})
    }, getRandomProblem
};