var http = require('http');
var Twitter = require('twitter');
var config = require('./config.js');

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

function tweetThis(tweet) {
    var client = new Twitter(config.twittercreds);

    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (error) { throw error; }
        console.log(tweet);  // Tweet body. 
        console.log(response);  // Raw response object. 
    });
    
    return "tweeted!";
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
    } 
    else if (reqs[0] === "/?tweet") {
        if (reqs.length > 1) {
            res.end(tweetThis(reqs[1]));
        }
        res.end();
    }
    else if (reqs[0] === "/?env") {
            res.end(JSON.stringify(process.env,null,4));            
    } else {
        res.end();
    }
}



http.createServer(processRequest).listen(process.env.PORT || 8080);