
const { Router } = require('express');
// const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
// const { validarCampos } = require('../middlewares/validar-user')


const router = Router();

router.post('/login', [], login )



module.exports = router;