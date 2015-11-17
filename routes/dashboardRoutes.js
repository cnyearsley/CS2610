var express = require('express');
var router = express.Router();
var request = require('request')

router.get('/', function(req, res, next) {
  var options = {
      url:'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token
  }

  request.get(options, function(error, response, body) {
      try {
          var feed = JSON.parse(body)
          if(feed.meta.code > 200) {
             return next(feed.meta.error_message)
          }
      }
      catch(err){
          return next(err)
      }
      res.render('dashboard', {
        layout: 'base',
        feed: feed.data
      })
  })
})

//error handling "next" functions goes here, we think. Redirect user to login screen when access_token is invalid.


module.exports = router;
