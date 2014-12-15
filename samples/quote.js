/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/quote.api/current')
    .then(function (quotes) {
      var promises = [];
      for (var index = 0; index < quotes.length; index++) {
        promises.push(Hoist.event.raise('quote:found', quotes[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};