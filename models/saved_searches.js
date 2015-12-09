var assert = require('assert')
var db = require('../db')

exports.insert = function(search, callback) {
  // Get the users collection
  var collection = db.get().collection('saved_searches')
  // Insert a user
  collection.insert(search, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the saved_searches collection')
    callback(result)
  })
}
