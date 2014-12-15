/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/lead.api/current')
    .then(function (leads) {
      var promises = [];
      for (var index = 0; index < leads.length; index++) {
        promises.push(Hoist.event.raise('lead:found', leads[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};