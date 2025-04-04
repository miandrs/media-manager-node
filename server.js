const http = require('http');

const app = require('./src/app');
const { throws } = require('assert');

//Send a valid port
const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port))  {
        return val;
    }

    if(port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

//Find all errors and handle these erros then save in server
const errorHandler = error => {
    if(error.syscal !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port:' + port;
    
    switch(error.code) {
        case 'EACCES': console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE': console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default: throw error; 
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);

//Event listener
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);