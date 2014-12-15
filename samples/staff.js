/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/staff.api/list')
    .then(function (staff) {
      var promises = [];
      for (var index = 0; index < staff.length; index++) {
        promises.push(Hoist.event.raise('staff:found', staff[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};