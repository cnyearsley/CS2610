var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request')
router.get('/', function(req, res) {
    res.render('search', {
        layout: 'base'
    })
})

router.post('/', function(req, res, next){
  var tagName = req.body.query

  var options = {
    url: 'https://api.instagram.com/v1/tags/' + tagName +
      '/media/recent?access_token=' + req.session.access_token
  }

  request.get(options, function(error, req, body){
    try {
      var feed = JSON.parse(body)
      if (feed.meta.code > 200) {
        console.log(feed.meta.error_message);
        return next(feed.meta.error_message);
      }
    }
    catch(err) {
        return next(err)
    }
    //  console.log(body);
    res.render('./dashboard', {
      feed: feed.data
    })
  })
})

router.use(function(err, req, res, next){
  res.render('./', {
    layout: 'auth_base'
  })
})

module.exports = router;
