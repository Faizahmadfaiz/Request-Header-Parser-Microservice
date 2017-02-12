var express = require('express'),
    parser  = require('ua-parser-js'),
    app     = express();

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.enable('trust proxy');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/api/whoami', function(req, res) {
    var ipaddress = req.ip;
    if(ipaddress.substr(0, 7) === "::ffff:") {
        ipaddress = ipaddress.substr(7);
    }
    var ua = parser(req.headers['user-agent']);
    var language = req.headers['accept-language'].slice(0, req.headers['accept-language'].indexOf(','));
    var software = ua.os.name + ',' + ua.os.version;
    res.send({
        ipaddress: ipaddress,
        language: language,
        software: software
    });
});

app.listen(app.get('port'), function() {
    console.log('App is running on port ', app.get('port'));
});