const router = require('express').Router(); //El metodo Router() permite crear rutas
const validarJWT = require('../middlewares/validarJWT');

const {
    postUsers,
    getUsers,
    putUsers,
    deleteUsers
} = require('../controllers/user.controllers');


//Definiendo rutas:
router.post('/user',[validarJWT], postUsers);

router.get('/user',[validarJWT], getUsers);

router.put('/user/:id',[validarJWT], putUsers);

router.delete('/user/:id',[validarJWT], deleteUsers);

module.exports = router; //Se exporta el objeto router que contiene las rutas