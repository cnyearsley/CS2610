var assert = require('assert')
var db = require('../db')

//get the collection of users
exports.insert = function(user, callback){
  //create the collection variable
  var collection = db.get().collection('user')

  //insert a new user
  collection.insert(user, function(err, result){
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted a user to the database')
    callback(result)
  })
}

exports.find = function(id, callback) {
  var collection = db.get().collection('user')

  //search for the user
  collection.findOne({'_id' : id}, function(err, document){
    assert.equal(err, null)
    console.log("Found a user")
    callback(document)
  })
}
