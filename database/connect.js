const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: 'boj_bot_db',
    port: 3306
});

const getConnection = async () => { //Pool 커넥션 불러오기
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error(`connection error : ${error.message}`);
        return null;
    }
}

module.exports = { getConnection }