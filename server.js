require('dotenv').load();

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    testdb = require('./config/testdb'),
    route = require('./server/routes');

var port = process.env.PORT || 3333;

testdb.dbconnect();

var app = express();

// Force HTTPS on heroku
if(process.env.NODE_ENV === 'production'){
    app.enable('trust proxy');
    app.use(function(req, res, next) {
        if (req.secure) {
            next();
        } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public'));

route(app);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html' );
});

app.listen(port, function() {
    console.log("Server Listening on port:: ", port );
});
