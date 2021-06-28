
const {request, response } = require('express');
const Joi = require('joi');
const Usuario = require('../models/user.model');
Joi.objectId = require('joi-objectid')(Joi);

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

    role: Joi.string().valid('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE')
    
});
    // .with('username', 'birth_year')
    // .xor('password', 'access_token')
    // .with('password', 'repeat_password');

const usuarioUpdate = Joi.object({
    id: Joi.objectId().required()
    // id: Joi.string().regex(/^[a-f\d]{24}$/i).required()
})



const validaUsuario = async (req = require, res = response, next) => {
    // console.log(req, res);
    const body = req.body;
    const { id } = req.params;
    console.log(id);

    try {

        await usuarioUpdate.validateAsync({id});

        next();

    }
    catch (err) {
        // console.log(err);

        const { message } = err;

        return res.status(400).json({
            msg: "error",
            message
        })
     }

}


module.exports = { validaUsuario }