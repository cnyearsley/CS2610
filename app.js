var express = require('express')
  , path = require('path')
  , exphbs = require('express-handlebars')
  //, profileData = require('./stippets.json')
  , port = 3000

var marketingRoutes = require('./routes/marketingRoutes')
  , profileRoutes = require('./routes/profileRoutes')
  , dashboardRoutes = require('./routes/dashboardRoutes')
  , searchRoutes = require('./routes/searchRoutes')

var config = require('./config')
var session = require('express-session')
var bodyParser = require('body-parser')
var querystring = require('querystring')
var request = require('request')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(session ({
    cookieName: 'session',
    secret: 'a;lsdgha;ldjflvhdjaivnojs',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:false}))

app.use('/', marketingRoutes);
app.use('/profile', profileRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/authorize', marketingRoutes);
app.use('/auth/finalize', marketingRoutes)
app.use('/search', searchRoutes)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);

console.log('Server running at http:127.0.0.1:' + port + '/');
