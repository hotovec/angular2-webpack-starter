var express = require('express');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 3001;

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('Im dev-api server');
});

app.get('/api/*', function (req, res) {

    console.log(__dirname);

    var commandUrl = '/api' + req.url.substr(4, req.url.length) + '.json';

    fs.readFile(__dirname + commandUrl,"utf8", function (err, data) {
        if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
        console.log('api call: ' + commandUrl);
    });

});


app.listen(port);

console.log("Dev API server listen: http://localhost:" + port);
console.log("API folder: " + __dirname);
