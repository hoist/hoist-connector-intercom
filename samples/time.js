/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/time.api/list')
    .then(function (result) {
      var times = result.times.time;
      var promises = [];
      for (var index = 0; index < times.length; index++) {
        promises.push(Hoist.event.raise('time:found', times[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};