/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.put('/client.api/update', <client> )
    .then(function (result) {
      var client = result.client;
      return Hoist.event.raise('client:updated', client);
    })
    .then(done);

};