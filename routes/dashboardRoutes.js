var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('dashboard', {
    layout: 'base'
  })
})

module.exports = router;
