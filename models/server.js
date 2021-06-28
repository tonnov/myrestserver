
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/database');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/users';
        this.authPath = '/api/auth';
        // this.authGoogle = '/auth/google';

        // Conectar a base de datos
        this.database();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async database(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use(express.static('public'));
    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuariosRoute, require('../routes/users.routes'));
        // this.app.use(this.authGoogle, require('../routes/google.auth.routes'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server listening at ${this.port} port`);
        })
    }

}

module.exports = Server;