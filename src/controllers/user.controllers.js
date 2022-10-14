const User = require('../models/User');
const bcrypt = require('bcrypt');

const ctrlUser = {};

ctrlUser.getUsers = async (req, res) => {
    try {
        const users = await User.find({active: true});
        return res.json(users);
    } catch (error) {
        return res.json({
            msg: 'Error al obtener usuarios'
        });
    }
};

ctrlUser.postUsers = async (req, res) => {
    const { username, password:pass, email, rol } = req.body; //Se obtienen los datos enviados por POST

    try {
        //Encriptar la contraseña
        const newPassword = bcrypt.hashSync(pass, 10);

        const newUser = new User({   //Se instancia un nuevo documento de mongodb
            username,
            password: newPassword,
            email,
            rol
        });
    
        const user = await newUser.save(); //Se almacena en la base de datos con el metodo save()
    
        return res.json({
            msg: 'Usuario creado correctamente',
            user
        });
    } catch (error) {
        return res.json({
            msg: 'Erro al crear un usuario'
        });
    }
};

ctrlUser.putUsers = async (req, res) => {
    const userId = req.params.id;
    const { username, email, active, rol, ...otros } = req.body;
    try {
        const userUpdate = await User.findByIdAndUpdate(userId, { username, email, active, rol, ...otros });
        return res.json({
            msg: 'Usuario actualizado correctamente',
            userUpdate
        });
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error al actualizar el usuario'
        });
    }
};

ctrlUser.deleteUsers = async (req, res)=>{ 
    const userId = req.params.id;
    try {
        await User.findByIdAndUpdate(userId, {active: false})
        return res.json({
            msg: 'Usuario eliminado correctamente'
        });        
    } catch (error) {
        console.log(error)
        return res.json({
            msg: 'Error al eliminar el usuario'
        });
    }
};

module.exports = ctrlUser;