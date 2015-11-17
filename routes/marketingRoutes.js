var express = require('express');
var exphbs = require('express-handlebars')
var cfg = require('../config');
var querystring = require('querystring')
var request = require('request')
var session = require('express-session')
var router = express.Router();



router.get('/', function(req, res) {
  res.render('index', {
    layout: 'auth_base',
  })
})

router.get('/authorize', function(req, res){
    var qs ={
        client_id: cfg.client_id,
        redirect_uri: cfg.redirect_uri,
        response_type: 'code'
    }
    var query = querystring.stringify(qs)

    var url='https://api.instagram.com/oauth/authorize/?' + query

    res.redirect(url)
})

router.get('/auth/finalize', function(req,res,next){
    if(req.query.error=='access_denied'){
        return res.redirect('/')
    }

    var post_data = {
        client_id: cfg.client_id,
        client_secret: cfg.client_secret,
        redirect_uri: cfg.redirect_uri,
        grant_type: 'authorization_code',
        code: req.query.code
    }

    var options = {
        url: 'https://api.instagram.com/oauth/access_token',
        form: post_data
    }

    request.post(options, function(error, response, body) {
        try{
            var data = JSON.parse(body)
        }
        catch(err) {
            return next(err)
        }
        req.session.access_token = data.access_token
        res.redirect('/dashboard')
    })
})

module.exports = router;
