var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback){
  var collection = db.get().collection('user')

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

  collection.findOne({'_id' : id}, function(err, document){
    assert.equal(err, null)
    console.log("Found a user")
    callback(document)
  })
}

exports.update = function(user, callback) {
  var collection = db.get().collection('user')
  collection.update({'_id': user._id}, {$set: user}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Updated 1 document in the users collection')
    callback()
  })
}
