const db = require("../database/database");

const login = async (request, h) => {
    const { username, password } = request.payload;
    const [users] = await db.query('select from users where username = ?', [username])
    const user = users[0];
}

module.exports = login;