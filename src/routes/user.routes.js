const router = require('express').Router(); //El metodo Router() permite crear rutas
const validarJWT = require('../middlewares/validarJWT');
const isAdmin = require('../middlewares/isAdmin');

const {
    postUsers,
    getUsers,
    putUsers,
    deleteUsers
} = require('../controllers/user.controllers');

//Definiendo rutas:

//Antes de crear nuevos usuarios es necesario tener un usuario con el rol de "admin" ya que es el unico autorizado a crearlos
//1ro quitar los middlewares y crear un usuario con el rol "admin"
router.post('/user',[validarJWT, isAdmin], postUsers);

//Ruta para obtener los usuarios registrados
router.get('/user',[validarJWT, isAdmin], getUsers);

//Ruta para actualizar usuarios
router.put('/user/:id',[validarJWT], putUsers);

//Ruta para eliminar usuarios
router.delete('/user/:id',[validarJWT], deleteUsers);

module.exports = router; //Se exporta el objeto router que contiene las rutas