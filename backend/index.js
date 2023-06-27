const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: '.env'})
app.set('port', process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);