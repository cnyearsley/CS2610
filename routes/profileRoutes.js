var express = require('express');
var router = express.Router();
var data = require('../stippets.json');

router.get('/stippets', function(req, res) {
  res.render('profile', {
    layout: 'base'
    , name: data.name
    , username: data.login
    , emailAddress: data.email
    , bio: data.bio
  })
})

module.exports = router;
