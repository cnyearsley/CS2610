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

var db = require('./db')
var Saved_searches = require('./models/saved_searches')
var Users = require('./models/users')

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

request.post(options, function(error, response, body){
  var data = JSON.parse(body)
  var user = data.user

  req.session.access_token = data.access_token
  req.session.userID = data.user.id

  user._id = user.id
  delete user.id

  Users.find(user._id, function(document){
    if(!document){
      Users.insert(user, function(result) {
        res.redirect('/dashboard')
      })
    } else {
      res.redirect('/dashboard')
    }
  })
})

db.connect('mongodb://user:password@ds027825.mongolab.com:27825/instagram_project', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Database connection established...')
      console.log('Listening on port 3000...')
    })
  }
})
