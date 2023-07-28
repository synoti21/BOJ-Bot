const axios = require('axios');
async function getRandomProblemURL() {
    const response = await axios.get('https://www.acmicpc.net/problem/random', {
        maxRedirects: 0,  // Redirects를 따르지 않도록 설정
        validateStatus: function (status) {
            return status >= 200 && status < 303;  // Redirects를 위한 상태 코드를 유효하게 처리
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537'
        }
    });

    return response.headers.location;  // 리다이렉트된 URL을 반환
}

module.exports = {
    name: 'Random Recommandation',
    async execute(message, args) {
        const problemURL = await getRandomProblemURL();
        message.channel.send(`Here is a random problem: ${problemURL}`);
    },
};