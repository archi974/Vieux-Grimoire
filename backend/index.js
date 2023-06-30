const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: '.env'})
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT);