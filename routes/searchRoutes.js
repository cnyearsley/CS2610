var express = require('express')
var router = express.Router();
var data = require('../stippets.json');


router.get('/', function(req, res) {
    res.render('search', {
        layout: 'base'
    })
})

module.exports = router;
