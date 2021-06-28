
const { response } = require("express");
const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt')


const login = async (req, res = response ) => {
    
    const { correo, password } = req.body;

    try {

        const usuario =  await Usuario.findOne({ correo });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Credenciales no validas'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Credenciales no validas - estado'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuario.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Credenciales no validas - passvoid'
            });
        }

        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    


}


module.exports = {
    login
}