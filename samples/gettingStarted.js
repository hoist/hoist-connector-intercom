/* Just copy and paste this snippet into your code */

module.main = function(event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/jobs', function(jobs) {
    for(var index = 0; index < jobs.length; index++) {
      Hoist.event.raise('job:found', jobs[index]);
    }
  });

};