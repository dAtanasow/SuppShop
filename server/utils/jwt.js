const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'SoftSecret';

function createToken(data) {
    console.log("Creating token with data:", data);
    return jwt.sign({ _id: data._id }, secret, { expiresIn: '1d' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}