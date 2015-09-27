var http = require('http');

function getTime(timeArg) {
    var d  = new Date();
    var dateValue;
    if (timeArg === "month"){
        dateValue = d.getMonth() + 1;
    } else {
        dateValue = d;
    }
    return dateValue.toString();
}

function processRequest (req, res) {
    console.log('Got request for ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var reqs = req.url.split("=");

    if (reqs[0] === '/?time') {
        var timeArg="";
        if (reqs.length > 1) {
            timeArg = reqs[1];
        }
        res.end(getTime(timeArg));
    } else {
        res.end();
    }
}

http.createServer(processRequest).listen(process.env.PORT || 8080);