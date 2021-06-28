
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

const validarJWT = async (req = request, res = response, next ) => {
    
    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }
    
    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        // console.log(uid);
        
        const userAuth = await Usuario.findById( uid );

        req.userAuth = userAuth;

        if (!userAuth) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        if (!userAuth.estado) {
            return res.status(401).json({
                msg: 'Token no valido - No activo'
            })
        }
        

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg: 'Token no valido --'
        })
        
    }

}

module.exports = { validarJWT }