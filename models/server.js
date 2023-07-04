const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.server = require('http').createServer( this.app );

        this.io = require('socket.io')(this.server, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET','POST']
            }
        });


        this.port = process.env.PORT;
        //this.io es toda la informacion de mis sockets conectados, con io puedo enviar un mensaje a todos los que esten conectados en mi backend
    
        
        this.paths = {
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // sockets events
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        // this.app.use( this.paths.usuarios, require('../routes/usuarios'));      
    }

    sockets(){
        // this.io.on('connection', socketController)
        this.io.on('connection', (socket) => {
            console.log('connected from backend', socket.id)
            socket.on('disconnect', () => {
                console.log('disconnect',  socket.id)
            })

            socket.on('send-to-backend' ,(payload) => {
                console.log('send message in backend');


                this.io.emit('send-message', payload)
            }) 

            
        })
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;