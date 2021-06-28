
const { Router } = require('express');
// const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users.controller');
// const { validarCampos } = require('../middlewares/validar-user');
// const { esRoleValido, emailExiste, existeUserId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validaUsuario, validaUser } = require('../middlewares/validar-usuario');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', validaUsuario, usuariosPut );

router.post('/', validaUsuario, usuariosPost );

router.delete('/:id', [ validarJWT ], usuariosDelete )

router.patch('/', usuariosPatch)




module.exports = router;