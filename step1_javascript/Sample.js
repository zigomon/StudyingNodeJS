const http = require('http');
const port = 8124

http.createServer((request, response) => 
{
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('Hello World!');
}).listen(port);

console.log('Server is runnning at http://localhost:${port}/');

