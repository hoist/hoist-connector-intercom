/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/task.api/list')
    .then(function (result) {
      var tasks = result.tasks.task;
      var promises = [];
      for (var index = 0; index < tasks.length; index++) {
        promises.push(Hoist.event.raise('task:found', tasks[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};