const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');

const app = express();

//body parser for post or put methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//define views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//static files
//app.use(express.static(path.join(__dirname + 'public')));

app.use('/static', express.static(path.join(__dirname, 'public')));

//mongoose connection
mongoose.connect(keys.mongoURI);

//models
require('./models/User');

//services
require('./services/passport');

//auth
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//router config
require('./router')(app);

const PORT = process.env.PORT || 2000;
app.listen(PORT);