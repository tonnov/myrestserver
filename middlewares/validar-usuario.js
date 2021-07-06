

const { usuarioNuevo, usuarioUpdate } = require('../models/user.validate');

const validarNuevo = async (req, res, next) => {

    const {nombre, password, correo, role } = req.body;
    
    try {

        await usuarioNuevo.validateAsync({nombre, password, correo, role});

        next();

    }
    catch (err) {

        const { message } = err;

        return res.status(422).json({
            msg: "error",
            message
        })
        }
    
};

const validarActualizacion = async (req, res, next) => {

    const { id } = req.params;
    const { nombre, password, role } = req.body;
    const data = { id, nombre, password, role };
    // console.log(data);
    // console.log(req.route);

    try {

        await usuarioUpdate.validateAsync(data);

        next();

    }
    catch (err) {

        const { message } = err;

        return res.status(422).json({
            msg: "error",
            message
        })
    }
    
};


module.exports = { validarNuevo, validarActualizacion }