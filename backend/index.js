const http = require('http');
const dotenv = require('dotenv');
dotenv.config({path: '.env'})
const anotherPort = process.env.PORT;
const server = http.createServer((req, res) => {
    res.end('TEST');
})

server.listen(anotherPort || 3000);