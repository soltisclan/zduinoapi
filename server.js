var http = require('http');

http.createServer(processRequest).listen(process.env.PORT);

function processRequest (req, res) {
    console.log('Got request for ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello Code and Azure Web Apps!</h1>');
}