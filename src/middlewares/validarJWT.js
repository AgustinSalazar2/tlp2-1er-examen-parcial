const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Middleware para validar token
const validarJWT = async (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {   //Se verifica si existe el token
        return res.json({
            msg: 'Error de autenticacion  -  Token no valido, no hay token'
        })
    }

    try {
        const { uid } = await jwt.verify(token, process.env.SECRET)
        const user = await User.findById(uid)
        
        if (!user) {     // Se busca el usuario en la base de datos para saber si pertenece al sistema
            return res.json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }
       
        if (!user.active) {     // Verificar si el usuario está activo
            return res.json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        // Se añade la información del usuario al request para que pueda ser utilizada en el resto de middlwares
        req.user = user;

        next();      // Se continúa con la ejecución del resto de la petición
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT;