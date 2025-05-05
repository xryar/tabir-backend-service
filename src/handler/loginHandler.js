const db = require("../database/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (request, h) => {
    const { username, password } = request.payload;
    const [users] = await db.query('select * from users where username = ?', [username])
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password)

    if (!user) {
        const response = h.response({
            status: 'fail',
            message: 'User tidak ditemukan'
        });
        response.code(401);
        return response;
    }

    if (!valid) {
        const response = h.response({
            status: 'fail',
            message: 'Password Salah'
        });
        response.code(401);
        return response;
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    return h.response({
        status: 'success',
        message: 'Login Success',
        token: token
    }).code(200);
}

module.exports = login;