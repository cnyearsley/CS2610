var express = require('express');
var router = express.Router();
var request = require('request')
var Users = require('../models/users')

router.get('/', function(req, res, next){

  Users.find(req.session.userId, function(document){
    var options = {
      url:"https://api.instagram.com/v1/users/self/?access_token="
        + req.session.access_token
    }
    request.get(options, function(error, response, body){
      try{
        var instagramUser = JSON.parse(body)
        if(instagramUser.meta.code>200){
          return next(instagramUser.meta.error_message)
        }
        if(!document){
          res.redirect('/')
        } else {
          // console.log(instagramUser)
          res.render('profile',{
            layout:'base'
            , user: document
            , avatar_url: instagramUser.data.profile_picture
          })
        }
      }
      catch(err){
        return next(err)
      }
    })
  })
})

router.use(function(err, req, res, next){
  res.redirect('./')
})

router.post('/', function(req, res){
  var user = req.body
  Users.update(user, function() {
    res.redirect('/profile')
  })
})

module.exports = router;
