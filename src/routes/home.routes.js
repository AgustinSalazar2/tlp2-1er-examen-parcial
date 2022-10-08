const router = require('express').Router();

const {getHome} = require('../controllers/home.controllers');

router.get('/', getHome);

module.exports = router;