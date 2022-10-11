const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const {
    getTasks,
    postTasks
} = require('../controllers/tasks.controllers');

router.get('/task', [validarJWT], getTasks);

router.post('/task', [validarJWT], postTasks);

module.exports = router;