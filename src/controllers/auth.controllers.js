const User = require('../models/User');
const generarJWT = require('../helpers/generarJWT');
const bcrypt = require('bcrypt');

const ctrlAuth = {};

ctrlAuth.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});    //Se busca si el usuario esta registrado

        if (!user) {
            return res.json({
                msg: 'Error de autenticación - Usuario no encontrado'
            });
        }

        if (!user.active) {
            return res.json({
                msg: 'Error de autenticación - Usuario inactivo'
            });
        }

        const validarPass = bcrypt.compareSync(password, user.password);    //Verificacion de la contraseña

        if (!validarPass) {
            return res.json({
                msg: 'Error de autenticación - Contraseña incorrecta'
            });
        }

        const token = await generarJWT({ uid: user._id });   //Se genera el token

        return res.json({token});

    } catch (error) {
        return res.json({ msg: 'Error de inicio de sesión' });
    }
}

module.exports = ctrlAuth;