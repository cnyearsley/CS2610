var express = require('express')
  , path = require('path')
  , exphbs = require('express-handlebars')
  //, profileData = require('./stippets.json')
  , port = 3000
  , marketingRoutes = require('./routes/marketingRoutes')
  , profileRoutes = require('./routes/profileRoutes')
  , dashboardRoutes = require('./routes/dashboardRoutes')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use('/', marketingRoutes);
app.use('/profile', profileRoutes);
app.use('/dashboard', dashboardRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);

console.log('Server running at http:127.0.0.1:' + port + '/');
