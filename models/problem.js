class bojProblem{
    constructor(problemId, title, level, tags) {
        this.problemId = problemId
        this.title = title
        this.level = level
        this.tags = tags.map(tag => tag.key)
    }
    getLevel(){
        let probLevel = this.level
        console.log(`난이도 : ${probLevel}`)
        if (1 <= probLevel && probLevel <= 5){
            return `브론즈 ${6-probLevel}`
        }else if (6 <= probLevel && probLevel <= 10){
            return `실버 ${11-probLevel}`
        }else if (11 <= probLevel && probLevel <= 15){
            return `골드 ${16-probLevel}`
        }else if (16 <= probLevel && probLevel <= 20){
            return `플레티넘 ${21-probLevel}`
        }else if (21 <= probLevel && probLevel<= 25){
            return `다이아 ${26-probLevel}`
        }else if (26 <= probLevel && probLevel <= 30){
            return `루비 ${31-probLevel}`
        }else{
            return `레벨 책정 안됨`
        }
    }
}

module.exports = {bojProblem}