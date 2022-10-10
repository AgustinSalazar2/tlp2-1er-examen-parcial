const router = require('express').Router(); //El metodo Router() permite crear rutas

const {
    postUsers,
    getUsers,
    putUsers,
    deleteUsers
} = require('../controllers/user.controllers');

//Definiendo rutas:
router.post('/user', postUsers);

router.get('/user', getUsers);

router.put('/user/:id', putUsers);

router.delete('/user/:id', deleteUsers);

module.exports = router; //Se exporta el objeto router que contiene las rutas