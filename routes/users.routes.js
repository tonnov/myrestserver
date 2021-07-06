
const { Router } = require('express');
// const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users.controller');
// const { validarCampos } = require('../middlewares/validar-user');
// const { esRoleValido, emailExiste, existeUserId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarNuevo, validarActualizacion } = require('../middlewares/validar-usuario');
const { validaUser } = require('../middlewares/express-schema');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', validarActualizacion, usuariosPut );

router.post('/', [validaUser], usuariosPost );

router.delete('/:id', [ validarJWT ], usuariosDelete )

router.patch('/', usuariosPatch)




module.exports = router;