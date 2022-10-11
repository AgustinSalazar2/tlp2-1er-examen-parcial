const jwt = require('jsonwebtoken');

//Funcion para generar el token de autenticacion con el id del usuario y la palabra secreta:
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign(uid, process.env.SECRET, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = generarJWT;