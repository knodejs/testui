var express = require('express');
var app = express();

var portServer = process.env.PORT || 9099;

app.use(express.static('public'));

//app.get('/', function(req, res) {
    //res.send('Hello World!');
//});

var server = app.listen(portServer, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://localhost:%s', port);
});
