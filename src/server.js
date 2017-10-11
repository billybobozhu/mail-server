import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

var doctor = require('./doctor.api');
var mail = require('./mail.api');
var nodemailer = require('nodemailer');

class Server {
    constructor() {
        this.app = express();
    }

    configureApp() {
        this.app.set('port', (process.env.PORT || 3000));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    configureCORS() {
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest userDetails.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes() {

        this.app.post('/send', mail.post);
        this.app.get('/api/doctorGet', doctor.get);
        this.app.post('/api/doctorPost', doctor.post);
        this.app.put('/api/doctorEdit/:id', doctor.put);
        this.app.delete('/api/doctorDelete/:id', doctor.delete);
        
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run() {
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Server;