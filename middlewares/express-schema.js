

const { checkSchema, validationResult } = require('express-validator');
const Usuario = require('../models/user.model');

const nuevoUsuarioX = checkSchema({

    nombre: {
        exists: {
            errorMessage: "El nombre es obligatorio",
            bail: true,
        },
        notEmpty: {
            errorMessage: 'Nombre no puede ser vacio',
            bail: true
        },
        trim: true
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El password debe ser mínimo de 6 caracteres'
        }
    },
    correo: {
        isEmail: {
            errorMessage: 'No es un correo valido',
            bail: true
        },
        normalizeEmail: true,
        custom: {
            options: value => {
                return Usuario.findOne({ correo: value })
                .then(user => {
                    if (user) {
                        return Promise.reject(`La direccion ${value} ya existe en la BD`)
                    }
                })
            }
        }
    },

});

const validaUser = async (req, res, next)  => {
    
    await nuevoUsuarioX.run(req);
    // await checkSchema(nuevoUsuarioX);

    const result = validationResult(req);
    // console.log(result);

    if (!result.isEmpty()) {
        return res.status(422).json({
            errors: result.array()
        })
    }

    next();


}

module.exports = { validaUser }