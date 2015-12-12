var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request')
var db = require('../db')
var Saved_searches = require('../models/saved_searches')

var user_data = {} || user_data;

router.get('/', function(req, res) {
    var options = {
    url:"https://api.instagram.com/v1/users/self/?access_token="
      + req.session.access_token
  }
  // var searches;
  request.get(options, function(error, response, body){
        try{
          var user = JSON.parse(body)
          console.log("User logged in: ", user.data.username);
          user_data.username = user.data.username;
          if(user.meta.code>200){
            console.log("error durp: ", user.meta.error_message)
            return next(user.meta.error_message)
          }

          var searches = '';

          Saved_searches.findAll(user_data.username, function(searches) {
              console.log("Result before render:\n", searches)
              res.render('search', {
                  layout: 'base',
                  savedSearch: searches
              })
          });

        }
        catch(err){
          return next(err)
        }
    })
})

function getSavedSearches(callback) {
    Saved_searches.findAll(user_data.username, function(result) {
        callback(result);
    });
}


router.post('/', function(req, res, next){
  var tagName = req.body.query
  var saveSearch = req.body.saveSearch

  console.log("The req.body: ", req.body)

  if(typeof saveSearch == 'undefined') {
      saveSearch = false;
  } else {
      saveSearch = true;
  }

  if (req.body.deleteSave != '') {
    console.log("you are deleting: ", req.body.deleteSave)
    // function deleteSavedSearch(callback) {
      Saved_searches.remove(req.body.deleteSave, function(result) {
        callback(result);
      });
    // }
  }

  if(saveSearch) {
      console.log("Inserting stuffs...")
      Saved_searches.insert(user_data.username, tagName, function() {
          console.log("It wurked! username/search: ", user_data.username, "/", tagName);
      })
  }

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
