var test = require('ava')
var shapeshift = require('../')

test = test.cb

test('> when setting cors to false, should set the shapeshift url to the endpoint that does not use cors', function (t) {
  t.plan(2)

  var _url
  shapeshift.cors = false

  var oldGet = shapeshift.http.get
  shapeshift.http.get = function (url, callback) {
    _url = url
    // don't actually make http request
    callback(null, {})
  }

  shapeshift.coins(function (err, coinData) {
    t.ifError(err, 'no error on coins call')

    t.is(_url.indexOf('https://shapeshift'), 0, 'url is not using cors')

    // restore
    shapeshift.http.get = oldGet
    shapeshift.cors = true

    t.end()
  })
})
