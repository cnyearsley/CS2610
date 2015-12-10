var express = require('express');
var router = express.Router();
// var data = require('../stippets.json');
var request = require('request')

router.get('/', function(req, res, next){
  var options = {
    url:"https://api.instagram.com/v1/users/self/?access_token="
      + req.session.access_token
  }
  request.get(options, function(error, response, body){
    try{
      var user = JSON.parse(body)
      console.log(user.data.profile_picture);
      if(user.meta.code>200){
        console.log(user.meta.error_message)
        return next(user.meta.error_message)
      }
    }
    catch(err){
      return next(err)
    }
    res.render('profile',{
      layout:'base'
      , name: user.data.full_name
      , username: user.data.username
      , website: user.data.website
      , bio: user.data.bio
      , avatar_url: user.data.profile_picture
    })
  })
})

router.use(function(err, req, res, next){
  res.redirect('./')
})
//
// router.get('/stippets', function(req, res) {
//   res.render('profile', {
//     layout: 'base'
//     , name: data.name
//     , username: data.login
//     , website: data.url
//     , bio: data.bio
//     , avatar_url: data.avatar_url
//   })
// })

module.exports = router;
