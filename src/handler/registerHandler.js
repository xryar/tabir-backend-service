const bcrypt = require('bcrypt');
const db = require('../database/database');

const register = async (request, h) => {
    const { name, username, password } = request.payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query(`INSERT INTO users (name, username, password) VALUES(?, ?, ?)`, [name, username, hashedPassword]);
        const response = h.response({
            status: 'success',
            message: 'Registrasi Berhasil'
        });
        response.code(201);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Username sudah Pernah digunakan'
        });
        response.code(400);
        return response;
    }
}

module.exports = register;