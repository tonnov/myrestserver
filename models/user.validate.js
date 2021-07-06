const {request, response } = require('express');
const Joi = require('joi');
const Usuario = require('./user.model');


const correoCheck = Joi.string().email().required()
                    .external(async (value) => {
                        
                        const existeEmail = await Usuario.findOne({ correo: value });

                        if (existeEmail) {
                            throw new Error(`email ${value} already exists in DB`);
                        }

                    });

const idCheck = Joi.string().regex(/^[a-f\d]{24}$/i).required()
                .external(async (value) => {
                    
                    const usuario = await Usuario.findById( value );

                    if (!usuario) {
                        throw new Error(`usuario con id ${value} no existe en BD`);
                    }
                });

const usuarioNuevo = Joi.object({

    nombre: Joi.string().min(5).max(30).required(),

    password: Joi.string().min(6).required(),

    correo: Joi.string().email().required()
    .external(async (value) => {
        
        const existeEmail = await Usuario.findOne({ correo: value });

        if (existeEmail) {
            throw new Error(`email ${value} already exists in DB`);
        }
      }),

    estado: Joi.boolean(),

    google: Joi.boolean(),

    role: Joi.string().uppercase().valid('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE')
    
});
    // .with('username', 'birth_year')
    // .xor('password', 'access_token')
    // .with('password', 'repeat_password');

const usuarioUpdate = Joi.object({
    
    id: idCheck,
    
    nombre: Joi.string().min(5).max(30),

    password: Joi.string().min(6),
    
    role: Joi.string().uppercase().valid('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE')
});


module.exports = {
    usuarioNuevo, usuarioUpdate
}