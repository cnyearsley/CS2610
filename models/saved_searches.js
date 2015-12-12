var assert = require('assert')
var db = require('../db')

exports.insert = function(user, search, callback) {
  // Get the users collection
  var collection = db.get().collection('saved_searches')
  // Insert a user
  collection.insert({"user": user, "search": search}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the saved_searches collection')
    callback(result)
  })
}

exports.remove = function(quote, callback) {
  console.log("inside the remove function")
  var collection = db.get().collection('saved_searches')

  try{
      // collection.remove({user: username}, {'search': true, '_id': false}).toArray(function(err, result) {
      //     console.log("removed: ", username);
      //     callback(result);
      collection.remove({search: quote})
      // });
  } catch (err) {
      console.log(err)
  }
}

exports.findAll = function(username, callback) {
    var collection = db.get().collection('saved_searches')

    try{
        collection.find({user: username}, {'search': true, '_id': false}).toArray(function(err, result) {
            callback(result);
        });
    } catch (err) {
        console.log(err)
    }
}
