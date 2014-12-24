/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/job.api/current')
    .then(function (result) {
      var jobs = result.jobs.job;
      var promises = [];
      for (var index = 0; index < jobs.length; index++) {
        promises.push(Hoist.event.raise('job:found', jobs[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};