var express = require('express')
var router = express.Router();
var data = require('../stippets.json');
var bodyParser = require('body-parser');
var request = require('request')
router.get('/', function(req, res) {
    res.render('search', {
        layout: 'base'
    })
})

router.post('/', function(req, res){
  var tagName = req.body.query

  var options = {
    url: 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + req.session.access_token
  }

  request.get(options, function(error, req, body){
    var feed = JSON.parse(body)
    // console.log(body);
    res.render('./dashboard', {
      feed: feed.data
    })
  })
})

module.exports = router;
