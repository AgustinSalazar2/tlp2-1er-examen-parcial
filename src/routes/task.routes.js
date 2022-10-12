const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const {
    getTasks,
    postTasks,
    putTasks
} = require('../controllers/tasks.controllers');

router.get('/task', [validarJWT], getTasks);

router.post('/task', [validarJWT], postTasks);

router.put('/task/:id', [validarJWT], putTasks);

module.exports = router;