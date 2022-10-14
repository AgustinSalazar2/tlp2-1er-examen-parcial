const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const {
    getTasks,
    postTasks,
    putTasks,
    deleteTask,
    finishTasks
} = require('../controllers/tasks.controllers');

router.get('/task', [validarJWT], getTasks);

router.post('/task', [validarJWT], postTasks);

router.put('/task/:id', [validarJWT], putTasks);

router.delete('/task/:id', [validarJWT], deleteTask);

router.put('/task/done/:id', [validarJWT], finishTasks);


module.exports = router;